import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import React, { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [weight, setWeight] = useState<number>(0);
  const [calculatedWeight, setCalculatedWeight] = useState<number>(0);
  const [currentSets, setCurrentSets] = useState<any[]>([]);
  const [calculatedSets, setCalculatedSets] = useState<any[]>([]);

  const preSetValues = {
    sets: 5,
    weightIncrease: 0.1,
    maxReps: 10,
    minReps: 6,
  };

  useEffect(() => {
    // On page load set current sets to preset value
    setCurrentSets(Array(preSetValues.sets).fill(""));
  }, []);

  function handleSetChange(
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) {
    const updatedSets = [...currentSets];
    updatedSets[index] = Number(e.target.value);
    setCurrentSets(updatedSets);
  }

  function calculateNewSets(volume: number) {
    // Calculate a new weight and number of reps based on the current volume
    // Calculate new reps
    const maxTotalReps = preSetValues.maxReps * preSetValues.sets;
    const minTotalReps = preSetValues.minReps * preSetValues.sets;

    let newWeight = weight;
    let totalReps = Math.round(volume / weight);
    let i = 0;

    while (totalReps > maxTotalReps || (totalReps < minTotalReps && i < 100)) {
      console.log(
        `totalReps: ${totalReps}, maxTotalReps: ${maxTotalReps}, minTotalReps: ${minTotalReps}, newWeight: ${newWeight}`
      );

      if (totalReps > maxTotalReps) {
        newWeight = newWeight + 5;
      } else if (totalReps < minTotalReps) {
        newWeight = newWeight - 5;
      }
      totalReps = Math.round(volume / newWeight);
      i++;
    }

    console.log({ newWeight, totalReps });

    const remainder = totalReps % preSetValues.sets;
    const newSets = Array(preSetValues.sets).fill(
      Math.floor(totalReps / preSetValues.sets)
    );

    for (let i = 0; i < remainder; i++) {
      console.log(`i: ${i}`);

      newSets[i] = newSets[i] + 1;
    }

    console.log(`remainder: ${remainder}`);
    console.log(`newSets: ${newSets}`);

    // // Calculate new sets
    // const newSets = Array(preSetValues.sets).fill();
    // Set new sets
    setCalculatedSets(newSets);
    // Set new weight
    setCalculatedWeight(newWeight);
  }

  // Calculate new weight
  function handleCalculateClick() {
    // Calculate current volume
    const volume = currentSets.reduce(
      (accumulator, currentValue) => currentValue * weight + accumulator,
      0
    );
    console.log(currentSets, volume);
    // Calculate new volume based on weight increase
    const newVolume = volume * (1 + preSetValues.weightIncrease);
    // Calculate new weight and reps based on new volume, accounting for max reps and min reps
    console.log({ newVolume });
    calculateNewSets(newVolume);
  }

  // Function for focusing the next input field when the user presses enter
  function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {}

  return (
    <>
      <Head>
        <title>Workout Weight Calculator</title>
        <meta
          name="description"
          content="This application allows users to calculate new reps and weight for a given exercise based on a specified percentage. This will allow users to easily calculate their next set of reps and weight for a given exercise in order to progressively overload."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <div>
          {/* List of parameters */}
          {/* Current weight */}
          <input
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            type="number"
            id="weight"
          ></input>
          <label htmlFor="weight">Weight per set:</label>
          {currentSets.map((set, index) => {
            return (
              <div key={index}>
                <input
                  ref={set}
                  type="number"
                  value={set}
                  onChange={(e) => handleSetChange(e, index)}
                ></input>
                <label> Set {index + 1}</label>;
              </div>
            );
          })}
          <button onClick={handleCalculateClick}>Calculate</button>
          {/* New weight */}
          <ul>
            {!!calculatedWeight && (
              <li>Calculated Weight: {calculatedWeight}</li>
            )}
            {!!calculatedWeight &&
              calculatedSets.map((set, index) => {
                return <li key={index}>Set: {set}</li>;
              })}
          </ul>
        </div>
      </main>
    </>
  );
}
