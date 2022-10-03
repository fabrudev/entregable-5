import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from './Loading';

const CharacterDetail = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const [ isLoading, setIsLoading ] = useState(false)

    const [ character, setCharacter ] = useState({})
    const [ characterAbilities, setCharacterAbilities ] = useState([])
    const [ characterMoves, setCharacterMoves ] = useState([])

    useEffect(() => {
        setIsLoading(true)
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then(res => {
                setCharacter(res.data)
                setCharacterAbilities(res.data.abilities)
                setCharacterMoves(res.data.moves)
                setIsLoading(false)
            })
    }, [ id ])

    console.log(character)
    console.log(characterMoves)

    return (
        <div className='character-detail'>
            {
                isLoading ? (
                    <Loading />
                ) : (
                    <>
                    <div className="character_detail-btn-container">
                        <button 
                            onClick={() => navigate('/characters/')}
                            className='character_detail-back-btn'
                        >
                            <i className="fa-solid fa-arrow-left characters-back-btn-icon"></i>
                        </button>
                    </div>
                    <div className="character_detail-bg">
                        <div className="character_detail-left-container">
                            <div className="character_detail-img-container">
                                <img 
                                    src={character.sprites?.other.dream_world.front_default} 
                                    alt=""
                                    className='character_detail-img'
                                />
                            </div>
                        </div>
                        <div className="character_detail-right-container">
                            <h1 className='character-detail-title'>{character.name}</h1>
                            <div className="character_detail-right-info-1-container">
                                    <div className="character_detail-right-info-h-w">
                                        <p className='character_detail-right-info-p'>{character.height}</p>
                                        <p className='character_detail-right-info-p-2'>Height</p>
                                    </div>
                                    <div className="character_detail-right-info-h-w">
                                        <p className='character_detail-right-info-p'>{character.weight}</p>
                                        <p className='character_detail-right-info-p-2'>Weight</p>
                                    </div>
                                    <div className="character_detail-right-info-type-container">
                                        <p className='character_detail-right-info-p'>{character.types?.[0].type.name}</p>
                                        <p className='character_detail-right-info-p-2'>Type</p>
                                    </div>
                                    <div className="character_detail-right-info-id">
                                        <p className='character_detail-right-info-p'>#{character.id}</p>
                                        <p className='character_detail-right-info-p-2'>Id</p>
                                    </div>
                            </div>
                            <div className="character_detail-right-info-2-container">
                                    <div className="character_detail-right-info-2">
                                        <h4 className='character_detail-right-info-2-title'>Abilities</h4>
                                        <hr />
                                        <ul className='character_detail-right-info-2-list'>
                                            {
                                                characterAbilities.map(ability => (
                                                    <li key={ability.ability.url}>{ability.ability.name}</li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                    <div className="character_detail-right-info-2 moves">
                                        <h4 className='character_detail-right-info-2-title'>Movements</h4>
                                        <hr />
                                        <ul className='character_detail-right-info-2-list'>
                                                {
                                                    characterMoves.map(move => (
                                                        <li key={move.move.url}>{move.move.name}</li>
                                                    ))
                                                }
                                        </ul>
                                    </div>
                            </div>                           
                        </div>
                    </div>
                    </>
                )
            }
        </div>
    );
};

export default CharacterDetail;