import React from 'react';
import styled from 'styled-components';
import { Key, Settings, Copy, RefreshCw } from 'react-feather';
import Button from './Button';
import { copyToClipboard } from '../utils';

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const MainButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ButtonGroup = ({ currentPin, onEmitPin, onRegeneratePins, onEdit }) => (
    <Wrapper>
        <MainButtons>
            <Button onClick={onEmitPin} icon={<Key color='salmon' size={18}/>}>Emit PIN</Button>
            <Button onClick={() => copyToClipboard(currentPin)} icon={<Copy color='salmon' size={18}/>}>Copy PIN</Button>
            <Button onClick={onRegeneratePins} icon={<RefreshCw color='salmon' size={18}/>}>Regenerate</Button>
        </MainButtons>
        <Button onClick={onEdit} icon={<Settings color='black' size={18}/>}/>
    </Wrapper>
);

export default ButtonGroup;