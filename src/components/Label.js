import React from "react";
import styled from 'styled-components';

const Wrapper = styled.span`
    display: flex;
    align-items: center;
    width: 90px;
`;

const Text = styled.span`
    color: ${({color}) => color};
    padding-left: 8px;
    flex: 1;
`;

const Icon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({color}) => color};
    width: 28px;
    height: 28px;
`;

const Label = ({ label=0, color, icon }) => (
    <Wrapper>
        <Text color={color}>{label}</Text>
        <Icon color={color}>{icon}</Icon>
    </Wrapper>
);

export default Label;
