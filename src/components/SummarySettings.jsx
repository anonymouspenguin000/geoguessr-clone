import {useState} from "react";
import PropTypes from "prop-types";

import Checkbox from "./UI/Checkbox";
import Button from "./UI/Button";
import SummarySection from "./SummarySection";

import storageValues from '../config/storage.json';
import cls from "./summary-settings.module.css";

function SummarySettings({ history }) {
    const noProgress = !(history || []).length;
    const [pauseLog, setPauseLog] = useState(JSON.parse(localStorage.getItem(storageValues.pref) || '{}')?.pauseProgress || false);

    const onPauseCbChange = e => {
        const val = e.target.checked;
        localStorage.setItem(storageValues.pref, `{"pauseProgress": ${val}}`);
        setPauseLog(val);
    }
    const onExpProgressClick = () => {
        if (noProgress) return;

        const expLink = document.createElement('a');
        expLink.download = 'ggc-progress.json.b64';

        expLink.href = URL.createObjectURL(new Blob([window.btoa(encodeURIComponent(JSON.stringify(history)))], {type: 'text/plain'}));
        expLink.click();
    }
    const onImpProgressClick = () => {
        const fileElem = document.createElement('input');
        fileElem.type = 'file';

        fileElem.onchange = () => {
            if (!noProgress && prompt('You will lose your old data. Type "IMPORT" without quotes to continue.') !== 'IMPORT') return;

            const reader = new FileReader();
            reader.onload = () => {
                localStorage.setItem(storageValues.hist, decodeURIComponent(atob(reader.result.toString())));
                window.location.reload();
            }

            reader.readAsText(fileElem.files[0]);
        }

        fileElem.click();
    }
    const onDelProgressClick = () => {
        if (noProgress || prompt('Type "DELETE" without quotes to continue.') !== 'DELETE') return;
        localStorage.clear();
        window.location.reload();
    }

    return (
        <div>
            <div className={cls.option_set}>
                <label>
                    <Checkbox checked={pauseLog} onChange={onPauseCbChange} className="checkbox checkbox-mr" />
                    Pause logging progress
                </label>
            </div>
            <div className={cls.option_set}>
                <Button onClick={onExpProgressClick}>Export</Button>
                <Button onClick={onImpProgressClick}>Import</Button>
                <Button onClick={onDelProgressClick} className="danger">Delete</Button>
            </div>
        </div>
    );
}

SummarySettings.propTypes = {
    history: PropTypes.array
};
SummarySection.defaultProps = {
    history: []
};

export default SummarySettings;
