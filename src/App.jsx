import { useState } from "react";

import RankDisplayer from "./Rank";
import Form from "./Form";
import { rankCPUsByProp } from "./component/RankCPUbyProp";

import "./css/App.css";

function App() {
  const [rankedByProp, setRankByProp] = useState([]);
  const [db, setDb] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState("scoreST");

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

  return (
    <div className="container">
      <div className="left-section">
        <Form setDb={setDb} Ranked={Ranked} db={db}></Form>
      </div>
      <div className="right-section">
        <div className="rank-page">
          {rankedByProp.length > 0 && (
            <>
              {" "}
              <RankDisplayer
                rankedByProp={rankedByProp}
                setRankByProp={setRankByProp}
                selectedProperty={selectedProperty}
                setSelectedProperty={setSelectedProperty}
                db={db}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
