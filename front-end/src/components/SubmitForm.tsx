// Using pending state from Actions
import React, { useState, useTransition } from "react";
function SubmitForm (){
//   const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = () => {
    startTransition(async () => {
        const data = {
          "longitude": [-121.95],
          "latitude": [37.11],
          "housing_median_age": [21.0],
          "total_rooms": [2387.0],
          "total_bedrooms": [357.0],
          "population": [913.0],
          "households": [341.0],
          "median_income": [7.736],
          "ocean_proximity": ["<1H OCEAN"]
      };

      fetch("https://q790y4een3.execute-api.eu-central-1.amazonaws.com/predict", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));
    })
  };
          
  return (
    <div>
      <button onClick={handleSubmit} disabled={isPending}>
        Update
      </button>
      {error && <p>{error}</p>}
    </div>
  );
}

export default SubmitForm;