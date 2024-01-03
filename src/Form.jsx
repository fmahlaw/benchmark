/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";

function Form({ setDb, Ranked, db }) {
  const [input, setInput] = useState("i5 8250u");
  const [price, setPrice] = useState("1000");

  const URL = `${import.meta.env.VITE_API_HOST}:${
    import.meta.env.VITE_API_PORT
  }`;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!price && !input) {
      alert("fill input");
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
        return [
          ...prevDb,
          {
            name: query,
            price,
            scoreST: parseInt(ST), // Convert to number if needed
            ppvST: parseFloat(pricePerformanceValueST), // Convert to number if needed
            scoreMT: parseInt(MT), // Convert to number if needed
            ppvMT: parseFloat(pricePerformanceValueMT), // Convert to number if needed
          },
        ];
      });

      Ranked(response.data.ppv);
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
