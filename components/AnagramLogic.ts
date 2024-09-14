"use state";

import { useState } from "react";
import { AnagramGameData } from "./AnagramGameContent";

export const AnagramLogic = () => {
  const [curAnagramNumber, setCurrAnagramNuber] = useState<number>(1);
  const updateAnagramNumber = (): number => {
    return Math.floor(Math.random() * 42) + 1;
  };
  const updatedAnagramNumber = updateAnagramNumber()
  const currGameData = AnagramGameData[updatedAnagramNumber]
  console.log(currGameData)
};
