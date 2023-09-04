import { useReducer } from 'react';
import { BsTrash3Fill } from 'react-icons/bs';
import { BsPencilFill } from 'react-icons/bs';
import { GiCancel } from 'react-icons/gi';
import { BiSolidSave } from 'react-icons/bi';

import './App.scss';

interface ITodo {
	text: string;
	mode: string;
	originalEditText: string;
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
					mode: 'normal',
					originalEditText: ''
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
				item.originalEditText = item.text;
			}
			break;
		case 'cancelEditing':
			if (typeof action.payload === 'number') {
				index = action.payload;
				const item = _state.todos[index];
				item.mode = 'normal';
				item.text = item.originalEditText;
				item.originalEditText = '';
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
		case 'saveEditing':
			if (typeof action.payload === 'number') {
				index = action.payload;
				const item = _state.todos[index];
				item.mode = 'normal';
				item.originalEditText = '';
			}
			break;
	}
	return _state;
}

function App() {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<div>
			<h1 className="text-4xl mb-5">Reducer Todo List</h1>
			<div className="flex gap-2 mb-5">
				<input className="text-3xl rounded text-orange-950" value={state.newTodoText} onChange={(e) => dispatch({ type: 'changeNewTodo', payload: e.target.value })} />{' '}
				<button className="bg-slate-800 text-slate-400 p-2 rounded" onClick={() => dispatch({ type: 'addTodo', payload: state.newTodoText })}>Add Todo</button>
			</div>
			<h2 className="text-2xl mb-2">Number of todos: {state.todos.length}</h2>
			<ul className="list-disc ml-4">
			{state.todos.map((todo, index) => {
				return (
					<li key={index}>
						{todo.mode === 'editing' ? (
							<div className="flex gap-2 text-xl"><input value={todo.text} onChange={(e) => dispatch({ type: 'changeEditing', payload: { index, text: e.target.value } })} /> <BiSolidSave className="cursor-pointer text-lg mt-[.25rem]" onClick={() => dispatch({ type: 'saveEditing', payload: index })}/><GiCancel className="cursor-pointer text-base mt-[.3rem]" onClick={() => dispatch({ type: 'cancelEditing', payload: index })}/> </div>
						) : (
							<div className="flex gap-2 text-xl"><span className="text-orange-950">{todo.text}</span> <BsPencilFill className="cursor-pointer text-sm mt-[.4rem]" onClick={() => dispatch({ type: 'editTodo', payload: index })}/><BsTrash3Fill className="cursor-pointer text-sm mt-[.4rem]" onClick={() => dispatch({ type: 'deleteTodo', payload: index })}/> </div>
						)}
					</li>
				)
			})}
			</ul>
		</div>
	)
}

export default App
