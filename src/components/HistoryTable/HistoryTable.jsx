import PropTypes from "prop-types";

import Table from "../UI/Table/Table";

import geoUrl from "../../utils/geo-url";
import strCut from "../../utils/str-cut";
import readablePercentage from "../../utils/readable/readable-percentage";
import readableTime from "../../utils/readable/readable-time";
import readableDate from "../../utils/readable/readable-date";
import readableDistance from "../../utils/readable/readable-distance";

import gameValues from '../../config/game.json';
import cls from "./history-table.module.css";

function HistoryTable({ history }) {
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
        <div className="table-wrapper">
            <Table
                className={cls.table}
                titles={
                    colNameOrder.map(name => ({
                        id: name,
                        value: colNames[name]
                    }))
                }
                data={history.map((row) => colNameOrder.map(name => row[name])).reverse()}
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
    history: PropTypes.array
};
HistoryTable.defaultProps = {
    history: []
};

export default HistoryTable;
