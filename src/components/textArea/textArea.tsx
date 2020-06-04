import React from 'react';
import './textArea.css';

export type TextAreaPropTypes = {
	placeholder?: string,
	rows?: number,
	onChange?: (event: any) => void,
	readOnly?: boolean,
	className?: string,
	style?: object,
	initialValue?: string,
	reference?: any
};

export const TextArea = (props: TextAreaPropTypes) : JSX.Element => {
	return (
    <textarea
			className = {`form-textarea ${props.className ? props.className : ''}`}
			style = {props.style ? props.style : {}}
			placeholder = {props.placeholder ? props.placeholder : ''}
			rows = {props.rows ? props.rows : 3}
			onChange = {props.onChange}
			readOnly = {props.readOnly ? props.readOnly : false}
			value = {props.initialValue ? props.initialValue : undefined}
			ref = {props.reference ? props.reference : null}
		>
    </textarea>
	);
}