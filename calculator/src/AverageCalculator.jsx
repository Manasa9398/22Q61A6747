import React, { useState, useEffect } from "react";

function AverageCalculator() {
    const [numbers, setNumbers] = useState([]);
    const [average, setAverage] = useState(null);
    const [error, setError] = useState(null);
    const fetchData =async function registerUser(data) {
  try {
    const response = await fetch('https://20.244.56.144/evaluation-service/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',  // important!
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      // handle errors
      const errorData = await response.json();
      console.error('Error:', errorData);
      return;
    }

    const result = await response.json();
    console.log('Success:', result);
  } catch (error) {
    console.error('Fetch error:', error);
  }
}


    return (
        <div>
            <h2>Average Calculator</h2>
            {error && <p style={{ color: "red" }}>Error: {error}</p>}
            {!error && numbers.length > 0 && (
                <>
                    <p>Numbers: {numbers.join(", ")}</p>
                    <p>Average: {average}</p>
                </>
            )}
            {!error && numbers.length === 0 && <p>No numbers found.</p>}
        </div>
    );
}

export default AverageCalculator;