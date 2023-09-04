import { useReducer, useState } from 'react';
import './App.scss';

interface IState {
	todos: string[];
}

interface IAction {
	type: string;
	payload: string;
}

const initialState: IState = {
	todos: []
};

const reducer = (state: IState, action: IAction) => {
	const _state = { ...state };
	switch (action.type) {
		case 'addTodo':
			_state.todos.push(action.payload);
	}
	return _state;
}

function App() {
	const [state, dispatch] = useReducer(reducer, initialState);
	const [ todo, setTodo ] = useState('');


	return (
		<div>
			<h1>Reducer Todo List</h1>
			<input value={todo} onChange={(e) => setTodo(e.target.value)}/>
			<div><button onClick={() => dispatch({type: 'addTodo', payload:todo})}>Add Todo</button></div>
			<hr/>
			<div>There are {state.todos.length} todos:</div>
			{state.todos.map(todo => {
				return (
					<div>{todo}</div>
				)
			})}
		</div>
	)
}

export default App
