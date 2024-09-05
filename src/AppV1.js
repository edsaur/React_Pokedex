import { useState } from "react";
import PokemonModal from "./Components/PokemonModal";

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
    [✅] - create state for pokemon datas
    [✅] - create state for favorite pokemons
    [] - create sideEffect for pokemonAPI to load
       - 
    [] - 
  
  */
export default function App(){
  const [pokemonList, setPokemonList] = useState(pokemonDex);
  const [modal, setModal] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState();
 const [favoritePokemon, setFavoritePokemon] = useState(() => {
  const storedFavorites = localStorage.getItem('likedPokemons');
  return storedFavorites ? JSON.parse(storedFavorites) : [];
});

  const [isLiked, setIsLiked] = useState(() => JSON.parse(localStorage.getItem("isLiked")) || {});
  const [page, setPage] = useState("home");

function handleLikedPokemon(pokemon) {
  const isCurrentlyLiked = isLiked[pokemon.id] || false;
  const newIsLiked = { ...isLiked, [pokemon.id]: !isCurrentlyLiked };

  setIsLiked(newIsLiked);
  localStorage.setItem('isLiked', JSON.stringify(newIsLiked));
    if (!isCurrentlyLiked) {
      // If not liked, add it to favorites
      const likedPokemons = [...favoritePokemon, selectedPokemon]
      setFavoritePokemon(likedPokemons);
      localStorage.setItem("likedPokemons", JSON.stringify(likedPokemons));
    } else {
      // If already liked, remove it from favorites
      const updatedPokemons = favoritePokemon.filter(favPokemon => favPokemon.id !== selectedPokemon.id);
      setFavoritePokemon(updatedPokemons);
      localStorage.setItem("likedPokemons", updatedPokemons);
    }
  }
  
  function handleModalToggle(pokemon = null) {
    setSelectedPokemon(pokemon);
    setModal(!modal);
  }
  
  return (
    <>
      <Header>
          <h1 className="logo">PokeDex</h1>
        </Header> 

        <NavBar setPage={setPage} />
    { page === "home" ?
      <>
        <Main pokemonDex={pokemonList} modal={modal} onModalToggle={handleModalToggle} />
        {
          modal && selectedPokemon && 
          <Pokemon 
              pokemon={selectedPokemon} 
              onModalToggle={handleModalToggle} 
              isLiked={isLiked[selectedPokemon.id]} 
              onLikedPokemon={() => handleLikedPokemon(selectedPokemon)}
          />
        }
      </>
      : 
      <>
        <FavoritePokemon favoritePokemon={favoritePokemon} modal={modal} onModalToggle={handleModalToggle}/>
        {
          modal && selectedPokemon && 
          <Pokemon 
              pokemon={selectedPokemon} 
              onModalToggle={handleModalToggle} 
              isLiked={isLiked[selectedPokemon.id]} 
              onLikedPokemon={() => handleLikedPokemon(selectedPokemon)}
          />
        }
      </>
    }
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
  
  
  
  function NavBar({setPage}){
    // includes Home/Favorite/

    function changePage(page) {
      setPage(page);
    }
    return (
      <div className="navbar">
          <ul>
            <li onClick={() => changePage("home")}>Home</li>
            <li onClick={() => changePage("favorite")}>Favorite Pokemon</li>
          </ul>
      </div>
    )

  }
  function Main({pokemonDex, modal, onModalToggle}){
    // includes the Pokemon Component

    return (
      <div className="main">
        <div className="pokemonList">
         {pokemonDex.map(pokemon => (
            <PokemonList key={pokemon.id} pokemons={pokemon} onModalToggle={() => onModalToggle(pokemon)}/>
          ))}
        </div>
      </div>
    )
  }


// FUNCTIONABILITY
  function PokemonList({pokemons, onModalToggle}) {
    // Load List of Pokemons here
    return (
      <>
        <div className="pokemonCard" onClick={onModalToggle}>
          <img src={pokemons.image} alt={pokemons.name} />
          {pokemons.name}
        </div>
        
      </>
    )
  }

  function Pokemon ({pokemon, onModalToggle, onLikedPokemon, isLiked}) {
    // Loads particular pokemon
    return (
      <PokemonModal 
        pokemon={pokemon} 
        onModalToggle={onModalToggle} 
        isLiked={isLiked} 
        onLikedPokemon={onLikedPokemon} 
      />
    );
  }

  function FavoritePokemon({favoritePokemon, onModalToggle}) {  
    return (
      <div className="main">
        { favoritePokemon.length > 0 && favoritePokemon ?
          <div className="pokemonList">
          {favoritePokemon.map(pokemon => 
            <FavoritePokemonList 
              key={pokemon.id}  // Ensure each item has a unique key
              pokemons={pokemon} 
              onModalToggle={() => onModalToggle(pokemon)}  // Pass a callback function
            />
          )}
        </div>
        : 
        <div className="empty">
          <h1 className="logo">Such empty! <span>Go Home!</span></h1>
        </div>
        }
      </div>
    )
  }
  function FavoritePokemonList({pokemons, onModalToggle}){
    return (
      <div className="pokemonCard" onClick={onModalToggle}>
      <img src={pokemons.image} alt={pokemons.name} />
      {pokemons.name}
    </div>
    )
  } 


