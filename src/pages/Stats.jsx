import Header from "../components/Header";
import Footer from "../components/Footer";
import SummaryRow from "../components/SummaryRow";
import Checkbox from "../components/UI/Checkbox";
import Button from "../components/UI/Button";
import HistoryTable from "../components/HistoryTable";

import regionImg from '../assets/img/region.png';
import timerImg from '../assets/img/timer.png';
import pointsImg from '../assets/img/points.png';
import accuracyImg from '../assets/img/accuracy.png';

import cls from './stats.module.css';

function Stats() {
    // Temp:
    const hst = JSON.parse(`[{"rg":"world","gp":[0,0],"rp":[-32.51352817613138,-68.23126950468566],"tm":22,"dt":1678021363233},{"rg":"world","gp":[29.60691013941296,31.50305280822438],"rp":[24.292943299999997,55.1269353],"tm":15,"dt":1678022447377},{"rg":"world","gp":[35.54157804069981,-102.57064326956656],"rp":[-33.4028582,151.011251],"tm":30,"dt":1678022541037},{"rg":"world","gp":[-30.00237575206099,30.01933847183026],"rp":[-32.45718521200707,118.82926792548768],"tm":42,"dt":1678108102146},{"rg":"world","gp":[24.92672827414734,52.347455487174145],"rp":[24.8553616,55.4674038],"tm":193,"dt":1678110129657},{"rg":"world","gp":[-16.334954866206584,28.210040552376253],"rp":[-33.0600014,-66.0763855],"tm":212,"dt":1678174984155},{"rg":"world","gp":[41.51015420597021,-99.18016586544898],"rp":[39.37279665131374,-92.58467747444317],"tm":94,"dt":1678175111874},{"rg":"world","gp":[-35.223200914484195,149.70500533296592],"rp":[-27.7415587,140.7339584],"tm":31,"dt":1678176001836},{"rg":"world","gp":[31.5135625631004,120.41004392438347],"rp":[5.2186221999999995,115.6023978],"tm":69,"dt":1678376990740},{"rg":"world","gp":[52.7989090663916,158.651955853844],"rp":[33.062966599999996,139.7959091],"tm":96,"dt":1678377174313},{"rg":"world","gp":[49.1492007424505,31.36565253684208],"rp":[53.4684794,38.4132874],"tm":39,"dt":1679149025062},{"rg":"world","gp":[-10.141931686131018,24.06152307987213],"rp":[20.2152404,-98.7309058],"tm":13,"dt":1680633987602}]`);

    return (
        <div>
            <Header label="Home" href="/" />
            <main className="header-above">
                <div className="container main-container">
                    <h1 className="title title-l title-center section-title">Your Stats</h1>
                    <p className="paragraph paragraph-center">
                        Your stats are kept locally in your browser, servers or databases aren't used. You can
                        export/import your stats as a file anytime.
                    </p>
                    <section className="section">
                        <h2 className="title title-center section-title">Summary</h2>
                        <div className="stats-section__part">
                            <h3 className="title title-s title-center section-title">Total</h3>
                            <SummaryRow className={cls.summary_row} cards={[
                                {
                                    title: 'Locations discovered',
                                    value: '0',
                                    icon: regionImg
                                },
                                {
                                    title: 'Time playing',
                                    value: '0s',
                                    icon: timerImg
                                },
                                {
                                    title: 'Points',
                                    value: '0',
                                    icon: pointsImg
                                }
                            ]} />
                        </div>
                        <div className="stats-section__part">
                            <h3 className="title title-s title-center section-title">Best</h3>
                            <SummaryRow cards={[
                                {
                                    title: 'Accuracy',
                                    value: '0%',
                                    icon: accuracyImg
                                },
                                {
                                    title: 'Time guessing',
                                    value: '-',
                                    icon: timerImg
                                },
                                {
                                    title: 'Points for a location',
                                    value: '0',
                                    icon: pointsImg
                                }
                            ]} />
                        </div>
                        <div className="stats-section__part">
                            <h3 className="title title-s title-center section-title">Average</h3>
                            <SummaryRow cards={[
                                {
                                    title: 'Accuracy',
                                    value: '0%',
                                    icon: accuracyImg
                                },
                                {
                                    title: 'Time guessing',
                                    value: '-',
                                    icon: timerImg
                                },
                                {
                                    title: 'Points for a location',
                                    value: '0',
                                    icon: pointsImg
                                }
                            ]} />
                        </div>
                    </section>
                    <section className="section">
                        <h2 className="title title-center section-title">History</h2>
                        <HistoryTable className={cls.history} history={hst} />
                    </section>
                    <section className="section">
                        <h2 className="title title-center section-title">Progress Settings</h2>
                        <div>
                            <div className={cls.option_set}>
                                <label>
                                    <Checkbox className="checkbox checkbox-mr" />
                                    Pause logging progress
                                </label>
                            </div>
                            <div className={cls.option_set}>
                                <Button>Export</Button>
                                <Button>Import</Button>
                                <Button className="danger">Delete</Button>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Stats;
