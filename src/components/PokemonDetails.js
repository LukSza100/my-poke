import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import SportsMartialOutlinedArtsIcon from "@mui/icons-material/SportsMartialArts";
import SportsMartialArtsIcon from "@mui/icons-material/SportsMartialArts";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { Button } from "@material-ui/core";

const BASE_URL = `https://pokeapi.co/api/v2/pokemon`;
const DB_URL = "http://localhost:3000";

function PokemonDetails({ match }) {
  const [arena, setArena] = useState([]);
  const [detail, setDetail] = useState([]);
  const [pokemonInArena, setPokemonInArena] = useState(false);
  const [isPokemonFavourite, setIsPokemonFavourite] = useState(false);

  useEffect(() => {
    axios.get(`${DB_URL}/arena`).then((res) => {
      setArena(res.data);
      const pokemonInArena = res.data
        .map((item) => item.id)
        .includes(detail.id);
      setPokemonInArena(pokemonInArena);
    });
  }, [pokemonInArena, detail.id]);

  const handleAddToArena = () => {
    if (pokemonInArena && arena.length === 2) {
      axios.delete(`${DB_URL}/arena/${detail.id}`, setPokemonInArena(false));
    } else if (arena.length >= 2) {
      alert("W arenie znajdują sie już 2 pokemony");
    } else if (!pokemonInArena) {
      axios.post(`${DB_URL}/arena`, {
        id: detail.id,
        name: detail.name,
        height: detail.height,
        weight: detail.weight,
        base_experience: detail.base_experience,
        abilities: detail.abilities,
        sprites: detail.sprites,
      });
      setPokemonInArena(true);
    } else if (pokemonInArena) {
      axios.delete(`${DB_URL}/arena/${detail.id}`, setPokemonInArena(false));
    }
  };

  useEffect(() => {
    axios.get(`${DB_URL}/favourites`).then((res) => {
      const isPokemonFavourite = res.data
        .map((poke) => poke.id)
        .includes(detail.id);
      setIsPokemonFavourite(isPokemonFavourite);
    });
  }, [isPokemonFavourite, detail.id]);

  const handleAddToMyFavourites = () => {
    if (!isPokemonFavourite) {
      axios.post(`${DB_URL}/favourites`, {
        id: detail.id,
        name: detail.name,
        height: detail.height,
        weight: detail.weight,
        base_experience: detail.base_experience,
        abilities: detail.abilities,
        sprites: detail.sprites,
      });
      setIsPokemonFavourite(true);
    } else {
      axios.delete(
        `${DB_URL}/favourites/${detail.id}`,
        setIsPokemonFavourite(false)
      );
    }
  };

  useEffect(() => {
    const loadDetail = async () => {
      const res = await axios.get(`${BASE_URL}/${match.params.name}`);
      setDetail(res.data);
    };
    loadDetail();
  }, [match.params.name]);

  return (
    <CardContain>
      <CardDetails>
        <PokemonName>{detail.name}</PokemonName>
        <Card>
          <DetailBox>
            <Detail>
              <DetailName>Weight: {detail.weight}</DetailName>
              <DetailName>Height: {detail.height}</DetailName>
              <DetailName>Base Experience: {detail.base_experience}</DetailName>
              <DetailName>
                Ability: {detail.abilities?.[0].ability.name}
              </DetailName>
            </Detail>
          </DetailBox>
          <MyCheckbox
            onChange={handleAddToMyFavourites}
            checked={isPokemonFavourite}
            icon={<MyFavoriteOff />}
            checkedIcon={<MyFavoriteOn />}
          />
          <MyCheckbox
            checked={pokemonInArena}
            onChange={handleAddToArena}
            icon={<MySportsMartialOutlinedArtsIconOff />}
            checkedIcon={<MySportsMartialArtsIconOn />}
          />
          <Image
            src={detail.sprites?.other.home.front_shiny}
            alt={detail.name}
          />
        </Card>
        <MyLink to="/">
          <MyButton variant="outlined" size="large">
            POWRÓT
          </MyButton>
        </MyLink>
      </CardDetails>
    </CardContain>
  );
}

const CardContain = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 90vh;
  align-items: center;
`;

const CardDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #cfe0e8;
  width: 60vw;
  color: black;
  border-radius: 10px;
  border: 2px solid #8d9db6;
`;

const Card = styled.div`
  display: flex;
`;

const PokemonName = styled.h2`
  display: flex;
  justify-content: center;
  text-transform: uppercase;
  font-weight: 800;
  letter-spacing: 7px;
`;

const Image = styled.img`
  width: 40%;
  height: 40vh;
  margin-left: 5%;
`;

const DetailBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 5%;
  width: 40%;
`;

const Detail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
`;

const DetailName = styled.p`
  display: flex;
  flex-direction: column;
  width: auto;
  font-weight: 800;
`;

const MyLink = styled(Link)`
  text-decoration: none;
  display: flex;
  justify-content: center;
  margin: 10px;
`;

const MyButton = styled(Button)`
  && {
    margin: 10px;
    width: 10%;
    background-color: #e3eaa7;
    border-radius: 10px;
    border: 2px solid #86af49;
  }
`;

const MyCheckbox = styled(Checkbox)`
  && {
    padding: 15px;
  }
`;

const MyFavoriteOff = styled(FavoriteBorder)`
  && {
    font-size: 50px;
  }
`;
const MyFavoriteOn = styled(Favorite)`
  && {
    font-size: 65px;
    color: #c94c4c;
  }
`;

const MySportsMartialOutlinedArtsIconOff = styled(
  SportsMartialOutlinedArtsIcon
)`
  && {
    font-size: 50px;
  }
`;

const MySportsMartialArtsIconOn = styled(SportsMartialArtsIcon)`
  && {
    font-size: 65px;
    color: #c94c4c;
  }
`;

export default PokemonDetails;
