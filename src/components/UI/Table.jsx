import PropTypes from "prop-types";

import spbw from "../../utils/spbw";
import uniqueTimestamp from "../../utils/unique-timestamp";

import cls from './table.module.css';

const utsFn = uniqueTimestamp();

function Table({ className, titles, data, rowIds, colReplacer }) {
    const getTitleId = title => title.id || title.value;
    const getTitleIdByIdx = idx => getTitleId(titles[idx]);

    const getColData = (colId, col, rowId) => {
        const resProps = {
            key: colId,
            $: col
        };

        if (colReplacer) {
            Object.assign(resProps, colReplacer(colId, col, rowId) || {});
        }

        return resProps;
    };

    return (
        <table className={spbw(cls.table, className)}>
            {!!titles.length && <thead>
                <tr>
                    {titles.map(title => {
                        const {$: inner, ...colProps} = getColData(getTitleId(title), title.value);
                        return <th {...colProps}>{inner}</th>
                    })}
                </tr>
            </thead>}
            <tbody>
                {data.map((row, rowIdx) => {
                    const rowId = rowIds[rowIdx] ?? utsFn();
                    return <tr key={rowId}>
                        {titles
                            .map((_ign, idx) => row[idx] ?? '')
                            .slice(0, titles.length)
                            .map((col, colIdx) => {
                                const {$: inner, ...colProps} = getColData(getTitleIdByIdx(colIdx), col, rowIdx);
                                return <td {...colProps}>{inner}</td>
                            })}
                    </tr>
                })}
            </tbody>
        </table>
    );
}

Table.propTypes = {
    className: PropTypes.string,
    titles: PropTypes.array,
    data: PropTypes.array,
    rowIds: PropTypes.array,
    colReplacer: PropTypes.func
};
Table.defaultProps = {
    className: '',
    titles: [],
    data: [],
    rowIds: []
};

export default Table;
