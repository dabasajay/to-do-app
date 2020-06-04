import React, { useState, useRef } from 'react';
import './todoBox.css';

import { ApplicationContainer, todoType } from '../../providers/application';

import { TextArea } from '../textArea/textArea';

type editSaveButtonPropTypes = {
  editMode: boolean,
  onClick: () => void
};

export const EditSaveButton = (props: editSaveButtonPropTypes) : JSX.Element => {
  return (
    <button
      className = 'icon-btn'
      onClick = {props.onClick}
      style = {{
        color: 'white',
        backgroundColor: '#BF9D7A',
        boxShadow: '#BF9D7A 0px 0px 0px 1px, #BF9D7A 0px 0px 5px',
        WebkitBoxShadow: '#BF9D7A 0px 0px 0px 1px, #BF9D7A 0px 0px 5px',
        MozBoxShadow: '#BF9D7A 0px 0px 0px 1px, #BF9D7A 0px 0px 5px'
      }}
    >
      {
        props.editMode
        ?
        <span><i className = 'far fa-save icon-btn-text'></i>Save</span>
        :
        <span><i className = 'far fa-edit icon-btn-text'></i>Edit</span>
      }
    </button>
  );
}

type completeButtonPropTypes = {
  onClick: () => void
};

export const CompleteButton = (props: completeButtonPropTypes) : JSX.Element => {
  return (
    <button
      className = 'icon-btn'
      onClick = {props.onClick}
      style = {{
        color: 'white',
        backgroundColor: '#80ADD7',
        boxShadow: '#80ADD7 0px 0px 0px 1px, #80ADD7 0px 0px 5px',
        WebkitBoxShadow: '#80ADD7 0px 0px 0px 1px, #80ADD7 0px 0px 5px',
        MozBoxShadow: '#80ADD7 0px 0px 0px 1px, #80ADD7 0px 0px 5px'
      }}
    >
      <span><i className = 'fas fa-check icon-btn-text'></i>Done</span>
    </button>
  );
}

export const TodoBox = (props: todoType) => {

  const {
    updateToDo,
    popToDo
  } = ApplicationContainer.useContainer();

  type stateType = {
    editMode: boolean,
    todo: todoType
  };

  const initialState : stateType = {
    editMode: false, // false -> view mode, true -> editing mode
    todo: {
      id: props.id,
      text: props.text
    }
  };

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const [state, setState] = useState(initialState);

  const switchMod = () => {
    // If edit mode is on, change focus to text area element for editing
    if(!state.editMode && textAreaRef && textAreaRef.current){
      textAreaRef.current.focus();
      if (typeof textAreaRef.current.selectionStart === "number")
        textAreaRef.current.selectionStart 
          = textAreaRef.current.selectionEnd 
          = textAreaRef.current.value.length;
    }
    // flip / switch mode
    setState({
      ...state,
      editMode: !state.editMode
    });
  }

  const saveTodo = () => {
    if(!state.todo.text || state.todo.text.length === 0)
      return;
    switchMod();
    updateToDo(state.todo);
  }

  const deleteTodo = () => {
    popToDo(state.todo.id);
  }

  const backgroundColor : string = state.editMode ? 'white' : '#4CAF50';

  return (
    <div className = 'to-do-box'>
      <div className = 'to-do-box-textarea'>
        <div>
          <TextArea
            style = {{
              color: state.editMode ? 'black' : 'white',
              width: '100%',
              padding: '10px',
              backgroundColor: backgroundColor,
              boxSizing: 'border-box',
              minHeight: '80px',
              boxShadow: `${backgroundColor} 0px 0px 0px 1px, ${backgroundColor} 0px 0px 5px`,
              WebkitBoxShadow: `${backgroundColor} 0px 0px 0px 1px, ${backgroundColor} 0px 0px 5px`,
              MozBoxShadow: `${backgroundColor} 0px 0px 0px 1px, ${backgroundColor} 0px 0px 5px`,
              cursor: state.editMode ? 'text' : 'auto'
            }}
            placeholder = {'Empty todo doesn\'t make any sense, does it?'}
            initialValue = {state.todo.text}
            readOnly = {!state.editMode} // readOnly textarea if viewing mode is on
            onChange = {(e: any) => {
              const updatedState = {...state};
              updatedState.todo.text = e.target.value;
              setState(updatedState);
            }}
            reference = {textAreaRef}
          />
        </div>
      </div>
      <div className = 'to-do-box-options'>
        <EditSaveButton
          editMode = {state.editMode}
          onClick = {state.editMode ? saveTodo : switchMod}
        />
        <CompleteButton
          onClick = {deleteTodo}
        />
      </div>
    </div>
  );
}