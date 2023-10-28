import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import React, { useEffect, useState } from "react";
import Weights from "@/components/Weights";
import Header from "@/components/Header";
import SetInput from "@/components/SetInput";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const preSetValues = {
    sets: 5,
    weightIncrease: 0.04,
    minReps: 9,
    maxReps: 11,
  };

  const [weight, setWeight] = useState<number>(0);
  const [calculatedWeight, setCalculatedWeight] = useState<number>(0);
  const [currentSets, setCurrentSets] = useState<any[]>([]);
  const [calculatedSets, setCalculatedSets] = useState<any[]>([]);
  const [oldVolume, setOldVolume] = useState<number>(0);
  const [targetVolume, setTargetVolume] = useState<number>(0);
  const [newVolume, setNewVolume] = useState<number>(0);

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
    // Set all sets below the current one to the same value
    for (let i = index + 1; i < updatedSets.length; i++) {
      updatedSets[i] = Number(e.target.value);
    }
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

    if (newWeight > 1) {
      while (
        totalReps > maxTotalReps ||
        (totalReps < minTotalReps && i < 100)
      ) {
        console.log(
          `totalReps: ${totalReps}, maxTotalReps: ${maxTotalReps}, minTotalReps: ${minTotalReps}, newWeight: ${newWeight}`
        );

        if (totalReps > maxTotalReps) {
          // Set new weight with a 10 lbs increase
          newWeight = newWeight + 10;
          // newWeight = volume / (preSetValues.sets * preSetValues.minReps);
          // newWeight = Math.floor(newWeight / 5) * 5;
        } else if (totalReps < minTotalReps) {
          newWeight = newWeight - 5;
        }
        totalReps = Math.round(volume / newWeight);
        i++;
      }
    }

    const remainder = totalReps % preSetValues.sets;
    const newSets = Array(preSetValues.sets).fill(
      Math.floor(totalReps / preSetValues.sets)
    );

    for (let i = 0; i < remainder; i++) {
      newSets[i] = newSets[i] + 1;
    }

    setCalculatedSets(newSets);
    setCalculatedWeight(newWeight);
    setNewVolume(newSets.reduce((a, b) => a + b, 0) * newWeight);
  }

  // Calculate new weight
  function handleCalculateClick() {
    // Calculate current volume
    setOldVolume(
      currentSets.reduce(
        (accumulator, currentValue) => currentValue * weight + accumulator,
        0
      )
    );
    setOldVolume((oldV) => {
      setTargetVolume(Math.round(oldV * (1 + preSetValues.weightIncrease)));
      setTargetVolume((newV) => {
        calculateNewSets(newV);
        return newV;
      });
      return oldV;
    });
  }

  // TODO: Function for focusing the next input field when the user presses enter
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
        {/* @TODO */}
        {/* <Header /> */}
        <div>
          {/* Current weight */}
          <label
            className="block text-sm font-medium leading-6 text-gray-900"
            htmlFor="weight"
          >
            Weight per set:
          </label>
          <input
            className="block w-full rounded-md border py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mb-3"
            onChange={(e) => setWeight(Number(e.target.value))}
            type="number"
            id="weightInput"
          ></input>
          {currentSets.map((set, index) => {
            return (
              <SetInput
                key={index}
                set={set}
                index={index}
                handleSetChange={handleSetChange}
              />
            );
          })}
          <button
            className="border p-2 rounded-md bg-slate-500 text-white mt-3 mb-5"
            onClick={handleCalculateClick}
          >
            Calculate
          </button>
          {/* New weight */}
          {!!calculatedWeight && (
            <div>
              <div>
                <div>
                  <p className="text-sm">
                    Old volume: <span id="oldVolume">{oldVolume}</span>
                  </p>
                  <p className="text-sm">
                    Target volume (
                    {Math.round(preSetValues.weightIncrease * 100) + "%"}):{" "}
                    <span id="targetVolume">{targetVolume}</span>
                  </p>
                  <p className="text-sm">
                    New volume: <span id="newVolume">{newVolume}</span>
                  </p>
                  <ul className="mt-5">
                    <li>Calculated Weight: {calculatedWeight}</li>
                    {calculatedSets.map((set, index) => {
                      return <li key={index}>Set: {set}</li>;
                    })}
                  </ul>
                </div>
              </div>

              <div className="mt-5">
                <h3>Plate Calculator</h3>
                <Weights weight={calculatedWeight} />
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
