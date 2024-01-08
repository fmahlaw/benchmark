import { useState, useEffect } from "react";

import RankDisplayer from "./Rank";
import Form from "./Form";
import { rankCPUsByProp } from "./component/RankCPUbyProp";

import "./css/App.css";

function App() {
  const [rankedByProp, setRankByProp] = useState([]);
  const [db, setDb] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState("scoreST");

  useEffect(() => {
    // Call the function to update the ranking whenever 'db' changes
    rankAndUpdate();
  }, [db]);

  const rankAndUpdate = () => {
    const newRankedByProp = rankCPUsByProp(db, selectedProperty);
    setRankByProp(newRankedByProp);
  };

  return (
    <div className="container">
      <div className="left-section">
        <Form setDb={setDb} rankAndUpdate={rankAndUpdate} db={db}></Form>
      </div>
      <div className="right-section">
        <div className="rank-page">
          {rankedByProp.length > 0 && (
            <>
              {" "}
              <RankDisplayer
                rankAndUpdate={rankAndUpdate}
                rankedByProp={rankedByProp}
                setRankByProp={setRankByProp}
                selectedProperty={selectedProperty}
                setSelectedProperty={setSelectedProperty}
                db={db}
                setDb={setDb}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
