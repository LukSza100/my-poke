import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const PokemonCard = ({
  name,
  height,
  weight,
  base_experience,
  abilities,
  sprites,
}) => {
  return (
    <Link to={`${name}`} style={{ textDecoration: "none" }}>
      <OneCard>
        <Image src={sprites.other.home.front_shiny} alt={name} />
        <PokemonName>{name}</PokemonName>
        <PokemonValue>
          <Value>
            <PropertyType>Height:</PropertyType>
            {height}
          </Value>
          <Value>
            <PropertyType>Weight:</PropertyType>
            {weight}
          </Value>
          <Value>
            <PropertyType>Base Experience:</PropertyType>
            {base_experience}
          </Value>
          <Value>
            <PropertyType>Ability:</PropertyType>
            {abilities[0].ability.name}
          </Value>
        </PokemonValue>
      </OneCard>
    </Link>
  );
};

const OneCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  background-color: #eaece5;
  border-radius: 15px;
  margin-top: 50px;
  margin-left: 30px;
  height: 95%;
  border: 2px solid #b2c2bf;
  &:hover {
    transform: scale(1.3);
  }
`;

const Image = styled.img`
  width: 50%;
  height: 35%;
`;

const PokemonName = styled.h3`
  display: flex;
  justify-content: center;
  text-transform: uppercase;
  color: #bd5734;
`;

const PokemonValue = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const PropertyType = styled.p`
  display: flex;
  flex-direction: column;
  font-weight: 700;
  color: #454140;
`;

const Value = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #454140;
  width: 50%;
`;

export default PokemonCard;
