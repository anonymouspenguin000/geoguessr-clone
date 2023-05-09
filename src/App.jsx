import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {useSelector} from 'react-redux';

import {routes} from './router';

function App() {
    const acDEekrstu = useSelector(state => state.common.acDEekrstu);

    return (
        <div className={acDEekrstu}>
            <BrowserRouter>
                <Routes>
                    {routes.map(route => <Route key={route.path} path={route.path} element={route.element()} />)}
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
