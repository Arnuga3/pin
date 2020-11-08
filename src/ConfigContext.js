import React, { createContext, useState } from 'react';

const SEED = '0123456789';
const SIZE = 4;
const total = Math.pow(SEED.length, SIZE);

export const ConfigContext = createContext();

export const ConfigProvider = ({ children }) => {
    const [config, setConfig] = useState({
        seed: SEED,
        pinSize: SIZE,
        total,
        uniqueDigitsNum: 3,
        excludeIncremental: false
    });
    return (
        <ConfigContext.Provider value={[config, setConfig]}>
            {children}
        </ConfigContext.Provider>
    );
}