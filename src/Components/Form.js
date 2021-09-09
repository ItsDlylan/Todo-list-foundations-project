import React, { useState, useEffect } from 'react';

import Dropdown from './Dropdown';
import './Form.css';

// Drop Down Data
const options = [
	{
		label: 'Important',
		value: 'important',
	},
	{
		label: 'Immediate',
		value: 'immediate',
	},
	{
		label: 'Whenever',
		value: 'not_important',
	},
];

const sortedOptions = [
	{
		label: 'All',
		value: 'All',
	},
	{
		label: 'Important',
		value: 'important',
	},
	{
		label: 'Immediate',
		value: 'immediate',
	},
	{
		label: 'Whenever',
		value: 'not_important',
	},
];

const List = ({ addTodo, rerenderTodo, id }) => {
	const [selected, setSelected] = useState(options[0]);
	const [sortSelected, setSortedSelected] = useState(sortedOptions[0]);
	const [value, setValue] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!value) return;
		if (id === undefined) {
			id = 0;
		}
		addTodo(value, selected.label, id.id + 1);
		setValue('');
	};

	useEffect(() => {
		const timerId = setTimeout(() => {
			setSortedSelected(sortSelected);
			rerenderTodo(sortSelected.label);
		}, 1000);

		return () => {
			clearTimeout(timerId);
		};
	}, [rerenderTodo, sortSelected]);

	return (
		<form
			className='ui form align middle todo_form'
			onSubmit={handleSubmit}
		>
			<div className='equal width fields'>
				<div className='field '>
					<label className='label'>Enter a task</label>
					<input
						className='input__field'
						type='text'
						value={value}
						onChange={(e) => setValue(e.target.value)}
						placeholder='Enter a task...'
					/>
				</div>

				<Dropdown
					nameOfClass='priority__dropdown'
					label='Set a Priority'
					options={options}
					selected={selected}
					onSelectedChange={setSelected}
				/>

				<Dropdown
					nameOfClass='sort__dropdown'
					label='Sort by'
					options={sortedOptions}
					selected={sortSelected}
					onSelectedChange={setSortedSelected}
				/>
			</div>
		</form>
	);
};

export default List;
