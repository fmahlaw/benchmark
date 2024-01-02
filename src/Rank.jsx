/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { rankCPUsByProp } from "./component/RankCPUbyProp";

const RankDisplayer = ({
  rankedByProp,
  setRankByProp,
  selectedProperty,
  setSelectedProperty,
  db,
}) => {
  useEffect(() => {
    if (selectedProperty !== "defaultProperty") {
      const newRankedByProp = rankCPUsByProp(db, selectedProperty);
      setRankByProp(newRankedByProp);
    }
  }, [selectedProperty]);

  const handleSelectChange = (event) => {
    setSelectedProperty(event.target.value);
  };
  return (
    <div>
      <h2>Ranking</h2>
      <div>
        <select value={selectedProperty} onChange={handleSelectChange}>
          <option value="scoreST">Score ST</option>
          <option value="scoreMT">Score MT</option>
          <option value="ppvST">PPV ST</option>
          <option value="ppvMT">PPV MT</option>
        </select>
      </div>
      <ul>
        {rankedByProp.map((cpu, index) => (
          <li key={index}>
            {index + 1}. {cpu.name}:{" "}
            {cpu[selectedProperty] > 1
              ? cpu[selectedProperty].toLocaleString()
              : cpu[selectedProperty].toFixed(3)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RankDisplayer;
