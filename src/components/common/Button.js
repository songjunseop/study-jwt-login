import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

const buttonStyle = css`
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: bold;
    padding: 0.25rem 1rem;
    color: white;
    outline: none;
    cursor: pointer;
    
    background: skyblue;
    &:hover {
        background: blue;
    }
    ${props =>
        props.fullWidth &&
        css`
            padding-top: 0.75rem;
            padding-bottom: 0.75rem;
            width: 100%;
            font-size: 1.125rem;
        `}
    ${props =>
        props.cyan &&
        css`
            background: #555;
            &:hover {
                background: #c4c4c4;
            }
    `}
    
`;

const StyledButton = styled.button`
    ${buttonStyle}
`;

const StyledLink = styled(Link)`
    ${buttonStyle}
`;

const Button = props => {
    return props.to ? (
        <StyledLink {...props} cyan={props.cyan ? 1 : 0} />
    ) : (
        <StyledButton {...props} />
    );
};

export default Button;