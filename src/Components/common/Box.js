import styled from "styled-components";

const StyledBox = styled.div`
  border: solid black;
  height: 28.125rem;
  width: 25.8125rem;
  font-size: 1rem;
  display: flex;
  margin: 0 3.375rem;
  background: white;
  color: black;
  justify-content: center;
  align-items: center;
`;

function Box(props) {
    return (
        <StyledBox {...props} />
    )
};

export default Box;