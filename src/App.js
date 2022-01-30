import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import PokemonCollection from "./components/PokemonCollection";
import PokemonFavourite from "./components/PokemonFavourite";
import PokemonArena from "./components/PokemonArena";
import PokemonDetails from "./components/PokemonDetails";

function App() {
  return (
    <Router>
      <Navigation />
      <Switch>
        { <Route path="/" exact component={PokemonCollection} />}
        <Route path="/ulubione" component={PokemonFavourite} />
        <Route path="/arena" component={PokemonArena} />
        <Route path="/:name" component={PokemonDetails} /> 
      </Switch>
    </Router>
  );
}

export default App;
