import PropTypes from "prop-types";

import Table from "./UI/Table";

import calcPoints from "../utils/calc/calc-points";
import calcAccuracy from "../utils/calc/calc-accuracy";
import readableDistance from "../utils/readable/readable-distance";
import calcGeoDistance from "../utils/calc/calc-geo-distance";

import geoUrl from "../utils/geo-url";
import strCut from "../utils/str-cut";
import readablePercentage from "../utils/readable/readable-percentage";
import readableTime from "../utils/readable/readable-time";
import readableDate from "../utils/readable/readable-date";

import gameValues from '../config/game.json';
import cls from "../pages/stats.module.css";

function HistoryTable({ className, history }) {
    const colNameOrder = ['id', 'rg', 'gp', 'rp', 'ds', 'ac', 'tm', 'pt', 'dt'];
    const colNames = {
        id: '#',
        rg: 'Region',
        gp: 'Guess Position',
        rp: 'Real Position',
        ds: 'Distance',
        ac: 'Accuracy',
        tm: 'Time',
        pt: 'Points',
        dt: 'Date'
    };

    return (
        <div className={className}>
            <Table
                className={cls.history}
                titles={
                    colNameOrder.map(name => ({
                        id: name,
                        value: colNames[name]
                    }))
                }
                data={history.map((row, idx) => {
                    // This callback is about computing; colReplacer is about rendering - that's why they are split
                    const rowClone = Object.assign({}, row);
                    rowClone.id = idx + 1;
                    rowClone.ds = calcGeoDistance(row.gp, row.rp);
                    rowClone.ac = calcAccuracy(rowClone.ds);
                    rowClone.pt = calcPoints(rowClone.ac, row.tm);

                    return colNameOrder.map(name => rowClone[name]);
                }).reverse()}
                rowIds={history.map(row => row.dt)}
                colReplacer={(colId, col, rowIdx) => {
                    if (rowIdx !== undefined) switch (colId) {
                        case 'rg':
                            return {
                                $: gameValues.regionNames[col]
                            };
                        case 'gp':
                        case 'rp':
                            return {
                                $: <a
                                    href={geoUrl(col)}
                                    title={col.join(', ')}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    {col.map(el => strCut(el.toString(), 4)).join(',')}
                                </a>,
                                className: 'geolink'
                            };
                        case 'ds': return {
                            $: readableDistance(col)
                        };
                        case 'ac': return {
                            $: readablePercentage(col)
                        };
                        case 'tm': return {
                            $: readableTime(col)
                        };
                        case 'dt': return {
                            $: readableDate(+col)
                        };
                        default: break;
                    }
                    return {};
                }}
            />
        </div>
    );
}

HistoryTable.propTypes = {
    className: PropTypes.string,
    history: PropTypes.array
};
HistoryTable.defaultProps = {
    className: '',
    history: []
};

export default HistoryTable;
