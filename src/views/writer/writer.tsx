import React, { useState, SyntheticEvent } from "react";

import { Button } from '../../components/buttons/buttons';
import { TextArea } from '../../components/textArea/textArea';

import { ApplicationContainer } from '../../providers/application';

// Writer component renders the form to take todo text input
// and let's you add an active todo

export const Writer = () : JSX.Element => {

  const {
    pushToDo
  } = ApplicationContainer.useContainer();

  // Controlled form

  const intialState : string = '';

  const [state, setState] = useState(intialState);
  
  // Handle form submission
  const handleOnSubmit = (event: SyntheticEvent) : void => {

    event.preventDefault();

    const todoText : string = state;

    // For empty input, just return
    if(!todoText || todoText.length === 0)
      return;

    // Reset textarea value
    setState('');

    // Push to application state
    pushToDo(todoText);
  }

  return (
    <div 
        style = {{
          textAlign: 'center'
        }}
      >
        <form onSubmit = {handleOnSubmit}>
          <TextArea
            style = {{
              width: '75%',
              padding: '10px',
              boxSizing: 'border-box'
            }}
            placeholder = {'Let\'s do it...'}
            rows = {5}
            onChange = {(e: any) => setState(e.target.value)}
            initialValue = {state}
          />
          <br/>
          <Button
            type = 'submit'
            text = 'Add'
            icon = 'fas fa-plus'
            style = {{
              color: 'white',
              display: 'inline-block',
              backgroundColor: '#DD7746',
              boxShadow: '#DD7746 0px 0px 0px 1px, #DD7746 0px 0px 5px',
              WebkitBoxShadow: '#DD7746 0px 0px 0px 1px, #DD7746 0px 0px 5px',
              MozBoxShadow: '#DD7746 0px 0px 0px 1px, #DD7746 0px 0px 5px'
            }}
          />
        </form>
      </div>
  );
}