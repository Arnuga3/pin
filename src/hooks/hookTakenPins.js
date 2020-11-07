import React, { useState, useEffect } from "react";

const KEY = "takenPins";

export const useTakenPinsStorage = () => {
  const [takenPins, setTakenPins] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(KEY));
    } catch (e) {
      return null;
    }
  });

  useEffect(() => {
    if (takenPins === null) localStorage.removeItem(KEY);
    else localStorage.setItem(KEY, JSON.stringify(takenPins));
  }, [takenPins]);

  return [takenPins, setTakenPins];
};
