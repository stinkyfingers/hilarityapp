import React from 'react';
import { User, Game } from './lib/types';

interface context {
    user?: User;
    setUser: Function;
    err?: string;
    setErr: Function;
    gaming: boolean;
    setGaming: Function;
};

export const Context = React.createContext<context>({} as context)