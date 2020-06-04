import React, { useState, SyntheticEvent } from "react";

import { Button } from '../../components/button/button';
import { TextArea } from '../../components/textArea/textArea';

import { ApplicationContainer } from '../../providers/application';

export const Writer = () : JSX.Element => {

  // Main application state to push todos

  const {
    pushToDo
  } = ApplicationContainer.useContainer();

  // Controlled form

  const intialState : string = '';

  const [state, setState] = useState(intialState);
  
  const handleOnSubmit = (event: SyntheticEvent) : void => {

    event.preventDefault();

    const todoText : string = state;

    if(!todoText || todoText.length === 0)
      return;

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
          />
        </form>
      </div>
  );
}