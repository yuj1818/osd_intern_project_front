import React from 'react';
import logo from '../img/logo.png';
import styled from "styled-components";

const BackLogo = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 4vh;
  top: 8vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: -1;
  .logo {
    opacity: 40%;
    width: 40%;
  }
`

function BackgroundForm() {
    return (
        <>
            <BackLogo>
                <img className="logo" src={logo} />
            </BackLogo>
        </>
    );
}

export default BackgroundForm;