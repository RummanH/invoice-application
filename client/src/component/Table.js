import React, { useState } from "react";

const Table = ({ addTable, numHandler }) => {
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  const handleAddProduct = () => {
    if (product && quantity && price) {
      setClicked(!clicked);
      numHandler();
      addTable({ product, quantity, price });
    } else {
      return;
    }
  };

  const [clicked, setClicked] = useState(false);

  return (
    <>
      <tr
        style={{
          display: "flex",
          justifyContent: "stretch",
          gap: "10px",
        }}
      >
        <td>
          <input
            type="text"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
          />
        </td>
        <td>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </td>
        <td>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </td>
      </tr>
      {!clicked ? (
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            type="button"
            onClick={handleAddProduct}
            style={{ padding: "0.6rem", borderRadius: "9px", border: "none" }}
          >
            Add product
          </button>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Table;
