import React from "react";

interface SetInputProps {
  index: number;
  set: number;
  handleSetChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => void;
}

export default function SetInput({
  index,
  set,
  handleSetChange,
}: SetInputProps) {
  return (
    <div>
      <label className="block text-sm font-medium leading-6 text-gray-900">
        {" "}
        Set {index + 1}
      </label>
      <input
        id={`set-${index}`}
        className="block w-full rounded-md border border-slate py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mb-3"
        type="number"
        value={set}
        onChange={(e) => handleSetChange(e, index)}
      ></input>
    </div>
  );
}
