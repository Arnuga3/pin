import React, { useState, useEffect } from "react";

const KEY = "pinConfig";

export const useConfigStorage = () => {
  const [config, setConfig] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(KEY));
    } catch (e) {
      return null;
    }
  });

  useEffect(() => {
    if (config === null) localStorage.removeItem(KEY);
    else localStorage.setItem(KEY, JSON.stringify(config));
  }, [config]);

  return [config, setConfig];
};
