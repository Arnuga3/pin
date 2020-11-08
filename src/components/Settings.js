import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { Save, XCircle } from 'react-feather';
import Button from './Button';
import { useConfigStorage } from "../hooks/hookConfig";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    space-between: space-evenly;
`;

const ActionButtons = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 12px;
`;

const Checkbox = styled.input`
    margin: 12px;
`;

const InputLabel = styled.label`
    font-size: .9em;
    color: rgba(0,0,0,.7);
`;

const Input = styled.input`
    width: 30px;
    height: 20px;
    margin: 12px;
    border: 1px solid grey;
    border-radius: 2px;
`;

const Settings = ({ onSave, onClose }) => {
    const [config, setConfig] = useConfigStorage();
    const [state, setState] = useState(config);
    const { uniqueDigitsNum, excludeIncremental, pinSize } = state;

    const handleSave = () => {
        if (validUniqueDigitValue()) {
            onSave({ ...config, ...state });
            onClose();
        }
    };

    const handleChange = ({ target }) => {
        if (target.type === 'checkbox')
            setState({ ...state, [target.name]: target.checked });
        else
            setState({ ...state, [target.name]: target.value });
    };

    const validUniqueDigitValue = useCallback(() => {
        return +uniqueDigitsNum >= 1 && +uniqueDigitsNum <= +pinSize;
    }, [uniqueDigitsNum]);

    return (
        <Wrapper>
            <div>
                <Input
                    id='unique'
                    type='number'
                    min={1}
                    max={pinSize || 0}
                    defaultValue={uniqueDigitsNum}
                    name='uniqueDigitsNum'
                    onChange={handleChange}
                    style={ validUniqueDigitValue() ? {} : { borderColor: 'salmon' } }
                />
                <InputLabel htmlFor='unique'>Unique digits per PIN</InputLabel>
            </div>
            <div>
                <Checkbox
                    id='incremental'
                    type='checkbox'
                    name='excludeIncremental'
                    defaultChecked={excludeIncremental}
                    onChange={handleChange}
                />
                <InputLabel htmlFor='incremental'>Exclude incremental order PINs, ex. "1234", "4567"</InputLabel>
            </div>
            <ActionButtons>
                <Button onClick={onClose} icon={<XCircle color='salmon' size={18}/>}>Close</Button>
                <Button onClick={handleSave} icon={<Save color='salmon' size={18}/>}>Save & Regenerate</Button>
            </ActionButtons>
        </Wrapper>
    );
};

export default Settings;