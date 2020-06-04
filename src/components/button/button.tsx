import React from 'react';
import './button.css';

export type ButtonPropTypes = {
	type: ('submit' | 'button'),
	text: string
};

export const Button = (props: ButtonPropTypes) : JSX.Element => {
	return (
		<button
			type = {props.type}
			className = "btn"
		>
			{props.text}
		</button>
	);
}