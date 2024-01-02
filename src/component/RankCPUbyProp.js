export const rankCPUsByProp = (db, propName) => {
    const rankedCPUs = db
      .slice()
      .filter((cpu) => cpu[propName] !== null)
      .sort((a, b) => b[propName] - a[propName]);

    return rankedCPUs;
  };