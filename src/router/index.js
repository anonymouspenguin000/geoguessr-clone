import Home from "../pages/Home";
import Stats from '../pages/Stats';
import Game from "../pages/Game";

export const routes = [
    {path: '/', element: () => <Home />},
    {path: '/stats', element: () => <Stats />},
    {path: '/game', element: () => <Game />}
];
