import React from "react";
import styled from 'styled-components';

const Wrapper = styled.span`
    display: flex;
    align-items: center;
    width: 90px;
`;

const Label = styled.span`
    color: ${({color}) => color};
    padding-left: 8px;
    flex: 1;
`;

const IconLabel = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({color}) => color};
    width: 28px;
    height: 28px;
`;

const DataLabel = ({ label=0, color, icon }) => (
    <Wrapper>
        <Label color={color}>{label}</Label>
        <IconLabel color={color}>{icon}</IconLabel>
    </Wrapper>
);

export default DataLabel;
