import { useState } from 'react';
import { createContainer } from 'unstated-next';
import { 
  getTodosFromLocalStorage,
  saveTodosInLocalStorage,
  isFoundInLocalStorage
}
from '../utilities/localStorageUtils';

export type todoType = {
  id: number,
  text: string
};

export type applicationStateType = {
  isLoaded: boolean,
  todos: todoType[]
};

const useApplicationHook = () : {
  state: applicationStateType,
  setApplicationLoaded: () => void,
  pushToDo: (todo : (string | string[])) => void,
  updateToDo: (todo: todoType) => void,
  popToDo: (id : number) => void,
  populateStateFromLocalStorage: () => void
  isStateEmpty: () => boolean
} => {

  const initialState : applicationStateType = {
    isLoaded: false,
    todos: []
  }

  const [state, setState] = useState(initialState);

  const setApplicationLoaded = () : void => {
    setState((prevState: applicationStateType) => {
      return {...prevState, isLoaded: true};
    });
  }

  const pushToDo = (newTodos : (string | string[])) : void => {

    if(!Array.isArray(newTodos)) // Make it array for code compatibility
     newTodos = [newTodos];

    const processedTodos : todoType[] = [];

    let baseID : number = new Date().getTime(); // Use timestamp as ID

    newTodos.forEach(item => {
      processedTodos.push({
        id: baseID,
        text: item
      });
      baseID++;
    });

    const updatedTodos : todoType[] = [...state.todos, ...processedTodos];

    // Update in local storage

    saveTodosInLocalStorage(updatedTodos);

    // Update in application state

    setState((prevState: applicationStateType) => {
      return {...prevState, todos: updatedTodos};
    });

  }

  const updateToDo = (todo: todoType) : void => {
  
    const foundTodo : (todoType | undefined) = state.todos.find(
      (item : todoType) => item.id === todo.id
    );
  
    if(foundTodo){

      foundTodo.text = todo.text; // Update the todo

      const updatedTodos : todoType[] = state.todos.map(
        (item : todoType) => item.id !== foundTodo.id ? item : foundTodo
      );

      // Update in local storage
  
      saveTodosInLocalStorage(updatedTodos);
  
      // Update in application state
 
      setState((prevState: applicationStateType) => {
        return {...prevState, todos: updatedTodos};
      });
    }
  }

  const popToDo = (id: number) : void => {
    const filteredTodos : todoType[] = state.todos.filter(
      (item : todoType) => item.id !== id
    );

    // Update in local storage

    saveTodosInLocalStorage(filteredTodos);

    // Update in application state
 
    setState((prevState: applicationStateType) => {
      return {...prevState, todos: filteredTodos};
    });
  }

  const populateStateFromLocalStorage = () : void => {
    const storedTodos : todoType[] = getTodosFromLocalStorage();
 
    setState((prevState: applicationStateType) => {
      return {...prevState, todos: storedTodos};
    });
  }

  const isStateEmpty = () : boolean => {
    return !isFoundInLocalStorage();
  }

  return {
    state,
    setApplicationLoaded,
    pushToDo,
    updateToDo,
    popToDo,
    populateStateFromLocalStorage,
    isStateEmpty
  };
}

export const ApplicationContainer = createContainer(useApplicationHook);