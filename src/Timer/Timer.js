import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PlayButton from '../Play/PlayButton';
import style from './Timer.module.css';
import PauseButton from '../Pause/PauseButton';
import SettingsButton from '../Settings/SettingsButton';
import { useContext, useState, useEffect, useRef } from 'react';
import SettingsContext from '../Settings/SettingsContext';

const red = '#f54e4e';
const green = '#4aec8c';

function Timer() {
    const settingsInfo = useContext(SettingsContext)
    const [isPaused, setIsPaused] = useState(true);
    const [secondsLeft, setSecondsLeft] = useState(0);
    //maybe because secondsleft is initialized to 0
    const [mode, setMode] = useState('work');

    const secondsLeftRef = useRef(secondsLeft);
    const isPausedRef = useRef(isPaused);
    const modeRef = useRef(mode);

    function switchMode(){
        const nextMode = modeRef.current === 'work' ? 'break' : 'work';
        const nextSeconds = (nextMode === 'work' ? settingsInfo.workMinutes : settingsInfo.breakMinutes) * 60;
        setMode(nextMode);
        modeRef.current = nextMode;
        setSecondsLeft(nextSeconds);
        secondsLeftRef.current = nextSeconds;
    }

    // function initTimer() {
    //     setSecondsLeft(settingsInfo.workMinutes*60);
    // }
    function initTimer() {
        if (settingsInfo.workMinutes > 0 && settingsInfo.breakMinutes > 0) {
            const initialSeconds = settingsInfo.workMinutes * 60;
            setSecondsLeft(initialSeconds);
            secondsLeftRef.current = initialSeconds;

            console.log(`Initialized timer with ${initialSeconds} seconds for work mode`);
        } else {
            console.error('Invalid work or break minutes');
        }
    }

    function tick(){
        secondsLeftRef.current--;
        setSecondsLeft(secondsLeftRef.current)
    }


    useEffect(() => {
        initTimer();

        const interval = setInterval(() => {
            if(isPausedRef.current){
                return;
            }
            if(secondsLeftRef.current === 0){
                return switchMode();
            }
            tick();
        }, 1000);
        return () => clearInterval(interval)
    }, [settingsInfo]);

    const totalSeconds = mode === 'work' 
        ? settingsInfo.workMinutes * 60
        : settingsInfo.breakMinutes * 60;

    const percentage = Math.round(secondsLeft/totalSeconds * 100);

    const minutes = Math.floor(secondsLeft/60);

    let seconds = secondsLeft % 60;
    if(seconds < 10) seconds = '0'+ seconds;

    return(
        <div>
            <CircularProgressbar 
                value={percentage} 
                text={minutes + ':' + seconds} 
                styles={buildStyles({
                    textColor: '#bcbcbc',
                    pathColor: mode === 'work' ? red : green,
                    trailColor: 'rgba(255, 255, 255, .2)',
                    backgroundColor: '#3e98c7',
                })}
            />
            <div className={style.playButton}>
                {isPaused
                ? <PlayButton onClick={() => {setIsPaused(false); isPausedRef.current = false; }}/> 
                : <PauseButton onClick={() => {setIsPaused(true); isPausedRef.current = true; }}/>}
            </div>
            <div className={style.settings}>
                <SettingsButton onClick={() => settingsInfo.setShowSettings(true)}/>
            </div>
        </div>
    );
}
export default Timer;

