import React from 'react';
import styled from 'styled-components';
import { Key, Copy, RefreshCw } from 'react-feather';
import Button from './Button';
import { copyToClipboard } from '../utils';

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 8px;
`;

const ButtonGroup = ({ currentPin, onEmitPin, onRegeneratePins }) => {
    return (
        <Wrapper>
            <Button onClick={onEmitPin} icon={<Key color='salmon' size={18}/>}>Emit PIN</Button>
            <Button onClick={() => copyToClipboard(currentPin)} icon={<Copy color='salmon' size={18}/>}>Copy PIN</Button>
            <Button onClick={onRegeneratePins} icon={<RefreshCw color='salmon' size={18}/>}>Regenerate</Button>
        </Wrapper>
    );
};

export default ButtonGroup;