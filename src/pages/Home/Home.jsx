import Header from '../../components/Header/Header';
import EnterGame from '../../components/EnterGame/EnterGame';
import Footer from '../../components/Footer/Footer';

import cls from './home.module.css';

function Home() {
    return (
        <div>
            <Header label="Stats" href="/stats" />
            <main className="header-above">
                <div className="container main-container">
                    <section className="section">
                        <h2 className="title section-title title-center">Description</h2>
                        <p className="paragraph section-paragraph paragraph-center">
                            This is a very exciting geography game. At the start, it puts the player in a random
                            location of Google Street View (a service of panoramic photos). The player can "walk" around
                            the location to see more references. The main goal is to guess where the player was placed:
                            exact continent, exact country, state, city/town, street, etc.., for this purpose you are
                            given a 2D-map, that you can move/zoom - you have to mark your guess on it and click
                            "Guess". At this point the game ends and you will be shown the actual location, guess
                            accuracy and other details.
                        </p>
                        <p className="paragraph section-paragraph title-center">
                            I really like this game, so I decided to make a clone of it myself from scratch. Initially I
                            used Vanilla JS and jQuery with Gulp, the game also required some weird user interactions to
                            generate random locations, because I could not invent how to make it automatically. That was
                            a year ago. But then I decided to rewrite the project in React and improve it. And that is
                            not as easy as it may seem, because React uses completely different approach compared to
                            Vanilla, it is impossible to just copy/paste the code fragments, more than 85% of the code
                            was completely rewritten. Ok, nevermind. In the result, I have more modern code; in
                            addition, I have rid out of that hacky randomizer (now it works automatically), corrected
                            some formulas and a little better mobile view. And I also have some ideas to improve this
                            game, I'm gonna implement them in future.
                        </p>
                        <p className="paragraph section-paragraph title-center">
                            Links:{' '}
                            <a
                                href="https://github.com/anonymouspenguin000/Geoguessr-clone-old"
                                target="_blank"
                                rel="noreferrer"
                            >
                                [old repo]
                            </a>
                            ;{' '}
                            <a
                                href="https://github.com/anonymouspenguin000/geoguessr-clone"
                                target="_blank"
                                rel="noreferrer"
                            >
                                [current repo]
                            </a>
                        </p>
                    </section>
                    <section className="section">
                        <h2 className="title section-title title-center">Enter the game</h2>
                        <EnterGame className={cls.enter_game} />
                    </section>
                    <section className="section">
                        <h2 className="title section-title title-center">Tutorial</h2>
                        <p className="paragraph section-paragraph paragraph-center">
                            If you want, you can set your preferences before entering the game. In the first field you can specify the region you want to discover. Then you can see the "Preferences" button, it opens the preferences on press: you can enable/disable the compass or the visible timer. The next feature - you can enable experiments: just hold the "Preferences" button for 2 seconds.
                        </p>
                        <p className="paragraph section-paragraph paragraph-center">
                            After you've set your preferences, you're ready to enter the game, just press the "START" button. Wait until a random location is loaded and then you're finally in the game, you can play now. Let's look at the interface. In the left-top corner are the utilities, that you can enable/disable in the Preferences. In the right-top is the game info. In the left-bottom is the game navigation: quit the game, return to the start, zoom in/out the panorama. In the right-bottom is the 2D minimap, where you can mark your guess; you can also move/zoom it for better accuracy, make it bigger/smaller or collapse it. And of course, you see the panorama. You can look around it by dragging with the mouse and walk by pressing the arrows or a place on the screen. If you want to mark your guess - click a place on the minimap and then click the "Guess" button.
                        </p>
                        <p className="paragraph section-paragraph paragraph-center">
                            Your goal is to guess where you were placed. Exactly where you were placed at the start and not where you currently are: for example, if you were placed to France, and you decided to travel to Spain by a road, then if you mark Spain as your guess, you will miss, because you were placed to France and you should've marked France. Actually, you don't know if it's France or Spain, or some another country, but that was just an example.
                        </p>
                        <p className="paragraph section-paragraph paragraph-center">
                            At the end you are shown the results: your guess position and the real position, distance between them and time spent to guess, guess accuracy and points, first link to show the formulas and the second to return home.
                        </p>
                        <p className="paragraph section-paragraph paragraph-center">
                            You can see your stats - visit the link in the right-top corner of the homepage. You are shown your summary and history, you can pause logging the progress, export it to a local file, import or delete.
                        </p>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Home;
