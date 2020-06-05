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
  status: boolean, // true -> active, false -> marked complete
  text: string
};

export type applicationStateType = {
  isLoaded: boolean,
  loadingStatus: string,
  todos: todoType[]
};

const useApplicationHook = () : {
  state: applicationStateType,
  setApplicationLoaded: () => void,
  setApplicationLoadingStatus: (status: string) => void,
  pushToDo: (todo : (string | string[])) => void,
  updateToDo: (todo: todoType) => void,
  popToDo: (id : number) => void,
  switchStatus: (id : number) => void,
  populateStateFromLocalStorage: () => void
  isStateEmpty: () => boolean
} => {

  const initialState : applicationStateType = {
    isLoaded: false,
    loadingStatus: 'Loading data, please wait...',
    todos: []
  }

  const [state, setState] = useState(initialState);

  const sortTodos = (arr : todoType[]) : void => {
    arr.sort((a : todoType, b : todoType) : number => {
      if(a.status === b.status){
        return a.id - b.id; // Sort acc to id for same status
      }
      if(a.status)
        return -1; // Put a first
      else
        return 1; // Put b first
    })
  }

  const setApplicationLoaded = () : void => {
    setState((prevState: applicationStateType) => {
      return {...prevState, isLoaded: true, loadingStatus: ''};
    });
  }

  const setApplicationLoadingStatus = (status: string) : void => {
    setState((prevState: applicationStateType) => {
      return {...prevState, loadingStatus: status};
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
        status: true,
        text: item
      });
      baseID++;
    });

    const updatedTodos : todoType[] = [...state.todos, ...processedTodos];

    // Sort according to timestamp

    sortTodos(updatedTodos);

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

      // Replace the updated todo in the list

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

  const switchStatus = (id: number) : void => {
  
    const foundTodo : (todoType | undefined) = state.todos.find(
      (item : todoType) => item.id === id
    );
  
    if(foundTodo){

      foundTodo.status = !foundTodo.status; // toggle its status

      // Replace the updated todo in the list

      const updatedTodos : todoType[] = state.todos.map(
        (item : todoType) => item.id !== foundTodo.id ? item : foundTodo
      );

      // Sort according to timestamp
  
      sortTodos(updatedTodos);

      // Update in local storage
  
      saveTodosInLocalStorage(updatedTodos);
  
      // Update in application state
 
      setState((prevState: applicationStateType) => {
        return {...prevState, todos: updatedTodos};
      });
    }
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
    setApplicationLoadingStatus,
    setApplicationLoaded,
    pushToDo,
    updateToDo,
    popToDo,
    switchStatus,
    populateStateFromLocalStorage,
    isStateEmpty
  };
}

export const ApplicationContainer = createContainer(useApplicationHook);