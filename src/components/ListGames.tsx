import React from 'react';
import { useNavigate } from 'react-router-dom';
import { listGames, joinGame } from "../lib/api";
import { Context } from "../Context";

import '../css/listGames.css';

const ListGames = () => {
    const ctx = React.useContext(Context);
    const navigate = useNavigate();
    const [games, setGames] = React.useState<Array<string>>();
    const setErrFn = ctx.setErr;
    
    React.useEffect(() => {
        listGames()
            .then((resp) => {
                if (resp && resp.error) {
                    setErrFn(resp.error);
                    return;
                }
                setGames(resp || []);
            })
            .catch((err) => setErrFn(JSON.stringify(err)));
    }, [setErrFn]);
    

    const handleClick = (game: string) => {
        if (!ctx.user) return;
        joinGame(ctx.user, game)
            .then((resp) => {
                ctx.setErr(null);
                navigate(`/play/${resp.name}`)
            })
            .catch((err) => ctx.setErr(JSON.stringify(err)));
    };
    
    const renderGames = () => {
        if (!games || games.length === 0) return <div className="nogames">No Games</div>
        return games.map((game) => (
            <div className='gameSelector' key={game} onClick={() => handleClick(game)}>{game}</div>
        ));
    };
    
    if (!ctx.user || !ctx.user.name) return (
        <div>
            Enter your username before joining a game
        </div>
    );
    
    if (!games || games.length === 0) return <div className="nogames">No Games</div>

    return (
        <div className='lisetGames'>
            <h5>Select a game by name:</h5>
            {renderGames()}
        </div>
    );
};

export default ListGames;