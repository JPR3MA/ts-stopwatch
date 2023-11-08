export type Lap = {
  lapNumber: string,
  lapDisplay: string,
  lapOverall: string,
  lapTimer: number,
  previousLapTimer: number
}
export type ReducerState = {
  display: string,
  timer: number,
  leftButton: 'lap' | 'LAP' | 'RESET',
  rightButton: 'START' | 'STOP' | 'RESUME',
  lapCounter: number,
  laps: Array<Lap>
}
type ReducerAction = {
  type: ACTION,
  strPayload?: string,
  numPayload?: number,
  objPayload?: Object,
  leftPayload?: ReducerState['leftButton'],
  rightPayload?: ReducerState['rightButton'],
  lapPayload?: ReducerState['laps'],
}

export const initState: ReducerState = {
  display: '00:00:00,00',
  timer: 0,
  leftButton: 'lap',
  rightButton: 'START',
  lapCounter: 0,
  laps: [
    {
      lapNumber: 'Lap',
      lapDisplay: 'Lap-time',
      lapOverall: 'Overall-time',
      lapTimer: 0,
      previousLapTimer: 0
    }
  ]
}
export const enum ACTION {
  DISPLAY_UPDATE,
  TIMER_UPDATE,
  LEFTBUTTON_UPDATE,
  RIGHTBUTTON_UPDATE,
  ADD_LAP,
  LAP_RESET,
  LAPS_UPDATE,
}
export const reducer = (state: ReducerState, action: ReducerAction): ReducerState => {
  switch (action.type) {
    case ACTION.DISPLAY_UPDATE:
      return { ...state, display: action.strPayload ?? '00:00:00,00' }
    case ACTION.TIMER_UPDATE:
      return { ...state, timer: action.numPayload ?? 0 }
    case ACTION.LEFTBUTTON_UPDATE:
      return { ...state, leftButton: action.leftPayload ?? state.leftButton }
    case ACTION.RIGHTBUTTON_UPDATE:
      return { ...state, rightButton: action.rightPayload ?? state.rightButton }
    case ACTION.ADD_LAP:
      return {...state, lapCounter: state.lapCounter + 1 }
    case ACTION.LAP_RESET:
      return { ...state, lapCounter: 0 }
    case ACTION.LAPS_UPDATE:
      return { ...state, laps: action.lapPayload ?? state.laps }
    default:
      throw new Error()
  }
}