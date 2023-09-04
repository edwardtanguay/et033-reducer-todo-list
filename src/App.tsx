import { useReducer, useState } from 'react';
import './App.scss';

interface ITodo {
	text: string;
	mode: string;
}

interface IState {
	todos: ITodo[];
	newTodoText: string;
}

interface IPayload {
	index: number;
	todo: ITodo;
	newTodoText: string;
}

interface IAction {
	type: string;
	payload: number | string | ITodo;
}

const initialState: IState = {
	todos: [],
	newTodoText: ''
};

const reducer = (state: IState, action: IAction) => {
	const _state = { ...state };
	let index = 0;
	switch (action.type) {
		case 'addTodo':
			if (typeof action.payload === 'string') {
				const newTodoText = action.payload;
				const todo: ITodo = {
					text: newTodoText,
					mode: 'normal'
				}
				_state.todos.push(todo);
				_state.newTodoText = '';
			}
			break;
		case 'deleteTodo':
			if (typeof action.payload === 'number') {
				index = action.payload;
				_state.todos.splice(index, 1);
			}
			break;
		case 'editTodo':
			if (typeof action.payload === 'number') {
				index = action.payload;
				const item = _state.todos[index];
				console.log(`we are editing the item: ${item.text}`);
			}
			break;
		case 'changeNewTodo':
			if (typeof action.payload === 'string') {
				const newTodoText = action.payload;
				_state.newTodoText = newTodoText;
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
			<input value={state.newTodoText} onChange={(e) => dispatch({ type: 'changeNewTodo', payload: e.target.value })} />{' '}
			<button onClick={() => dispatch({ type: 'addTodo', payload: state.newTodoText })}>Add Todo</button>
			<hr />
			<div>There are {state.todos.length} todos:</div>
			{state.todos.map((todo, index) => {
				return (
					<div key={index}>{todo.text} <button onClick={() => dispatch({ type: 'deleteTodo', payload: index })}>Delete</button> <button onClick={() => dispatch({ type: 'editTodo', payload: index })}>Edit</button></div>
				)
			})}
		</div>
	)
}

export default App
