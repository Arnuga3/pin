import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { Check, Slash, Key, RefreshCw, Unlock, Copy } from "react-feather";
import { BaseN } from "js-combinatorics";
import PinDisplay from "./PinDisplay";
import DataLabel from './DataLabel';
import Button from './Button';
const seedrandom = require("seedrandom");

import { useAvailablePinsStorage } from "../hooks/hookAvailablePins";
import { useTakenPinsStorage } from "../hooks/hookTakenPins";

const Wrapper = styled.div`
  width: 400px;
  padding: 24px;
  border: 1px solid rgba(0,0,0,.07);
  box-shadow: 1px 1px rgba(0,0,0,.1);
  margin: 24px auto;

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

const Labels = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const seed = "0123456789";
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

  const generatePins = () => {
    const allCombinations = new BaseN(seed, size);
    const totalCombinations = [...allCombinations];
    const validCombinations = totalCombinations
      .map(arr => arr.join(""))
      .filter(validPins);

    setAvailablePins(validCombinations);
    setTakenPins([]);
    setState({ ...state, invalidCombinations: total - validCombinations.length, currentPin: null });
  };

  const generatePin = () => {
    const rand = seedrandom();
    const index = Math.floor(rand() * availablePins.length);
    const pin = availablePins[index];

    setTakenPins([...takenPins, pin]);
    setAvailablePins(availablePins.filter(p => p !== pin));
    setState({ ...state, currentPin: pin });
  };

  const copy = () => {
    var input = document.createElement('textarea')
    input.innerText = state.currentPin;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy')
    input.remove();
  };

  return (
    <Wrapper>
      <Title>PIN</Title>
      <Subtitle>Generator</Subtitle>
      <Divider/>
      <Buttons>
        <Button onClick={generatePin} icon={<Unlock color='salmon' size={18}/>}>Emit PIN</Button>
        <Button onClick={copy} icon={<Copy color='salmon' size={18}/>}>Copy PIN</Button>
        <Button onClick={generatePins} icon={<RefreshCw color='salmon' size={18}/>}>Regenerate</Button>
      </Buttons>
      <PinDisplay pin={state.currentPin} pinSize={size}/>
      <Labels>
        <DataLabel label={availablePins?.length} color='darkgreen' icon={<Check color='white'/>}/>
        <DataLabel label={takenPins?.length} color='indigo' icon={<Key color='white'/>}/>
        <DataLabel label={state.invalidCombinations} color='grey' icon={<Slash color='white'/>}/>
      </Labels>
    </Wrapper>
  );
};

export default PinGenerator;

const validPins = combination => {
  const uniqueNumbers = new Set(combination);
  return uniqueNumbers.size > 2;
};
