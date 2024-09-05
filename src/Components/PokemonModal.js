import './modal.css';

export default function PokemonModal({pokemon, onModalToggle, isLiked, onLikedPokemon}) {
  console.log(pokemon);
    return (
      <div className='modal'>
        <div className="overlay" onClick={onModalToggle}></div>
        <div className='modal-content'>
          <img src={pokemon.img} alt={pokemon.name} />
          <h1>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1).toLowerCase()}</h1>
          <div>
            <h2>Pokemon Type:</h2>
            {pokemon.types.map(type => <h3 className='type' key={type.slot}>{type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1).toLowerCase()}</h3>)}
          </div>
          <button className="heart-button" onClick={onLikedPokemon}>
            {isLiked ? "❤️" : "♡"}
          </button>
        </div>
      </div>
    );
  }
  
