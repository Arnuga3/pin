import React from 'react';
import styled from 'styled-components';

const ButtonStyled = styled.button`
    display: flex;
    align-items: center;
    border-radius: 0;
    border: none;
    padding: 12px 10px;
    background-color: transparent;
    cursor: pointer;

    &:hover {
        background-color: rgba(0,0,0,.05);
    }
`;

const Content = styled.div`
    margin: 0 6px;
`;

const Button = ({ icon, children, ...props }) => {
    return (
        <ButtonStyled {...props}>
            {icon}
            {children ? <Content>{children}</Content> : null}
        </ButtonStyled>
    );
};

export default Button;