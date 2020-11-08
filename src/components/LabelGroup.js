import React from 'react';
import styled from 'styled-components';
import { Check, Slash, Key } from 'react-feather';
import Label from './Label';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
`;

const LabelGroup = ({ availablePins, takenPins, invalidCombinations }) => {
    return (
        <Wrapper>
            <Label label={availablePins?.length} color='darkcyan' icon={<Check color='white'/>}/>
            <Label label={takenPins?.length} color='chocolate' icon={<Key color='white'/>}/>
            <Label label={invalidCombinations} color='grey' icon={<Slash color='white'/>}/>
        </Wrapper>
    );
};

export default LabelGroup;
