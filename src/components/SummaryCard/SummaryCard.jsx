import PropTypes from 'prop-types';

import spbw from '../../utils/spbw';
import cls from './summary-card.module.css';

function SummaryCard({ className, title, value, icon }) {
    return (
        <div className={spbw(cls.card, className)}>
            <div>
                <img src={icon} alt="icon" className={cls.icon} />
            </div>
            <p>{value}</p>
            <p className={cls.title}>{title}</p>
        </div>
    );
}
SummaryCard.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    value: PropTypes.string,
    icon: PropTypes.string
};
SummaryCard.defaultProps = {
    className: '',
    title: '',
    value: '',
    icon: ''
};

export default SummaryCard;
