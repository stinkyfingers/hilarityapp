export const API = () => {
    return 'https://hilarityapi-production.up.railway.app' 
        || 'http://localhost:8888'; // TODO dev, local, prod API 
}

export const WS = () => {
    return 'wss://hilarityapi-production.up.railway.app' 
        || 'ws://localhost:8888'; // TODO dev, local, prod API 
}