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
import { useConfigStorage } from '../hooks/hookConfig';
import { validatePin } from '../utils';

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

const SEED = '0123456789';
const SIZE = 4;
const total = Math.pow(SEED.length, SIZE);
const defaultConfig = {
    seed: SEED,
    pinSize: SIZE,
    total,
    uniqueDigitsNum: 3,
    excludeIncremental: false,
    total
};

const defaultState = {
  currentPin: null,
  edit: false
};

const PinGenerator = () => {
  const [availablePins, setAvailablePins] = useAvailablePinsStorage();
  const [takenPins, setTakenPins] = useTakenPinsStorage();
  const [config, setConfig] = useConfigStorage();

  const [state, setState] = useState(defaultState);
  const { currentPin, edit } = state;

  useEffect(() => {
    if (!config) setConfig(defaultConfig);
    if (!availablePins || !takenPins) regeneratePins(config || defaultConfig);
  }, []);

  const emitPin = () => {
    const rand = seedrandom();
    const index = Math.floor(rand() * availablePins.length);
    const pin = availablePins[index];

    setTakenPins([...takenPins, pin]);
    setAvailablePins(availablePins.filter(p => p !== pin));
    setState({ ...state, currentPin: pin });
  };

  const regeneratePins = conf => {
    const allCombinations = new BaseN(conf.seed, conf.pinSize);
    const totalCombinations = [...allCombinations];
    const validCombinations = totalCombinations
      .map(arr => arr.join(''))
      .filter(pin => validatePin(pin, conf));
 
    setState({ ...state, currentPin: null });
    setAvailablePins(validCombinations);
    setTakenPins([]);
  };

  const handleSave = config => {
    setConfig(config);
    regeneratePins(config);
  };

  return (
    <Wrapper>
      <Title>PIN</Title>
      <Subtitle>Generator</Subtitle>
      <Divider/>
      {edit ? <Settings onSave={handleSave} onClose={() => setState({ ...state, edit: false })}/> :
        config && <React.Fragment>
          <ButtonGroup
            currentPin={currentPin}
            onEmitPin={emitPin}
            onRegeneratePins={() => regeneratePins(config)}
            onEdit={() => setState({ ...state, edit: true })}
          />
          <PinDisplay pin={currentPin} config={config}/>
          <LabelGroup
            availablePins={availablePins}
            takenPins={takenPins}
            config={config}
          />
        </React.Fragment>
      }
    </Wrapper>
  );
};

export default PinGenerator;
