import React from "react";

import { ApplicationContainer } from '../../providers/application';

import { TodoBox } from '../../components/todoBox/todoBox';

export const Editor = () : JSX.Element => {

  const {
    state: applicationState
  } = ApplicationContainer.useContainer();

  return (
    <div>
      {
        applicationState.todos.map((item) => {
          return <TodoBox
            key = {item.id}
            id = {item.id}
            text = {item.text}
            />
        })
      }
    </div>
  );
}