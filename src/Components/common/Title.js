import React from 'react';
import styled from "styled-components";

const TitleBox = styled.div`
  border: none;
  outline: none;
  display: block;
  font-size: 1.25rem;
  text-align: center;
  margin-bottom: 0.5rem;
`

function Title(props) {
    return (
        <TitleBox {...props} />
    );
}

export default Title;