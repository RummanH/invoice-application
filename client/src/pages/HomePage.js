import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/v1/invoices?poseMaster=${user._id}`
        );
        setInvoices(data.data);
      } catch (err) {}
    };

    fetchInvoices();
  }, [user]);
  return (
    <div className="container">
      <h1>My Sells</h1>
      <table className="table">
        <thead className="thead">
          <tr>
            <th className="align-center th">Customer Name</th>
            <th className="align-center th">Invoice Id</th>
            <th className="align-center th">Date</th>
            <th className="align-center th">Quantity</th>
            <th className="align-center th">Total Price</th>
          </tr>
        </thead>
        {invoices &&
          invoices.map((p) => {
            return (
              <tbody className="tbody">
                <tr>
                  <td className="align-center td">{p.customerName}</td>
                  <td className="align-center td">{p.invoiceId}</td>
                  <td className="align-center td">{p.date.toLocaleString()}</td>
                  <td className="align-center td">{p.totalQuantity}</td>
                  <td className="align-center td">{p.totalPrice}</td>
                </tr>
              </tbody>
            );
          })}
      </table>
    </div>
  );
};

export default HomePage;
