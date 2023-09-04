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

interface IChangeEditing {
	index: number;
	text: string;
}

interface IAction {
	type: string;
	payload: number | string | ITodo | IChangeEditing;
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
				item.mode = 'editing';
			}
			break;
		case 'cancelEditing':
			if (typeof action.payload === 'number') {
				index = action.payload;
				const item = _state.todos[index];
				item.mode = 'normal';
			}
			break;
		case 'changeNewTodo':
			if (typeof action.payload === 'string') {
				const newTodoText = action.payload;
				_state.newTodoText = newTodoText;
			}
			break;
		case 'changeEditing':
			if (typeof action.payload === 'object') {
				const changeEditing: IChangeEditing = action.payload as IChangeEditing;
				const editedTodoText = action.payload.text;
				const index = changeEditing.index;
				const item = _state.todos[index];
				item.text = editedTodoText;
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
					<div key={index}>
						{todo.mode === 'editing' ? (
							<div><input value={todo.text} onChange={(e) => dispatch({ type: 'changeEditing', payload: { index, text: e.target.value } })} /> <button onClick={() => dispatch({ type: 'cancelEditing', payload: index })}>Cancel</button> <button onClick={() => dispatch({ type: 'saveEditing', payload: index })}>Save</button></div>
						) : (
							<div key={index}>{todo.text} <button onClick={() => dispatch({ type: 'deleteTodo', payload: index })}>Delete</button> <button onClick={() => dispatch({ type: 'editTodo', payload: index })}>Edit</button></div>
						)}
					</div>
				)
			})}
		</div>
	)
}

export default App
