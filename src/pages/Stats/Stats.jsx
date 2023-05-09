import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import HistoryTable from "../../components/HistoryTable/HistoryTable";
import SummarySection from "../../components/SummarySection/SummarySection";
import SummarySettings from "../../components/SummarySettings/SummarySettings";

import calcGeoDistance from "../../utils/calc/calc-geo-distance";
import calcAccuracy from "../../utils/calc/calc-accuracy";
import calcPoints from "../../utils/calc/calc-points";

import storageValues from '../../config/storage.json';

function Stats() {
    const rawHst = JSON.parse(localStorage.getItem(storageValues.hist) || '[]');

    const hst = rawHst.map((row, idx) => {
        const rowClone = {...row};

        rowClone.id = idx + 1;
        rowClone.ds = calcGeoDistance(row.gp, row.rp);
        rowClone.ac = calcAccuracy(rowClone.ds);
        rowClone.pt = calcPoints(rowClone.ac, row.tm);

        return rowClone;
    });

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
                        <SummarySection history={hst} />
                    </section>
                    <section className="section">
                        <h2 className="title title-center section-title">History</h2>
                        <HistoryTable history={hst} />
                    </section>
                    <section className="section">
                        <h2 className="title title-center section-title">Progress Settings</h2>
                        <SummarySettings history={rawHst} />
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Stats;
