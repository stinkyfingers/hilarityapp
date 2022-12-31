import React from 'react';
import { useNavigate } from 'react-router-dom';
import { listGames, joinGame } from "../lib/api";
import { Context } from "../Context";

import '../css/listGames.css';

const ListGames = () => {
    const ctx = React.useContext(Context);
    const navigate = useNavigate();

    const [games, setGames] = React.useState<Array<string>>([]);
    
    React.useEffect(() => {
        listGames()
            .then((resp) => {
                setGames(resp || []);
            })
            .catch((err) => ctx.setErr(JSON.stringify(err)));
    }, [ctx]);
    

    const handleClick = (game: string) => {
        if (!ctx.user) return;
        joinGame(ctx.user, game)
            .then((resp) => {
                navigate(`/play/${resp.name}`)
            })
            .catch((err) => ctx.setErr(JSON.stringify(err)));
    };
    
    const renderGames = () => {
        if (games.length === 0) return <div className="nogames">No Games</div>
        return games.map((game) => (
            <div className='gameSelector' key={game} onClick={() => handleClick(game)}>{game}</div>
        ));
    };
    
    return (
        <div className='lisetGames'>
            <h5>Select a game by name:</h5>
            {renderGames()}
        </div>
    );
};

export default ListGames;