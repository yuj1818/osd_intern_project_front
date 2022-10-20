import React from 'react';
import styled from "styled-components";
import Responsive from "./Responsive";
import logo from '../img/logo.png';
import menu from '../img/menu.png';
import closeMenu from '../img/close_menu.png';
import Button from "./Button";
import NavBar from "./NavBar";

const HeaderBlock = styled.div`
  position: fixed;
  height: 8vh;
  width: 100%;
  background: #D9D9D9;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
`

const Wrapper = styled(Responsive)`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  .left {
    height: 100%;
    display: flex;
    align-items: center;
    float: left;
  }
  
  .logo {
    height: 100%;
  }
  .menu {
    height: 60%;
    margin-right: 0.5rem;
  }
  .logo img {
    height: 100%;
  }
  .right {
    display: flex;
    align-items: center;
    float: right;
  }
`;

const Spacer = styled.div`
  height: 8vh;
`;

function Header({onLogout ,onToggle, visible}) {

    return (
        <>
            <HeaderBlock>
                <Wrapper>
                    <div className="left">
                        <img className="menu" src={visible? closeMenu : menu} onClick={onToggle}/>
                        <a href="/" className="logo"><img src={logo} /></a>
                    </div>
                    {localStorage.getItem('onLoginUser') ?
                        <div className="right">
                            <div style={{display:"flex", marginRight:"1.5vmin"}}>
                                <div style={{textDecoration:"underline", marginRight:"0.3vmin"}}>
                                    {localStorage.getItem('onLoginUser')}
                                </div>
                                <div>
                                    님
                                </div>
                            </div>
                            <div>
                                <Button onClick={onLogout}>로그아웃</Button>
                            </div>
                        </div>
                        :
                        <div className="right">
                            <Button to="/login">로그인</Button>
                        </div>
                    }
                </Wrapper>
            </HeaderBlock>
            <Spacer />
            <NavBar visible={visible}/>
        </>
    );
}

export default Header;