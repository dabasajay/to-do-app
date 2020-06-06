import React, { useState, useRef } from 'react';
import './todoBox.css';

import { ApplicationContainer, todoType } from '../../providers/application';

import { Button } from '../../components/buttons/buttons';
import { TextArea } from '../../components/textArea/textArea';

export const TodoBox = (props: todoType) : JSX.Element => {

  const {
    updateToDo,
    popToDo,
    switchStatus
  } = ApplicationContainer.useContainer();

  // State of a todo box
  type stateType = {
    editMode: boolean, // true --> edit mode (writable textarea), false --> view mode
    todo: todoType // the actual todo with its unique id, status, text, etc.
  };

  const initialState : stateType = {
    editMode: false,
    todo: {
      id: props.id,
      status: props.status,
      text: props.text
    }
  };

  const [state, setState] = useState(initialState);

  // A reference to textarea box.
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  // Switch the mode (view/edit) of textarea
  const switchMod = () => {
    // If edit mode is on, change focus to text area element for editing
    if(!state.editMode && textAreaRef && textAreaRef.current){
      textAreaRef.current.focus();
      // Bring cursor to end of text
      if (typeof textAreaRef.current.selectionStart === "number")
        textAreaRef.current.selectionStart 
          = textAreaRef.current.selectionEnd 
          = textAreaRef.current.value.length;
    }
    // toggle / switch mode
    setState((prevState) => {
      return {...prevState, editMode: !prevState.editMode};
    });
  }

  // Switch edit mode to view mode and save the changes
  const saveTodo = () => {
    // For empty text, just return
    if(!state.todo.text || state.todo.text.length === 0)
      return;
    switchMod();
    updateToDo(state.todo);
  }

  const switchTodoStatus = () => {
    switchStatus(state.todo.id);
  }

  const deleteTodo = () => {
    popToDo(state.todo.id);
  }

  let backgroundColor : string = ''

  if(state.todo.status){ // active todo
    backgroundColor = state.editMode ? 'white' : '#005C42';
  }else{ // completed todo 
    backgroundColor = '#9EC97E';
  }

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
              minHeight: '100px',
              boxShadow: `${backgroundColor} 0px 0px 0px 1px, ${backgroundColor} 0px 0px 5px`,
              WebkitBoxShadow: `${backgroundColor} 0px 0px 0px 1px, ${backgroundColor} 0px 0px 5px`,
              MozBoxShadow: `${backgroundColor} 0px 0px 0px 1px, ${backgroundColor} 0px 0px 5px`,
              cursor: state.editMode ? 'text' : 'auto'
            }}
            placeholder = {'Empty to-do doesn\'t make any sense, does it?'}
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
        {
          state.todo.status // render edit/save button only for active todo
          ?
          <Button
            type = 'button'
            text = {state.editMode ? 'Save' : 'Edit'}
            icon = {state.editMode ? 'far fa-save' : 'far fa-edit'}
            onClick = {state.editMode ? saveTodo : switchMod}
            style = {{
              color: 'white',
              backgroundColor: '#DD7746',
              boxShadow: '#DD7746 0px 0px 0px 1px, #DD7746 0px 0px 5px',
              WebkitBoxShadow: '#DD7746 0px 0px 0px 1px, #DD7746 0px 0px 5px',
              MozBoxShadow: '#DD7746 0px 0px 0px 1px, #DD7746 0px 0px 5px'
            }}
          />
          :
          null
        }
        <Button
          type = 'button'
          text = {state.todo.status ? 'Mark' : 'Unmark'}
          icon = {state.todo.status ? 'fas fa-check' : 'fas fa-times'}
          onClick = {switchTodoStatus}
          style = {{
            color: 'white',
            backgroundColor: '#44344E',
            boxShadow: '#44344E 0px 0px 0px 1px, #44344E 0px 0px 5px',
            WebkitBoxShadow: '#44344E 0px 0px 0px 1px, #44344E 0px 0px 5px',
            MozBoxShadow: '#44344E 0px 0px 0px 1px, #44344E 0px 0px 5px'
          }}
        />
        <Button
          type = 'button'
          text = 'Remove'
          icon = {'far fa-trash-alt'}
          onClick = {deleteTodo}
          style = {{
            color: 'white',
            backgroundColor: '#821517',
            boxShadow: '#821517 0px 0px 0px 1px, #821517 0px 0px 5px',
            WebkitBoxShadow: '#821517 0px 0px 0px 1px, #821517 0px 0px 5px',
            MozBoxShadow: '#821517 0px 0px 0px 1px, #821517 0px 0px 5px'
          }}
        />
      </div>
    </div>
  );
}