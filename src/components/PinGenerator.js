import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { BaseN } from 'js-combinatorics';
const seedrandom = require('seedrandom');
import ButtonGroup from './ButtonGroup';
import PinDisplay from './PinDisplay';
import LabelGroup from './LabelGroup';
import Settings from './Settings';

import { useAvailablePinsStorage } from '../hooks/hookAvailablePins';
import { useTakenPinsStorage } from '../hooks/hookTakenPins';
import { ConfigContext } from "../ConfigContext";
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

const defaultState = {
  currentPin: null,
  edit: false
};

const PinGenerator = () => {
  const [availablePins, setAvailablePins] = useAvailablePinsStorage();
  const [takenPins, setTakenPins] = useTakenPinsStorage();

  const [state, setState] = useState(defaultState);
  const { currentPin, invalidCombinations, edit } = state;
  const [config] = useContext(ConfigContext);

  useEffect(() => {
    regeneratePins();
  }, [config]);

  useEffect(() => {
    if (!availablePins || !takenPins) regeneratePins();
    else setState({ ...state, invalidCombinations: config.total - (availablePins.length + takenPins.length) });
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
    const allCombinations = new BaseN(config.seed, config.pinSize);
    const totalCombinations = [...allCombinations];
    const validCombinations = totalCombinations
      .map(arr => arr.join(''))
      .filter(pin => validPins(pin, config));

    setAvailablePins(validCombinations);
    setTakenPins([]);
    setState({ ...state, invalidCombinations: config.total - validCombinations.length, currentPin: null });
  };

  return (
    <Wrapper>
      <Title>PIN</Title>
      <Subtitle>Generator</Subtitle>
      <Divider/>
      {edit ? <Settings onClose={() => setState({ ...state, edit: false })}/> :
        <React.Fragment>
          <ButtonGroup
            currentPin={currentPin}
            onEmitPin={emitPin}
            onRegeneratePins={regeneratePins}
            onEdit={() => setState({ ...state, edit: true })}
          />
          <PinDisplay pin={currentPin} pinSize={config.pinSize}/>
          <LabelGroup
            availablePins={availablePins}
            takenPins={takenPins}
            invalidCombinations={invalidCombinations}
          />
        </React.Fragment>
      }
    </Wrapper>
  );
};

export default PinGenerator;
