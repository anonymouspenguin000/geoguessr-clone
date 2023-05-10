import PropTypes from 'prop-types';

import SummaryCard from '../SummaryCard/SummaryCard';
import spbw from '../../utils/spbw';

import cls from './summary-row.module.css';

function SummaryRow({ className, cards }) {
    return (
        <div className={spbw(cls.row, className)}>
            {cards.map(card => <SummaryCard key={card.title} className={cls.card} {...card} />)}
        </div>
    );
}

SummaryRow.propTypes = {
    className: PropTypes.string,
    cards: PropTypes.array
};
SummaryRow.defaultProps = {
    className: '',
    cards: []
};

export default SummaryRow;
