/* eslint-disable react/prop-types */
const RankDisplayer = ({ rankedCPUs, selectedProperty }) => {
  
    return (
      <div>
        <h2>Ranking</h2>
        <ul>
          {rankedCPUs.map((cpu, index) => (
            <li key={index}>
              {index + 1}. {cpu.name}: {parseFloat(cpu[selectedProperty]).toFixed(3)}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default RankDisplayer;
  