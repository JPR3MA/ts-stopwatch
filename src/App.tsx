import './App.css'
import { useRef, useEffect, useReducer, } from 'react'
import { Lap, ReducerState, initState, ACTION, reducer } from './components/reducer'
import { pad00, computeTime } from './components/functions'

function App() {
  const [state, dispatch] = useReducer(reducer, initState)
  const miliseconds = useRef(0)
  const interval = useRef(0)
  const updateDisplay = (display: string) => {
    dispatch({
      type: ACTION.DISPLAY_UPDATE,
      strPayload: display
    })
  }
  const updateTimer = (timer: number) => {
    dispatch({
      type: ACTION.TIMER_UPDATE,
      numPayload: timer
    })
  }
  const updateLeftButton = (buttonContent: ReducerState['leftButton']) => {
    dispatch({
      type: ACTION.LEFTBUTTON_UPDATE,
      leftPayload: buttonContent
    })
  }
  const updateRightButton = (buttonContent: ReducerState['rightButton']) => {
    dispatch({
      type: ACTION.RIGHTBUTTON_UPDATE,
      rightPayload: buttonContent
    })
  }
  const updateLaps = (laps: ReducerState['laps'] | 'CLEAR') => {
    if ( laps === 'CLEAR' ) {
      dispatch({
        type: ACTION.LAPS_UPDATE,
        lapPayload: [
          {
            lapNumber: 'Lap',
            lapDisplay: 'Lap-time',
            lapOverall: 'Overall-time',
            lapTimer: 0,
            previousLapTimer: 0
          }
        ],
      })
      dispatch({
        type: ACTION.LAP_RESET
      })
    } else {
      dispatch({
        type: ACTION.LAPS_UPDATE,
        lapPayload: laps
      })
    }
  }
  const addLap = () => {
    dispatch({ type: ACTION.ADD_LAP })
    var newLaps = state.laps
    var lapTime = state.timer - state.laps[state.lapCounter].previousLapTimer
    var newLap: Lap = {
      lapNumber: pad00(state.lapCounter + 1),
      lapDisplay: computeTime(lapTime),
      lapOverall: computeTime(miliseconds.current),
      lapTimer: lapTime,
      previousLapTimer: state.timer
    }
    newLaps.push(newLap)
    updateLaps(newLaps)
  }
  const runTimer = () => {
    ++miliseconds.current
    updateDisplay(computeTime(miliseconds.current))
    updateTimer(miliseconds.current)
  }

  function handleLeftButtonClick(buttonContent: ReducerState['leftButton']) {
    if (buttonContent === 'LAP') {
      addLap()
    } else if (buttonContent === 'RESET') {
      miliseconds.current = 0
      updateDisplay('00:00:00,00')
      updateLeftButton('lap')
      updateRightButton('START')
      updateLaps('CLEAR')
    } else {
      console.log('timer not running yet')
    }
  }
  function handleRightButtonClick(buttonContent: ReducerState['rightButton']) {
    if (buttonContent === 'START') {
      interval.current = setInterval(runTimer, 10)
      updateLeftButton('LAP')
      updateRightButton('STOP')
    } else if (buttonContent === 'STOP') {
      clearInterval(interval.current)
      interval.current = 0
      updateLeftButton('RESET')
      updateRightButton('RESUME')
    } else {
      interval.current = setInterval(runTimer, 10)
      updateLeftButton('LAP')
      updateRightButton('STOP')
    }
  }
  useEffect(() => {
    return () => clearInterval(interval.current);
  }, []);
  
  return (
    <>
      <div>
        <h2>{state.display}</h2>
        <button onClick={() => handleLeftButtonClick(state.leftButton)}>{state.leftButton}</button>
        <button onClick={() => handleRightButtonClick(state.rightButton)}>{state.rightButton}</button>
      </div>
      <div className='lap_rows'>
        {state.laps.map((content) => (
          <div className='lap_columns' key={content.lapNumber}>
            <p className='number'>{content.lapNumber}</p>
            <p className='displays'>{content.lapDisplay}</p>
            <p className='displays'>{content.lapOverall}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default App