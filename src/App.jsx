import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import RankDisplayer from "./Rank";

function App() {
  const [input, setInput] = useState("i5 8250u");
  const [price, setPrice] = useState("1000");
  const [ppvResult, setPPVResult] = useState({});
  const [rankedByProp, setRankByProp] = useState([]);
  const [db, setDb] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState("scoreST");

  const HOST = import.meta.env.VITE_HOST;
  const PORT = import.meta.env.VITE_PORT;
  const URL = `${HOST}:${PORT}`;

  useEffect(() => {
    if (selectedProperty !== "defaultProperty") {
      const newRankedByProp = rankCPUsByProp(db, selectedProperty);
      setRankByProp(newRankedByProp);
    }
  }, [selectedProperty]);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };
  const rankCPUsByProp = (db, propName) => {
    const rankedCPUs = db
      .slice()
      .filter((cpu) => cpu[propName] !== null)
      .sort((a, b) => b[propName] - a[propName]);

    return rankedCPUs;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(URL);
    try {
      const response = await axios.get(
        `${URL}/find-part/ppv?price=${price}&query=${input}`
      );

      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      }

      console.log(response);
      setPPVResult(response.data.ppv);
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

 

  const Ranked = ({
    query,
    ST,
    MT,
    pricePerformanceValueMT,
    pricePerformanceValueST,
  }) => {
    const nameExists = db.some((item) => item.name === query);
    if (nameExists) {
      console.log(`Name '${query}' already exists in the database.`);
      return; // Exit the function if the name already exists
    }

    setRankByProp(() => {
      const newRankedByProp = rankCPUsByProp(
        [
          ...db, // Use the updated db
          {
            name: query,
            scoreST: parseInt(ST),
            ppvST: parseFloat(pricePerformanceValueST),
            scoreMT: parseInt(MT),
            ppvMT: parseFloat(pricePerformanceValueMT),
          },
        ],
        selectedProperty
      );
      // Check if this logs the updated data
      return newRankedByProp;
    }); // Update the state with the new ranked CPUs
  };

  const handleSelectChange = (event) => {
    setSelectedProperty(event.target.value);
  };

  return (
    <div className="container">
      <div className="left-section">
        {/* Form and Result section */}
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
                <input
                  type="number"
                  value={price}
                  onChange={handlePriceChange}
                />
              </label>
            </div>
            <div>
              <button type="submit">Calculate PPV</button>
            </div>
          </form>
          {ppvResult && (
            <div>
              <h2>Price Performance Values:</h2>
              <div>
                <h4>ST</h4>
                <ul>
                  <li>
                    <p>
                      PPV:{" "}
                      {parseFloat(ppvResult.pricePerformanceValueST).toFixed(3)}
                    </p>
                  </li>
                  <li>
                    <p>Score: {ppvResult.ST}</p>
                  </li>
                </ul>
              </div>
              <div>
                <h4>MT</h4>
                <ul>
                  <li>
                    <p>
                      PPV:{" "}
                      {parseFloat(ppvResult.pricePerformanceValueMT).toFixed(3)}
                    </p>
                  </li>
                  <li>
                    <p>Score: {ppvResult.MT}</p>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="right-section">
        <div className="rank-page">
          {rankedByProp.length > 0 && (
            <>
              {" "}
              <RankDisplayer
                rankedCPUs={rankedByProp}
                selectedProperty={selectedProperty}
              />
              <div>
                <select value={selectedProperty} onChange={handleSelectChange}>
                  <option value="scoreST">Score ST</option>
                  <option value="scoreMT">Score MT</option>
                  <option value="ppvST">PPV ST</option>
                  <option value="ppvMT">PPV MT</option>
                </select>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
