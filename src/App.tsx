import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
    Outlet
} from 'react-router-dom';
import ListGames from './components/ListGames';
import CreateGame from './components/CreateGame';
import PlayGame from './components/PlayGame';
import './App.css';
import Header from "./components/Header";
import Error from './components/Error';
import { Context } from "./Context";
import { User } from './lib/types';

const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}
const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <div>Hello world!</div>,
      },
      {
        path: "/list",
        element: <ListGames />,
      },
      {
        path: "/create",
        element: <CreateGame />,
      },
      {
        path: "/play/:gameName",
        element: <PlayGame />,
      }
    ]}
]);

function App() {
  const [err, setErr] = React.useState<string>();
  const [user, setUser] = React.useState<User>();
  const [gaming, setGaming] = React.useState<boolean>(false);

  return (
    <Context.Provider value={{ setErr, err, setUser, user, gaming, setGaming }}>
      <div className="App">
        { err && <Error msg={err} /> }
        <React.StrictMode>
          <RouterProvider router={router} />
        </React.StrictMode>
      </div>
    </Context.Provider>
  );
}

export default App;
