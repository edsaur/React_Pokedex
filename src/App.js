import { useState } from "react";

    const pokemonDex = [
      {
        id: 1,
        name: "Bulbasaur",
        type: ["Grass", "Poison"],
        image: "https://img.pokemondb.net/artwork/bulbasaur.jpg"
      },
      {
        id: 2,
        name: "Ivysaur",
        type: ["Grass", "Poison"],
        image: "https://img.pokemondb.net/artwork/ivysaur.jpg"
      },
      {
        id: 3,
        name: "Venusaur",
        type: ["Grass", "Poison"],
        image: "https://img.pokemondb.net/artwork/venusaur.jpg"
      },
      {
        id: 4,
        name: "Charmander",
        type: ["Fire"],
        image: "https://img.pokemondb.net/artwork/charmander.jpg"
      },
      {
        id: 5,
        name: "Charmeleon",
        type: ["Fire"],
        image: "https://img.pokemondb.net/artwork/charmeleon.jpg"
      },
      {
        id: 6,
        name: "Charizard",
        type: ["Fire", "Flying"],
        image: "https://img.pokemondb.net/artwork/charizard.jpg"
      },
      {
        id: 7,
        name: "Squirtle",
        type: ["Water"],
        image: "https://img.pokemondb.net/artwork/squirtle.jpg"
      },
      {
        id: 8,
        name: "Wartortle",
        type: ["Water"],
        image: "https://img.pokemondb.net/artwork/wartortle.jpg"
      },
      {
        id: 9,
        name: "Blastoise",
        type: ["Water"],
        image: "https://img.pokemondb.net/artwork/blastoise.jpg"
      },
      {
        id: 10,
        name: "Pidgey",
        type: ["Normal", "Flying"],
        image: "https://img.pokemondb.net/artwork/pidgey.jpg"
      }
    ];

    // POKEDEX
  /* 
    [✅] - create layouts (Components...)
      [✅] - have dummy poke info 
    [] - create state for pokemon datas
    [] - create state for favorite pokemons
    [] - create sideEffect for pokemons to load
       - 
    [] - 
  
  */
export default function App(){
  const [pokemonList, setPokemonList] = useState(pokemonDex);
  return (
    <>
      <Header>
        <h1 className="logo">PokeDex</h1>
      </Header> 

      <NavBar />
      <Main pokemonDex={pokemonList} />
     
    </>
  )
}

 
// LAYOUT
  function Header({children}){
    return (
      <div className="header">
          {children}
      </div>
    )
  }
  
  
  
  function NavBar(){
    // includes Home/Favorite/
    return (
      <div className="navbar">
          <ul>
            <li>Home</li>
            <li>Favorite</li>
          </ul>
      </div>
    )

  }
  function Main({pokemonDex}){
    // includes the Pokemon Component

    return (
      <div className="main">
        <div className="pokemonList">
         {pokemonDex.map(pokemon => (
            <PokemonList key={pokemon.id} pokemons={pokemon}/>
          ))}
        </div>
          {/* or <FavoritePokemon /> */}
      </div>
    )
  }


// FUNCTIONABILITY
  function PokemonList({pokemons}) {
    // Load List of Pokemons here
    console.log(pokemons);
    return (
        <div className="pokemonCard">
          <img src={pokemons.image} alt={pokemons.name} />
          {pokemons.name}
        </div>
    )
  }

  // function Pokemon () {
    // Loads particular pokemon
  // }

  // function FavoritePokemon{} }
