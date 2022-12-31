export type RootStackParamList = {
    Home: undefined;
    Login: { user: User, setErr: Function };
    ListGames: { user: User, setGame: Function, setErr: Function };
};

export interface User {
    id: string;
    name: string;
    email: string;
    picture: string;
    [key: string]: string
}

export interface Game {
    id: number;
    name: string;
    users: Array<User>;
    pastRounds: Array<Round>;
    currentRound: Round;
    totalRounds: number;
}

export interface Round {
    question: string;
    guesses: Guesses;
    plays: Plays;
}

export interface Plays {
    [plays: string]: Play;
}

export interface Guesses {
    [guesses: string]: Guess;
}

export interface Play {
    answers: Array<string>;
}

export interface Guess {
    responses: Response;
}

export interface Response {
    [key: string]: string;
}

export interface GamePlay {
    gameName: string;
    user: User;
    play: Play;
    Guess: Guess;
}