/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";

function Form({ setDb, rankAndUpdate, db }) {
  const [input, setInput] = useState("i5 8250u");
  const [price, setPrice] = useState("1000");

  const [mode, setMode] = useState("new"); // Default mode is 'new'

  const URL = `${import.meta.env.VITE_API_HOST}:${
    import.meta.env.VITE_API_PORT
  }`;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nameExists = db.some(
      (item) => item.name.trim().toLowerCase() === input.trim().toLowerCase()
    );

    if ((mode === "new" && nameExists) || (mode !== "new" && !nameExists)) {
      const message =
        mode === "new"
          ? `${input} already exists.`
          : `${input} does not exist.`;
      alert(message);
      return; // Exit the function based on the mode and name existence
    }

    if (!price.trim() && !input.trim()) {
      alert("Please fill in both the CPU query and price.");
      return;
    } else if (!price.trim()) {
      alert("Please enter the CPU price.");
      return;
    } else if (!input.trim()) {
      alert("Please enter the CPU query.");
      return;
    }

    try {
      const response = await axios.get(
        `${URL}/find-part/ppv?price=${price}&query=${input}`
      );

      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      }

      const {
        query,
        pricePerformanceValueST,
        pricePerformanceValueMT,
        MT,
        ST,
      } = response.data.ppv;

      setDb((prevDb) => {
        const existingIndex = prevDb.findIndex((item) => item.name === query);
        if (existingIndex !== -1) {
          // Update the existing entry
          const updatedDb = [...prevDb];
          updatedDb[existingIndex] = {
            ...updatedDb[existingIndex],
            price,
            scoreST: parseInt(ST),
            ppvST: parseFloat(pricePerformanceValueST),
            scoreMT: parseInt(MT),
            ppvMT: parseFloat(pricePerformanceValueMT),
          };
          return updatedDb;
        } else {
          // Add a new entry
          return [
            ...prevDb,
            {
              name: query,
              price,
              scoreST: parseInt(ST),
              ppvST: parseFloat(pricePerformanceValueST),
              scoreMT: parseInt(MT),
              ppvMT: parseFloat(pricePerformanceValueMT),
            },
          ];
        }
      });

      rankAndUpdate();
    } catch (error) {
      console.error("There was a problem with the request:", error);
    }
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleModeChange = (event) => {
    setMode(event.target.value);
  };
  return (
    <>
      <div className="form-result-section">
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Enter CPU Query:
              <input type="text" value={input} onChange={handleInputChange} />
            </label>
          </div>
          <div>
            <label>
              Enter CPU Price:
              <input type="number" value={price} onChange={handlePriceChange} />
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                value="new"
                checked={mode === "new"}
                onChange={handleModeChange}
              />
              New
            </label>
            <label>
              <input
                type="radio"
                value="update"
                checked={mode === "update"}
                onChange={handleModeChange}
              />
              Update
            </label>
          </div>
          <div>
            <button type="submit">Calculate PPV</button>
          </div>
        </form>
        {db.length > 0 && (
          <>
            {" "}
            <div>
              <h2>Price Performance Values:</h2>
              <div>
                <h4>ST</h4>
                <ul>
                  <li>
                    <p>
                      PPV:{" "}
                      {db.length > 0
                        ? parseFloat(db[db.length - 1].ppvST).toFixed(3)
                        : "N/A"}
                    </p>
                  </li>
                  <li>
                    <p>
                      Score:{" "}
                      {db.length > 0
                        ? parseInt(db[db.length - 1].scoreST).toLocaleString()
                        : "N/A"}
                    </p>
                  </li>
                </ul>
              </div>
              <div>
                <h4>MT</h4>
                <ul>
                  <li>
                    <p>
                      PPV:{" "}
                      {db.length > 0
                        ? parseFloat(db[db.length - 1].ppvMT).toFixed(3)
                        : "N/A"}
                    </p>
                  </li>
                  <li>
                    <p>
                      Score:{" "}
                      {db.length > 0
                        ? parseInt(db[db.length - 1].scoreMT).toLocaleString()
                        : "N/A"}
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Form;
