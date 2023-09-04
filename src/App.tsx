import { useReducer } from 'react';
import './App.scss';

interface IState {
  count: number
}

const initialState: IState = {
  count: 0
};

const reducer = (state: IState, action: string) => {
  const _state = {...state};
  switch (action) {
    case 'change888':
      _state.count = 888;
      break;
    case 'change999':
      _state.count = 999;
      break;
  }
  return _state;
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);


  return (
    <div>
      <h1>Reducer Todo List</h1>
      <div>Number: {state.count}</div>
      <div><button onClick={() => dispatch("change888")}>Change to 888 count</button></div>
      <div><button onClick={() => dispatch("change999")}>Change to 999 count</button></div>
    </div>
  )
}

export default App
