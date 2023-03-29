import Header from "../components/Header";
import EnterGame from "../components/EnterGame";
import Footer from "../components/Footer";

import cls from './home.module.css';

function Home() {
    return (
        <div>
            <Header label="Stats" href="stats" />
            <main className="header-above">
                <div className="container main-container">
                    <section className="section">
                        <h2 className="title section-title title-center">Description</h2>
                        <p className="paragraph section-paragraph paragraph-center">
                            This is a very exciting geography game. At the start, it puts the player in a random location of Google Street View (a service of panoramic photos). The player can "walk" around the location to see more references. The main goal is to guess where the player was placed: exact continent, exact country, state, city/town, street, etc.., for this purpose you are given a 2D-map, that you can move/zoom - you have to mark your guess on it and click "Guess". At this point the game ends and you will be shown the actual location, guess accuracy and other details.
                        </p>
                    </section>
                    <section className="section">
                        <h2 className="title section-title title-center">Enter the game</h2>
                        <EnterGame className={cls.enter_game} />
                    </section>
                    <section className="section">
                        <h2 className="title section-title title-center">Tutorial</h2>
                        <p className="paragraph section-paragraph paragraph-center">
                            If you want, you can set your preferences before entering the game. In the first field, you specify the region you want to discover. Choose what you want: the whole world (an absolutely random location), or a continent you like (a random location exactly on this continent). Then you can see the "Preferences" button. If you click it, you will be shown the preferences. You can enable/disable the compass, or the visible timer (it will not affect the in-game timer). The next feature - you can enable experiments. Just hold the "Preferences" button for 3 seconds. Here you can disable "small-screen-ban", for example.
                        </p>
                        <p className="paragraph section-paragraph paragraph-center">
                            After you've set your preferences, you're ready to enter the game. Just press the "START" button. Wait until a random location is loaded and then you're finally in the game, you can play now. Let's look at the interface. In the left-top corner are the utilities, that you can enable/disable in the Preferences. In the right-top is the game info. In the left-bottom is the game navigation: quit the game, return the start and zoom in/out the panorama. In the right-bottom is the 2D minimap, where you can mark your guess. You can make it bigger/smaller, or hide/show it - if you would like to; for better accuracy - move and zoom it. And of course, you see the panorama. You can look around it by dragging with the mouse. You can walk by pressing the arrows or a place on the screen. If you want to mark your guess - click a place on the minimap and then click the "Guess" button.
                        </p>
                        <p className="paragraph section-paragraph paragraph-center">
                            Your goal is to guess where you were placed. Exactly where you were placed at the start and not where you currently are: for example, if you were placed to France, and you decided to travel to Spain by a road, then if you mark Spain as your guess, you will miss, because you were placed to France and you should've marked France. Actually, at the start, you don't know if it's France or Spain, or some another country, but that was just an example.
                        </p>
                        <p className="paragraph section-paragraph paragraph-center">
                            At the end you are shown the results: your guess position and the real position; distance between them and time spent guessing; guess accuracy and points; formulas (if you want to know how the calculations work) and the link to the homepage. Guess accuracy depends on the distance - the closer you guess, the bigger your accuracy. Points depend on the accuracy and the time - the bigger your accuracy, the more points you get; the faster you guess - the more points you get. Again, the formulas are shown.
                        </p>
                        <p className="paragraph section-paragraph paragraph-center">
                            You can see your stats and history - the link or icon in the right-top corner of the homepage. You can pause logging history; export it to a local file, import or delete. Sometimes you will have to complete the "captcha".
                        </p>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Home;
