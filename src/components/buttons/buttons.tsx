import React from 'react';
import './buttons.css';

export type ButtonPropTypes = {
	type: ('submit' | 'button'),
  text: string,
  icon?: string,
  className?: string,
  style?: object,
  onClick?: () => void
};

export const Button = (props: ButtonPropTypes) : JSX.Element => {
	return (
		<button
			type = {props.type}
			className = {`icon-btn ${props.className ? props.className : ''}`}
      onClick = {props.onClick}
			style = {props.style ? props.style : {}}
			data-test = 'component-button'
		>
      <span><i className = {props.icon ? props.icon + ' icon-btn-text' : ''}></i>{props.text}</span>
		</button>
	);
}