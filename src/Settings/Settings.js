import style from './Settings.module.css';
import ReactSlider from 'react-slider';
import SettingsContext from './SettingsContext';
import { useContext } from 'react';
import BackButton from '../Back/BackButton';

function Settings(){

    const settingsInfo = useContext(SettingsContext);

    return (
        <div className={style.SettingsContainer}>
            <div className={style.minutesContainer}>
                <label className={style.label}>work minutes: {settingsInfo.workMinutes}:00</label> 
                <ReactSlider
                    className={style.sliderWork}
                    thumbClassName={style.thumb}
                    trackClassName={style.track}
                    value={settingsInfo.workMinutes}
                    onChange={newValue => settingsInfo.setWorkMinutes(newValue)}
                    min={1}
                    max={120}
                />
                <label className={style.label}>break minutes: {settingsInfo.breakMinutes}:00</label>
                <ReactSlider
                    className={style.sliderBreak}
                    thumbClassName={style.thumb}
                    trackClassName={style.track}
                    value={settingsInfo.breakMinutes}
                    onChange={newValue => settingsInfo.setBreakMinutes(newValue)}
                    min={1}
                    max={120}
                />
            </div>
            <BackButton onClick={() => settingsInfo.setShowSettings(false)}/>
        </div>
    );
}

export default Settings; 