import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

const buttonStyle = css`
  border: none;
  border-radius: 4px;
  font-size: 1.5vh;
  font-weight: bold;
  padding: 0.25rem 1rem;
  color: black;
  outline: none;
  cursor: pointer;
  margin-right: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  &:hover {
    background: lightslategray;
  }
  
  ${props =>
          props.gray &&
          css`
            background: #D9D9D9;
            &:hover {
              background: lightslategray;
            }
          `
  }
`;

const StyledButton = styled.button`
  ${buttonStyle}
`;

const StyledLink = styled(Link)`
  ${buttonStyle};
  text-decoration: none;
`;

const Button = props => {
    return props.to ? (
        <StyledLink {...props} gray={props.gray ? 1 : 0} />
    ) : (
        <StyledButton {...props} />
    );
};

export default Button;