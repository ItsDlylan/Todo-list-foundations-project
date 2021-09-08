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

		localStorage.setItem('todo', JSON.stringify(newTodos));
		setTodo(newTodos);
	};

	return (
		<div>
			<header>
				<div className='container home__container'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 1440 320'
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 1440 320'
						>
							<path
								fill='#2485D0'
								fill-opacity='1'
								d='M0,32L24,48C48,64,96,96,144,96C192,96,240,64,288,90.7C336,117,384,203,432,240C480,277,528,267,576,224C624,181,672,107,720,106.7C768,107,816,181,864,192C912,203,960,149,1008,149.3C1056,149,1104,203,1152,202.7C1200,203,1248,149,1296,128C1344,107,1392,117,1416,122.7L1440,128L1440,0L1416,0C1392,0,1344,0,1296,0C1248,0,1200,0,1152,0C1104,0,1056,0,1008,0C960,0,912,0,864,0C816,0,768,0,720,0C672,0,624,0,576,0C528,0,480,0,432,0C384,0,336,0,288,0C240,0,192,0,144,0C96,0,48,0,24,0L0,0Z'
							></path>
						</svg>
					</svg>
					<div className='ui middle aligned container '>
						<h1 className='header'>
							Pro-List The Only Todolist you'll need
						</h1>
					</div>
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
