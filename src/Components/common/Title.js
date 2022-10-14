import React from 'react';
import styled from "styled-components";

const TitleBox = styled.div`
  border: none;
  outline: none;
  display: block;
  font-size: 1.8vmin;
  text-align: center;
  margin-bottom: 1vh;
`

function Title(props) {
    return (
        <TitleBox {...props} />
    );
}

export default Title;