import React, { useState, useEffect } from 'react';

const WineStatsTableWithGamma = ({ data }) => {
  const [datasetWithGamma, setDatasetWithGamma] = useState([]);
  const [classWiseGammaStats, setClassWiseGammaStats] = useState({});

  useEffect(() => {
    // Function to calculate the "Gamma" property for each point in the dataset
    const calculateGamma = (data) => {
      return data.map((entry) => {
        const ash = entry["Ash"];
        const hue = entry["Hue"];
        const magnesium = entry["Magnesium"];

        const gamma = (ash * hue) / magnesium;

        return {
          ...entry,
          "Gamma": gamma,
        };
      });
    };

    // Function to calculate the class-wise mean, median, and mode of "Gamma"
    const calculateClassWiseGammaStats = (data) => {
      const classes = {};

      data.forEach((entry) => {
        const alcoholClass = entry["Alcohol"];

        if (!classes[alcoholClass]) {
          classes[alcoholClass] = [];
        }

        classes[alcoholClass].push(entry["Gamma"]);
      });

      const calculateMean = (array) => {
        const sum = array.reduce((acc, value) => acc + value, 0);
        return sum / array.length;
      };

      const calculateMedian = (array) => {
        const sortedArray = array.slice().sort((a, b) => a - b);
        const middle = Math.floor(sortedArray.length / 2);

        if (sortedArray.length % 2 === 0) {
          return (sortedArray[middle - 1] + sortedArray[middle]) / 2;
        } else {
          return sortedArray[middle];
        }
      };

      const calculateMode = (array) => {
        const counts = {};
        let maxCount = 0;
        let mode = null;

        array.forEach((value) => {
          counts[value] = (counts[value] || 0) + 1;

          if (counts[value] > maxCount) {
            maxCount = counts[value];
            mode = value;
          }
        });

        return mode;
      };

      const classStats = {};
      for (const alcoholClass in classes) {
        const gammaArray = classes[alcoholClass];

        classStats[alcoholClass] = {
          mean: calculateMean(gammaArray).toFixed(2),
          median: calculateMedian(gammaArray).toFixed(2),
          mode: calculateMode(gammaArray) !== null ? calculateMode(gammaArray).toFixed(2) : 'No mode',
        };
      }

      return classStats;
    };

    // Calculate "Gamma" for the dataset
    const datasetWithGamma = calculateGamma(data);
    setDatasetWithGamma(datasetWithGamma);

    // Calculate class-wise statistics for "Gamma"
    const gammaStats = calculateClassWiseGammaStats(datasetWithGamma);
    setClassWiseGammaStats(gammaStats);
  }, [data]);

  return (
    <div>
      <table className='wine-stats-table'>
        <thead>
          <tr>
            <th>Measure</th>
            <th>Class 1</th>
            <th>Class 2</th>
            <th>Class 3</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Gamma (Mean)</td>
            {Object.keys(classWiseGammaStats).map((alcoholClass) => (
              <td key={alcoholClass}>{classWiseGammaStats[alcoholClass].mean || 'Calculating...'}</td>
            ))}
          </tr>
          <tr>
            <td>Gamma (Median)</td>
            {Object.keys(classWiseGammaStats).map((alcoholClass) => (
              <td key={alcoholClass}>{classWiseGammaStats[alcoholClass].median || 'Calculating...'}</td>
            ))}
          </tr>
          <tr>
            <td>Gamma (Mode)</td>
            {Object.keys(classWiseGammaStats).map((alcoholClass) => (
              <td key={alcoholClass}>{classWiseGammaStats[alcoholClass].mode || 'Calculating...'}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default WineStatsTableWithGamma;
