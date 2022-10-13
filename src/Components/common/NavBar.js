import React, { useState } from 'react';
import styled from "styled-components";

const NavBlock = styled.div`
  width: 250px;
  position: fixed;
  top: 6.25rem;
  bottom: 6.25rem;
  float: left;
  text-align: center;
  z-index: 2;
  display: flex;
  flex-direction: column;
  transform: ${(p) => (p.visible ? "translateX(0px)" : "translateX(-110%)")};
  transition: transform 0.4s ease-in-out;
  background-color: #ECECEC;
  .title {
    font-size: 30px;
    padding-bottom: 1rem;
    border-bottom: solid 1px;
  }
  .menu {
    padding: 0;
  }
  .menu_list {
    font-size: 28px;
    padding: 0.5rem 0;
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
  top: 6.25rem;
  bottom: 6.25rem;
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
                <p className="title">Menu</p>
                <ul className="menu">
                    {menus.map((menu, idx) => {
                        return (
                            <li className="menu_list"><a href={menu.path}>{menu.name}</a></li>
                        )
                    })}
                </ul>
            </NavBlock>
            <ChangeBackColor visible={props.visible}/>
        </>
    );
}

export default NavBar;