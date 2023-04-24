import GameUI from '../components/GameUI';

import cls from './game.module.css';

function Game() {
    return (
        <div className={cls.game}>
            <GameUI className={cls.ui} />
            <div className={cls.pano} style={{background: 'grey', width: '100%', height: '100vh'}}></div>
        </div>
    );
}

export default Game;
