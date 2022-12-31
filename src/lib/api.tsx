import { API, WS } from '../Config';
import { User } from './types';

export const joinGame = async(user: User, gameName: string) => {
    return fetch(`${API()}/game/join?game=${gameName}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    })
        .then((resp) => resp.json());
};

export const listGames = async() => {
    return fetch(`${API()}/games/list`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    })
        .then((resp) => resp.json())
};

export const createGame = async(user: User, gameName: string, rounds: number) => {
    return fetch(`${API()}/game/new?game=${gameName}&rounds=${rounds}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    })
        .then((resp) => resp.json())
};

export const leaveGame = async(user: User, gameName: string) => {
    return fetch(`${API()}/game/leave?game=${gameName}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    })
        .then((resp) => resp.json())
};

export const getGame = async(gameName: string) => {
    return fetch(`${API()}/game/details?game=${gameName}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    })
        .then((resp) => resp.json())
};


export const playGame = (ready: Function, cb: Function) => {
    console.log('new ws')
    const ws = new WebSocket(`${WS()}/game`);
    // ws.onopen = () => ready();
    // ws.onmessage = (message: MessageEvent) => cb(message.data);
    return ws;
}