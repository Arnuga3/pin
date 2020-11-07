import React, { useState, useEffect } from "react";

const KEY = "availablePins";

export const useAvailablePinsStorage = () => {
  const [availablePins, setAvailablePins] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(KEY));
    } catch (e) {
      return null;
    }
  });

  useEffect(() => {
    if (availablePins === null) localStorage.removeItem(KEY);
    else localStorage.setItem(KEY, JSON.stringify(availablePins));
  }, [availablePins]);

  return [availablePins, setAvailablePins];
};
