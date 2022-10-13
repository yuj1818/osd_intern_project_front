import React, { useState } from 'react';
import styled from "styled-components";

const NavBlock = styled.div`
  width: 16vw;
  position: fixed;
  top: 8vh;
  bottom: 4vh;
  float: left;
  text-align: center;
  z-index: 2;
  display: flex;
  flex-direction: column;
  transform: ${(p) => (p.visible ? "translateX(0px)" : "translateX(-110%)")};
  transition: transform 0.4s ease-in-out;
  background-color: #ECECEC;
  .title {
    font-size: 2.5vmin;
    padding: 1.5vmin 0;
    border-bottom: solid 1px;
  }
  .menu {
    padding: 0;
  }
  .menu_list {
    font-size: 2.5vmin;
    padding: 1vh 0;
    list-style: none;
    &:hover {
      background-color: rgba(217, 217, 217, 1);
    }
  }
  .menu_list a {
    color: black;
    text-decoration: none;
  }
`

const ChangeBackColor = styled.div`
  background: #323232;
  opacity: 50%;
  position: absolute;
  top: 8vh;
  bottom: 4vh;
  left: 0;
  right: 0;
  z-index: 1;
  display: ${(p) => (p.visible ? "block" : "none" )};
`

function NavBar(props) {

    const menus = [
        { name: "밥친구", path:"/selection" },
        { name: "캘린더", path:"/calendar"}
    ];

    return (
        <>
            <NavBlock className="navbar" visible={props.visible}>
                <div className="title">Menu</div>
                <ul className="menu">
                    {menus.map((menu, idx) => {
                        return (
                            <li key={idx} className="menu_list"><a href={menu.path}>{menu.name}</a></li>
                        )
                    })}
                </ul>
            </NavBlock>
            <ChangeBackColor visible={props.visible}/>
        </>
    );
}

export default NavBar;