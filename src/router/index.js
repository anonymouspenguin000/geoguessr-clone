import Home from "../pages/Home";
import Stats from '../pages/Stats';

export const routes = [
    {path: '/', element: () => <Home />},
    {path: '/stats', element: () => <Stats />}
];
