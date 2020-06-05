import React from "react";

import { ApplicationContainer, todoType } from '../../providers/application';

import { TodoBox } from '../todoBox/todoBox';

export const Viewer = () : JSX.Element => {

  const {
    state: applicationState
  } = ApplicationContainer.useContainer();

  return (
    <div>
      {
        applicationState.todos.map((item : todoType) : JSX.Element | null => {
          if(item.status === false)
            return <TodoBox
              key = {item.id}
              id = {item.id}
              status = {item.status}
              text = {item.text}
              />
          return null;
        })
      }
    </div>
  );
}