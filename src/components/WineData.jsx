import React, { useState, useEffect } from 'react';

const WineData = ({ data }) => {
    const [alcohol1Stats, setAlcohol1Stats] = useState(null);
    const [alcohol2Stats, setAlcohol2Stats] = useState(null);
    const [alcohol3Stats, setAlcohol3Stats] = useState(null);

    useEffect(() => {
        const calculateClassFlavanoidsStats = (data, alcoholClass) => {
            const flavanoidsArray = data
                .filter((entry) => entry["Alcohol"] === alcoholClass)
                .map((entry) => entry["Flavanoids"]);
                console.log(flavanoidsArray)

            const calculateMean = (array) => {
                const sum = array.reduce((acc, value) => acc + value, 0);
                console.log(sum)
                if (typeof sum === 'string') {
                    let firstTwoDigits = sum.substring(0, 2);
                    console.log(firstTwoDigits);
                    return firstTwoDigits / array.length;
                  } else {
                    return sum / array.length;
                  }
                // let numbersArray = sum.split('.').map(Number);
                // console.log('arr',numbersArray[0]);
                // console.log(roundedSum);
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

            return {
                mean: calculateMean(flavanoidsArray).toFixed(2),
                median: calculateMedian(flavanoidsArray).toFixed(2),
                mode: calculateMode(flavanoidsArray) !== null ? calculateMode(flavanoidsArray).toFixed(2) : 'No mode',
            };
        };

        const alcohol1Stats = calculateClassFlavanoidsStats(data, 1);
        const alcohol2Stats = calculateClassFlavanoidsStats(data, 2);
        const alcohol3Stats = calculateClassFlavanoidsStats(data, 3);
        console.log(alcohol3Stats)

        setAlcohol1Stats(alcohol1Stats);
        setAlcohol2Stats(alcohol2Stats);
        setAlcohol3Stats(alcohol3Stats);
    }, [data]);

    return (
        <table className='wine-stats-table'>
            <thead>
                <tr>
                    <th>Measure</th>
                    <th>class 1</th>
                    <th>class 2</th>
                    <th>class 3</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Flavanoids Mean</td>
                    <td>{alcohol1Stats?.mean || 'Calculating...'}</td>
                    <td>{alcohol2Stats?.mean || 'Calculating...'}</td>
                    <td>{alcohol3Stats?.mean || 'Calculating...'}</td>


                </tr>
                <tr>
                    <td>Flavanoids Mode</td>
                    <td>{alcohol1Stats?.mode || 'Calculating...'}</td>

                    <td>{alcohol2Stats?.mode || 'Calculating...'}</td>
                    <td>{alcohol3Stats?.mode || 'Calculating...'}</td>
                </tr>
                <tr>
                    <td>Flavanoids Median</td>
                    <td>{alcohol1Stats?.median || 'Calculating...'}</td>
                    <td>{alcohol2Stats?.median || 'Calculating...'}</td>
                    <td>{alcohol3Stats?.median || 'Calculating...'}</td>
                </tr>
            </tbody>
        </table>
    );
};

export default WineData;
