import React from "react";
import { NavLink  } from "react-router-dom";
import styled from "styled-components";

const Navigation = () => {
  return (
    <>
      <Navi>
        <NavLink to="/" style={{ textDecoration: "none" }}>
          <Logo>POKEDEX</Logo>
        </NavLink>
        <ButtonsContain>
           <NavLink to="/ulubione" style={{ textDecoration: "none" }}><FavoritesButton>FAVOURITES</FavoritesButton></NavLink>
           <NavLink to="/arena" style={{ textDecoration: "none" }}><ArenaButton>ARENA</ArenaButton></NavLink>
        </ButtonsContain>
      </Navi>
    </>
  );
};

const Navi = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 20px;
  height: 100px;
  width: 100vw;
  position: fixed;
  z-index: 1;
  background-color: #fefbd8;
  border: 2px solid #dac292;
`;
const Logo = styled.div`
  height: 60px;
  width: 200px;
  color: #667292;
  font-family: "Shizuru", cursive;
  font-size: 48px;
  padding-left: 10px;
`;

const ButtonsContain = styled.div`
width:500px;
height: 60px;
`
const FavoritesButton = styled.button`
  height: 60px;
  width: 150px;
  margin-left: 30px;
  margin-right: 30px;
  background-color: #eaece5;
  border: 1px solid #80ced6;
  border-radius: 10%;
  font-size: 18px;
`;

const ArenaButton = styled.button`
  height: 60px;
  width: 150px;
  margin-left: 30px;
  margin-right: 30px;
  background-color: #eaece5;
  border: 1px solid #80ced6;
  border-radius: 10%;
  font-size: 18px;
`;

export default Navigation;
