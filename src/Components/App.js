import React from 'react';
import List from './List';

const App = () => {
	return (
		<div className='ui container'>
			<List />
		</div>
		// 1. Header explaining why having a todo list is exceptional
		// 2. CTA to go to the todo list link
		// 3. redirect to /list, and display the list component
	);
};

export default App;
