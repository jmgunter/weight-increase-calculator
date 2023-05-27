import React, { useEffect } from "react";

interface WeightsProps {
  weight: number;
}

export default function Weights({ weight }: WeightsProps) {
  // Calculate the plates needed for a given weight

  const plates: Array<number> = [];

  // The bar is 45lbs
  let remainingWeight = (weight - 45) / 2;
  let plateValues = [45, 35, 25, 10, 5, 2.5];

  while (remainingWeight >= 2.5) {
    // Find the largest plate value that is less than the remaining weight
    let largestPlate = plateValues.find(
      (plate) => plate <= remainingWeight
    ) as number; // Cast is safe because we know remainingWeight is greater or equal to 2.5, the lowers plate value
    // Add that plate to the plates array
    plates.push(largestPlate);
    // Subtract the plate value from the remaining weight
    remainingWeight = remainingWeight - largestPlate;
  }

  return (
    <ul>
      {plates.map((plate, index) => {
        return <li key={index}>{plate}lbs x 2</li>;
      })}
    </ul>
  );
}
