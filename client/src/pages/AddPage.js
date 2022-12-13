import React, { useEffect, useState } from "react";
import Table from "../component/Table";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import getError from "../services/getError";

const AddPage = () => {
  const [customerName, setCustomerName] = useState("");
  const [invoiceId, setInvoiceId] = useState("");
  const [date, setDate] = useState("");
  const [number, setNumber] = useState([]);
  const [products, setProducts] = useState([]);

  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const numHandler = () => {
    setNumber((prev) => [...prev, 1]);
  };

  const addTable = (current) => {
    setProducts((prev) => {
      return [...prev, current];
    });
  };

  const totalQuantity = products.reduce((a, c) => {
    return a + Number(c.quantity);
  }, 0);

  const totalPrice = products.reduce((a, c) => {
    return a + Number(c.price);
  }, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !customerName ||
      !invoiceId ||
      !date ||
      !products ||
      !totalPrice ||
      !totalQuantity
    ) {
      alert("Please provide all values!");
      return;
    }
    const currentOrder = {
      customerName,
      invoiceId,
      date,
      products,
      totalPrice,
      totalQuantity,
      poseMaster: user._id,
    };
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/invoices",
        currentOrder
      );

      console.log(data);

      setNumber([]);
      setCustomerName("");
      setInvoiceId("");
      setDate("");
      setProducts([]);
    } catch (err) {
      alert(getError(err));
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div>
      <form className="container" onSubmit={handleSubmit}>
        <div>
          <label>Customer Name</label>
          <input
            type="text"
            name="customerName"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
        </div>

        <div>
          <label>Invoice</label>
          <input
            name="invoiceId"
            type="text"
            value={invoiceId}
            onChange={(e) => setInvoiceId(e.target.value)}
          />
        </div>

        <div>
          <label>Date</label>
          <input
            name="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <table style={{ width: "100%" }}>
          <thead>
            <tr
              style={{
                display: "flex",
                gap: "6rem",
                marginBottom: "0.4rem",
              }}
            >
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {number.map((n, i) => (
              <Table numHandler={numHandler} addTable={addTable} key={i} />
            ))}
          </tbody>
        </table>
        {number.length === 0 ? (
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              type="button"
              onClick={numHandler}
              style={{ padding: "0.6rem", borderRadius: "9px", border: "none" }}
            >
              Add product
            </button>
          </div>
        ) : (
          ""
        )}
        <div>
          <hr style={{ marginTop: "10px", marginBottom: "10px" }} />
          <span className="total">
            Total Price : <strong>{totalPrice}</strong>
          </span>
        </div>
        <div>
          <span className="total">
            Total Quantity : <strong>{totalQuantity}</strong>
          </span>
        </div>
        <button type="submit" style={{ marginTop: "10px" }} className="btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddPage;
