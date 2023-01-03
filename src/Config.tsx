export const API = () => {
    switch (process.env.REACT_APP_ENV) {
        case 'dev':
            return 'http://localhost:8888'
        default:
            return 'https://hilarityapi-production.up.railway.app'
    }
};

export const WS = () => {
    switch (process.env.REACT_APP_ENV) {
        case 'dev':
            return 'ws://localhost:8888'
        default:
            return 'wss://hilarityapi-production.up.railway.app'
    }
};