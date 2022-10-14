import styled from "styled-components";

const StyledBox = styled.div`
  border: 0.15vmin solid black;
  height: 60vh;
  width: 35vw;
  font-size: 1.6vmin;
  display: flex;
  margin: 0 3vw;
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