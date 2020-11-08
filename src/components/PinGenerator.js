import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BaseN } from 'js-combinatorics';
const seedrandom = require('seedrandom');
import ButtonGroup from './ButtonGroup';
import PinDisplay from './PinDisplay';
import LabelGroup from './LabelGroup';

import { useAvailablePinsStorage } from '../hooks/hookAvailablePins';
import { useTakenPinsStorage } from '../hooks/hookTakenPins';
import { validPins } from '../utils';

const Wrapper = styled.div`
  max-width: 400px;
  min-widht: 350px;
  padding: 24px;
  border: 1px solid rgba(0,0,0,.07);
  box-shadow: 1px 1px rgba(0,0,0,.1);
  margin: 24px auto;
  font-family: sans-serif;

  *,*:focus,*:hover {
    outline:none;
  }
`;

const Title = styled.span`
  font-size: 2em;
`;

const Subtitle = styled.span`
  font-size: 1.2em;
  margin: 0 8px;
`;

const Divider = styled.hr`
  border: .5px solid rgba(0,0,0,.05);
  margin-top: 12px;
`;

const seed = '0123456789';
const size = 4;
const total = Math.pow(seed.length, size);

const PinGenerator = () => {
  const [availablePins, setAvailablePins] = useAvailablePinsStorage();
  const [takenPins, setTakenPins] = useTakenPinsStorage();

  const [state, setState] = useState({ currentPin: null });

  useEffect(() => {
    if (!availablePins || !takenPins) generatePins();
    else setState({ ...state, invalidCombinations: total - (availablePins.length + takenPins.length) });
  }, []);

  const emitPin = () => {
    const rand = seedrandom();
    const index = Math.floor(rand() * availablePins.length);
    const pin = availablePins[index];

    setTakenPins([...takenPins, pin]);
    setAvailablePins(availablePins.filter(p => p !== pin));
    setState({ ...state, currentPin: pin });
  };

  const regeneratePins = () => {
    const allCombinations = new BaseN(seed, size);
    const totalCombinations = [...allCombinations];
    const validCombinations = totalCombinations
      .map(arr => arr.join(''))
      .filter(validPins);

    setAvailablePins(validCombinations);
    setTakenPins([]);
    setState({ ...state, invalidCombinations: total - validCombinations.length, currentPin: null });
  };

  return (
    <Wrapper>
      <Title>PIN</Title>
      <Subtitle>Generator</Subtitle>
      <Divider/>
      <ButtonGroup
        currentPin={state.currentPin}
        onEmitPin={emitPin}
        onRegeneratePins={regeneratePins}
      />
      <PinDisplay pin={state.currentPin} pinSize={size}/>
      <LabelGroup
        availablePins={availablePins}
        takenPins={takenPins}
        invalidCombinations={state.invalidCombinations}
      />
    </Wrapper>
  );
};

export default PinGenerator;
