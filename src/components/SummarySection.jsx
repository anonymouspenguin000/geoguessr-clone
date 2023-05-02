import PropTypes from "prop-types";

import SummaryRow from "./SummaryRow";

import readableTime from "../utils/readable/readable-time";
import readablePercentage from "../utils/readable/readable-percentage";

import regionImg from "../assets/img/region.png";
import timerImg from "../assets/img/timer.png";
import pointsImg from "../assets/img/points.png";
import accuracyImg from "../assets/img/accuracy.png";

import cls from "./summary-section.module.css";

function SummarySection({ history }) {
    const smTotal = {
        locations: 0,
        time: 0,
        points: 0,
        accuracy: 0 // To calculate average
    };
    const smBest = {
        accuracy: 0,
        time: Infinity,
        points: 0
    };
    history.forEach(el => {
        smTotal.locations++;
        smTotal.time += el.tm;
        smTotal.points += el.pt;
        smTotal.accuracy += el.ac;

        smBest.accuracy = Math.max(smBest.accuracy, el.ac);
        smBest.time = Math.min(smBest.time, el.tm);
        smBest.points = Math.max(smBest.points, el.pt);
    });
    const smAverage = history.length ? {
        accuracy: smTotal.accuracy / history.length,
        time: ~~(smTotal.time / history.length),
        points: ~~(smTotal.points / history.length)
    } : {
        accuracy: 0,
        time: Infinity,
        points: 0
    };

    return (
        <div>
            <div>
                <h3 className="title title-s title-center section-title">Total</h3>
                <SummaryRow className={cls.row} cards={[
                    {
                        title: 'Locations discovered',
                        value: smTotal.locations.toString(),
                        icon: regionImg
                    },
                    {
                        title: 'Time playing',
                        value: readableTime(smTotal.time),
                        icon: timerImg
                    },
                    {
                        title: 'Points',
                        value: smTotal.points.toString(),
                        icon: pointsImg
                    }
                ]} />
            </div>
            <div>
                <h3 className="title title-s title-center section-title">Best</h3>
                <SummaryRow className={cls.row} cards={[
                    {
                        title: 'Accuracy',
                        value: readablePercentage(smBest.accuracy),
                        icon: accuracyImg
                    },
                    {
                        title: 'Time guessing',
                        value: smBest.time === Infinity ? '-' : readableTime(smBest.time),
                        icon: timerImg
                    },
                    {
                        title: 'Points for a location',
                        value: smBest.points.toString(),
                        icon: pointsImg
                    }
                ]} />
            </div>
            <div>
                <h3 className="title title-s title-center section-title">Average</h3>
                <SummaryRow className={cls.row} cards={[
                    {
                        title: 'Accuracy',
                        value: readablePercentage(smAverage.accuracy),
                        icon: accuracyImg
                    },
                    {
                        title: 'Time guessing',
                        value: smAverage.time === Infinity ? '-' : readableTime(smAverage.time),
                        icon: timerImg
                    },
                    {
                        title: 'Points for a location',
                        value: smAverage.points.toString(),
                        icon: pointsImg
                    }
                ]} />
            </div>
        </div>
    );
}

SummarySection.propTypes = {
    history: PropTypes.array
};
SummarySection.defaultProps = {
    history: []
};

export default SummarySection;
