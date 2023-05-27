import React, { useEffect } from "react";

interface WeightsProps {
  weight: number;
}

export default function Weights({ weight }: WeightsProps) {
  // Function to calculate the plates needed for a given weight
  const plates: Array<number> = [];

  // The bar is 45lbs
  let remainingWeight = (weight - 45) / 2;
  let plateValues = [45, 35, 25, 10, 5, 2.5];
  // Using the available plate values, subtract the largest plate value from the remaining weight, and add that plate to the plates array
  // Repeat until the remaining weight is 0

  console.log(`Remaining weight: ${remainingWeight}`);

  while (remainingWeight > 0) {
    // Find the largest plate value that is less than the remaining weight
    let largestPlate = plateValues.find((plate) => plate <= remainingWeight);
    // Add that plate to the plates array
    plates.push(largestPlate);
    // Subtract the plate value from the remaining weight
    remainingWeight = remainingWeight - largestPlate;
  }

  console.log(`Plates: ${plates}`);

  return (
    <ul>
      {plates.map((plate, index) => {
        return <li key={index}>{plate}lbs x 2</li>;
      })}
    </ul>
  );
}
