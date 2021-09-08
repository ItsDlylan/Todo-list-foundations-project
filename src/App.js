import React, { useState, useEffect } from 'react';
import Form from './Components/Form';
import './App.css';

function Todo({ todo, value, index, completeTodo, removeTodo }) {
	return (
		<div className='item'>
			<div className='content'>
				<h4
					className='header large'
					style={{
						display: 'inline-block',
						textDecoration: todo.isCompleted
							? 'line-through'
							: 'none',
						opacity: todo.isCompleted ? '50%' : '100%',
					}}
				>
					{todo.text}
				</h4>

				<div className='right floated'>
					<button
						className='ui tiny button positive'
						onClick={() => completeTodo(index)}
					>
						✓
					</button>
					<button
						className='ui tiny button grey'
						onClick={() => removeTodo(index)}
					>
						X
					</button>

					<div
						className={`ui tiny label priority_label ${
							todo.value === 'Immediate' ? 'red' : ''
						} ${todo.value === 'Whenever' ? 'blue' : ''}
						${todo.value === 'Important' ? 'yellow' : ''}`}
					>
						{todo.value}
					</div>
				</div>
			</div>
		</div>
	);
}

const App = () => {
	const [todos, setTodo] = useState([]);
	const [allTodos, setAllTodos] = useState(() => {
		const saved = localStorage.getItem('todo');
		const initialValue = JSON.parse(saved);
		return initialValue || '';
	});
	useEffect(() => {
		// storing todos.
		localStorage.setItem('todo', JSON.stringify(allTodos));
	}, [allTodos]);

	const addTodo = (text, value, id) => {
		const newTodos = [...todos, { text, value, id }];
		setAllTodos(newTodos);
		setTodo(newTodos);
	};

	const rerenderTodo = (priority) => {
		console.log(priority);
		let newTodos;
		if (priority === 'Important') {
			newTodos = allTodos.filter((e) => {
				return e.value === priority;
			});
			setTodo(newTodos);
		} else if (priority === 'Whenever') {
			newTodos = allTodos.filter((e) => {
				return e.value === priority;
			});
			setTodo(newTodos);
		} else if (priority === 'Immediate') {
			newTodos = allTodos.filter((e) => {
				return e.value === priority;
			});
			setTodo(newTodos);
		} else {
			newTodos = [...allTodos];
			setTodo(newTodos);
		}
	};

	const completeTodo = (index) => {
		const newTodos = [...todos];

		if (newTodos[index].isCompleted === true) {
			newTodos[index].isCompleted = false;
			setTodo(newTodos);
		} else {
			newTodos[index].isCompleted = true;
			setTodo(newTodos);
		}
	};

	const removeTodo = (index) => {
		const newTodos = [...todos];
		for (let i = index + 1; i < newTodos.length; i++) {
			if (newTodos[i] === undefined) {
				return;
			}
			newTodos[i].id -= 1;
		}
		localStorage.clear();
		newTodos.splice(index, 1);

		localStorage.setItem('todo', JSON.stringify(allTodos));
		setTodo(newTodos);
	};

	return (
		<div>
			<header>
				<div className='container home__container'>
					<svg
						className='wave'
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 1440 320'
					>
						<path
							fill='#2485D0'
							fill-opacity='1'
							d='M0,96L16,128C32,160,64,224,96,208C128,192,160,96,192,80C224,64,256,128,288,170.7C320,213,352,235,384,250.7C416,267,448,277,480,277.3C512,277,544,267,576,218.7C608,171,640,85,672,90.7C704,96,736,192,768,197.3C800,203,832,117,864,90.7C896,64,928,96,960,106.7C992,117,1024,107,1056,90.7C1088,75,1120,53,1152,85.3C1184,117,1216,203,1248,218.7C1280,235,1312,181,1344,165.3C1376,149,1408,171,1424,181.3L1440,192L1440,0L1424,0C1408,0,1376,0,1344,0C1312,0,1280,0,1248,0C1216,0,1184,0,1152,0C1120,0,1088,0,1056,0C1024,0,992,0,960,0C928,0,896,0,864,0C832,0,800,0,768,0C736,0,704,0,672,0C640,0,608,0,576,0C544,0,512,0,480,0C448,0,416,0,384,0C352,0,320,0,288,0C256,0,224,0,192,0C160,0,128,0,96,0C64,0,32,0,16,0L0,0Z'
						></path>
					</svg>

					<div className='ui middle aligned container '>
						<h1 className='header-primary'>
							Pro-List The Only Todolist you'll need
						</h1>
					</div>
					<h1 className='header-secondary'>Let me Show you!</h1>
				</div>
			</header>
			{/* 
					<p>
						The only List of Tasks you'll ever need!
						<br></br> Complete 5 tasks per day! You win the day.
						Complete that 7 days a week? You win the week. Complete
						them for 31 days? You win the month! <br></br>
						Congratulations you're a Winner.
					</p>
 			*/}
			<div className='container list__container'>
				<div className='ui middle aligned container form__container'>
					<Form
						addTodo={addTodo}
						rerenderTodo={rerenderTodo}
						id={todos.at(-1)}
					/>
				</div>

				<div className='ui raised padded container segment list-div'>
					<div className='ui middle aligned relaxed divided list list_inside'>
						{todos.map((todo, index) => (
							<Todo
								className='field'
								key={index}
								index={index}
								value={todo.value}
								todo={todo}
								completeTodo={completeTodo}
								removeTodo={removeTodo}
							/>
						))}
					</div>
				</div>
			</div>

			<footer className='footer'>
				<p className='paragraph-copyright'>
					Built by
					<a
						className='footer__link'
						href='https://www.linkedin.com/in/dylanschwindt/'
					>
						Dylan Schwindt
					</a>
					All rights reserved ©
				</p>
			</footer>
		</div>
		// 1. Header explaining why having a todo list is exceptional
		// 2. CTA to go to the todo list link
		// 3. redirect to /list, and display the list component
	);
};

export default App;
