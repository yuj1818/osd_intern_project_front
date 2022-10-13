import React from 'react';
import styled from "styled-components";

const FooterBlock = styled.div`
  font-size: 1.5vh;
  position: fixed;
  bottom: 0;
  height: 4vh;
  width: 100%;
  background: #D9D9D9;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
`
const Spacer = styled.div`
  height: 4vh;
`;

function Footer(props) {
    return (
        <>
            <FooterBlock>
                OSD 인턴 프로젝트 - 강성규, 문장혁, 손유정
            </FooterBlock>
            <Spacer />
        </>
    );
}

export default Footer;