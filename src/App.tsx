import { useReducer } from 'react';
import './App.scss';

const initialState = {
  number: 0
};

// const reducer = (state, action) => {
//   const _state = {};

//   return _state;
// }

function App() {
  // const [state, dispatch] = useReducer(reducer, initialState);


  return (
    <div>
      <h1>Reducer Todo List</h1>
      <div>Number: {initialState.number}</div>
    </div>
  )
}

export default App
