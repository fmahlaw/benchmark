export const rankCPUsByProp = (db, propName) => {
    let rankedCPUs;
  
    if (propName === "ppvST" || propName === "ppvMT") {
      rankedCPUs = db
        .slice()
        .filter((cpu) => cpu[propName] !== null)
        .sort((a, b) => a[propName] - b[propName]);
    } else {
      rankedCPUs = db
        .slice()
        .filter((cpu) => cpu[propName] !== null)
        .sort((a, b) => b[propName] - a[propName]);
    }
  
    return rankedCPUs;
  };
  