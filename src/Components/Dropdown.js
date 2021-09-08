import React, { useState, useEffect, useRef } from 'react';
import './Dropdown.css';

const Dropdown = ({
	label,
	options,
	selected,
	onSelectedChange,
	nameOfClass,
}) => {
	const [open, setOpen] = useState(false);
	const ref = useRef();

	useEffect(() => {
		const onBodyClick = (event) => {
			if (ref.current.contains(event.target)) {
				return;
			}
			setOpen(false);
		};
		document.body.addEventListener('click', onBodyClick, { capture: true });

		return () => {
			document.body.removeEventListener('click', onBodyClick, {
				capture: true,
			});
		};
	}, []);

	let renderedOptions = options.map((option) => {
		if (option.value === selected.value) {
			return null;
		}

		return (
			<div
				onClick={() => onSelectedChange(option)}
				key={option.value}
				className='item'
			>
				{option.label}
			</div>
		);
	});

	return (
		<div className='ui form custom__dropdown' ref={ref}>
			<div className='field'>
				<label className='label'>{label}</label>
				<div
					onClick={() => setOpen(!open)}
					className={`ui selection dropdown ${nameOfClass} ${
						open ? 'visible active' : ''
					}`}
				>
					<i className='dropdown icon'></i>
					<div className='text'>{selected.label}</div>
					<div className={`menu ${open ? 'visible transition' : ''}`}>
						{renderedOptions}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dropdown;
