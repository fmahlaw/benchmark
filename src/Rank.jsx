/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { rankCPUsByProp } from "./component/RankCPUbyProp";

const RankDisplayer = ({
  rankedByProp,
  setRankByProp,
  selectedProperty,
  setSelectedProperty,
  db,
  setDb,
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

  const handleReset = () => {
    setDb([]); // Reset the rankedByProp state to an empty arrayse
    setRankByProp([]);
  };

  const handleExportToTxt = () => {
    let allCategoryData = "";

    const categories = ["scoreST", "ppvST", "scoreMT", "ppvMT"];
    categories.forEach((category) => {
      const categoryData = rankedByProp
        .map(
          (cpu, index) =>
            `${index + 1}. ${cpu.name}: ${cpu[category]} ${category} $${
              cpu.price
            }`
        )
        .join("\n");

      allCategoryData += `--- ${category} ---\n${categoryData}\n\n`;
    });

    // Create and download a single text file containing all category data
    const blob = new Blob([allCategoryData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "allCategoriesData.txt");

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
  };

  console.log(rankedByProp);
  return (
    <div>
      <h2>Ranking</h2>
      <div>
        <button onClick={handleReset}>RESET</button>
        <button onClick={handleExportToTxt}>EXPORT</button>
      </div>
      <div>
        <select value={selectedProperty} onChange={handleSelectChange}>
          <option value="scoreST">Score ST</option>
          <option value="ppvST">PPV ST</option>
          <option value="scoreMT">Score MT</option>
          <option value="ppvMT">PPV MT</option>
        </select>
      </div>
      <ul>
        {rankedByProp.map((cpu, index) => (
          <li key={index}>
            {index + 1}. {cpu.name}:{" "}
            {cpu[selectedProperty] > 1
              ? cpu[selectedProperty].toLocaleString()
              : cpu[selectedProperty].toFixed(3)}{" "}
            ${cpu.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RankDisplayer;
