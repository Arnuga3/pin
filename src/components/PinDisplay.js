import React from 'react';
import styled from 'styled-components';

const DisplayWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`;

const DigitContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    margin: 4px;
    background-color: rgba(0,0,0,.07);
    font-size: 5em;
    color: rgba(0,0,0,.7);
    flex: 1;
`;

const PinDisplay = ({ pin, pinSize }) => {
    const digits = pin ? [...pin] : new Array(pinSize).fill('-');;
    return (
        <DisplayWrapper>
            {digits.map((digit, i) => <DigitContainer key={i}>{digit}</DigitContainer>)}
        </DisplayWrapper>
    );
};

export default PinDisplay;