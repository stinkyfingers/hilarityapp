import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Context } from '../Context';
import { getGame, leaveGame } from '../lib/api';
import { Game } from '../lib/types';
import Play from './Play';
import Guess from './Guess'
import Totals from './Totals';
import RoundTotals from './RoundTotals';
import { WS } from "../Config";

import '../css/playGame.css';

const playUrl = (gameName: string) => `${WS()}/game/play?game=${gameName}`;

enum PlayState {
    PlayDo,
    PlayWait,
    GuessDo,
    GuessWait,
    RoundComplete,
    Complete,
    NeedPlayer,
};

const PlayGame = () => {
    const ctx = React.useContext(Context);
    const ws = React.useRef<WebSocket|null>(null);
    const [wsReady, setWsReady] = React.useState<boolean>(false);
    const [game, setGame] = React.useState<Game|null>(null);
    const [playState, setPlayState] = React.useState<PlayState>(PlayState.PlayDo)
    const { gameName } = useParams();
    const navigate = useNavigate();
    const setErrFn =  ctx.setErr;
    const setGamingFn =  ctx.setGaming;
    
    const receiveData = (data: string) => {
        setGame(JSON.parse(data))
    };
    
    React.useEffect(() => {
        if (!gameName) return;
        getGame(gameName)
            .then((resp) => {
                if (resp.error) {
                    setErrFn(resp.error)
                    return;
                }
                setGame(resp)
            })
            .catch((err) => setErrFn(err))
    }, [ctx.user, gameName, setErrFn])
    
    React.useEffect(() => {
        if (!gameName) return;
        const socket = new WebSocket(playUrl(gameName));
        socket.onopen = () => {
            setGamingFn(true);
            setWsReady(true)
        }
        socket.onclose = () => {
            setWsReady(false);
        }
        socket.onmessage = (event) => {
            receiveData(event.data)
        }
        ws.current = socket;
        return () => {
            setGamingFn(false);
            // socket.close();
        }
    }, [gameName, setGamingFn]);
    
    // playState 
    React.useEffect(() => {
        if (!wsReady || !game || !game.currentRound || !ctx.user) return;
        if (Object.keys(game.users).length < 2) {
            setPlayState(PlayState.NeedPlayer);
            return;
        }
        if (game.pastRounds && game.pastRounds.length === game.totalRounds) {
            setPlayState(PlayState.Complete)
            return;
        }
        if (!game.currentRound.plays[ctx.user.name]) {
            if (game.pastRounds) {
                setPlayState(PlayState.RoundComplete);
            } else {
                setPlayState(PlayState.PlayDo);
            }
            return;
        }
        if (Object.keys(game.currentRound.plays).length < Object.keys(game.users).length) {
            setPlayState(PlayState.PlayWait)
            return;
        }
        if (!game.currentRound.guesses[ctx.user.name]) {
            setPlayState(PlayState.GuessDo);
            return;
        }
        if (Object.keys(game.currentRound.guesses).length < Object.keys(game.users).length) {
            setPlayState(PlayState.GuessWait)
            return;
        }
    }, [game, wsReady, ctx]);
    
    const handleQuitGame = () => {
        if (!window.confirm("Are you sure?")) return;
        setGame(null);
        if (!game || !ctx.user) return
        leaveGame(ctx.user, game.name)
            .catch((err) => {
                ctx.setErr(err);
            })
            .finally(() => {
                navigate('/list');
            });
    };

    const handleSubmitPlay = (plays: Array<string>) => {
        if (!game || !wsReady || !ws.current) return;
        ws.current.send(JSON.stringify({
            gameName: game.name,
            user: ctx.user,
            play: {
                answers: plays
            }
        }));
    };

    const handleSubmitGuess = (plays: Array<string>) => {
        if (!game || !wsReady || !ws.current) return;
        ws.current.send(JSON.stringify({
            gameName: game.name,
            user: ctx.user,
            guess: {
                responses: plays
            }
        }));
    };
    
    
    if (!wsReady) {
        return (
            <div>Waiting for connection...</div>
        )
    }
    if (!game || !ctx.user) return null;
    if (playState === PlayState.NeedPlayer) return <div>Waiting for more players...</div>;
    return (
        <div>
            {game && game.currentRound &&
              <div>
                <button onClick={ handleQuitGame }>Quit Game</button>

                  {{
                      [PlayState.PlayDo.toString()]: 
                          <Play
                              answers={game.currentRound.plays[ctx.user.name]?.answers || []}
                              question={game?.currentRound.question}
                              submit={handleSubmitPlay}
                          />,
                      [PlayState.PlayWait.toString()]:
                          <div>Waiting for other players to play</div>,
                      [PlayState.GuessDo.toString()]:
                          <Guess
                              answers={game.currentRound.plays || {}}
                              question={game?.currentRound.question}
                              submit={handleSubmitGuess}
                          />,
                      [PlayState.GuessWait.toString()]:
                          <div>Waiting for other players to guess</div>,
                      [PlayState.RoundComplete.toString()]:
                            <RoundTotals game={game} onComplete={() => setPlayState(PlayState.PlayDo)}/>,
                      [PlayState.Complete.toString()]:
                        <Totals game={game} />
                  }[playState.toString()]}
              </div>
            }
            { game && !game.currentRound && <Totals game={game} />}
        </div>
    );
};

export default PlayGame;