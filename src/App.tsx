import { useReducer, useState } from 'react';
import './App.scss';

interface IState {
	todos: string[];
	newTodo: string;
}

interface IAction {
	type: string;
	payload: string | number;
}

const initialState: IState = {
	todos: [],
	newTodo: ''
};

const reducer = (state: IState, action: IAction) => {
	const _state = { ...state };
	switch (action.type) {
		case 'addTodo':
			if (typeof action.payload == 'string') {
				const todo = action.payload;
				_state.todos.push(todo);
				_state.newTodo = '';
			}
			break;
		case 'deleteTodo':
			if (typeof action.payload == 'number') {
				const index = action.payload;
				_state.todos.splice(index, 1);
			}
			break;
		case 'changeNewTodo':
			if (typeof action.payload == 'string') {
				const changedTodo = action.payload;
				_state.newTodo = changedTodo;
			}
			break;
	}
	return _state;
}

function App() {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<div>
			<h1>Reducer Todo List</h1>
			<input value={state.newTodo} onChange={(e) => dispatch({ type: 'changeNewTodo', payload: e.target.value })} />
			<div><button onClick={() => dispatch({ type: 'addTodo', payload: state.newTodo })}>Add Todo</button></div>
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
