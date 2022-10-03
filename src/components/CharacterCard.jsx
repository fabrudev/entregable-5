import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CharacterCard = ({ url }) => {

    const navigate = useNavigate();

    const [ character, setCharacter ] = useState({})

    useEffect(() => {
        axios.get(url)
            .then(res => setCharacter(res.data))
    }, [])

    return (
        <div onClick={() => navigate(`/characters/${character.id}`)} className='character-card'>
            <p className='character-card-title'>{character.name}</p>
            <div className="character-card-img-container">
                <img 
                    src={character.sprites?.other?.dream_world.front_default} 
                    alt="pokemon-image" 
                    className='character-card-img'
                />
            </div>
            <div className="character-info-container">
                <div className="character-info">
                    <p><b>Type: </b><span className='character-type'>{character.types?.[0].type.name}</span></p>
                    <p><b>Hp: </b>{character.stats?.[0].base_stat}</p>
                    <p><b>Attack: </b>{character.stats?.[1].base_stat}</p>
                </div>
                <div className="character-info">
                    <p><b>Defense: </b>{character.stats?.[2].base_stat}</p>
                    <p><b>Speed: </b>{character.stats?.[5].base_stat}</p>
                </div>
            </div>
        </div>
    );
};

export default CharacterCard;