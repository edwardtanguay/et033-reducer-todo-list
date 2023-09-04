import { useReducer, useState } from 'react';
import './App.scss';

interface IState {
	todos: string[];
}

interface IAction {
	type: string;
	payload: string | number;
}

const initialState: IState = {
	todos: []
};

const reducer = (state: IState, action: IAction) => {
	const _state = { ...state };
	switch (action.type) {
		case 'addTodo':
			if (typeof action.payload == 'string') {
				const todo = action.payload;
				_state.todos.push(todo);
			}
			break;
		case 'deleteTodo':
			if (typeof action.payload == 'number') {
				const index = action.payload;
				_state.todos.splice(index, 1);
			}
			break;
	}
	return _state;
}

function App() {
	const [state, dispatch] = useReducer(reducer, initialState);
	const [todo, setTodo] = useState('');

	return (
		<div>
			<h1>Reducer Todo List</h1>
			<input value={todo} onChange={(e) => setTodo(e.target.value)} />
			<div><button onClick={() => dispatch({ type: 'addTodo', payload: todo })}>Add Todo</button></div>
			<hr />
			<div>There are {state.todos.length} todos:</div>
			{state.todos.map((todo, index) => {
				return (
					<div key={index}>{todo} <button onClick={() => dispatch({ type: 'deleteTodo', payload: index })}>Delete</button></div>
				)
			})}
		</div>
	)
}

export default App
