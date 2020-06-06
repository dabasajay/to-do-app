import { useState } from 'react';
import { createContainer } from 'unstated-next';
import { 
  getTodosFromLocalStorage,
  saveTodosInLocalStorage,
  isFoundInLocalStorage
}
from '../utilities/localStorageUtils';

export type todoType = {
  id: number, // unique timestamp ID for each todo (can be from database also)
  status: boolean, // true -> active todo, false -> completed todo
  text: string // todo text
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

  // Sort todos according to increasing timestamp (date of creation)
  // Active todos are placed before completed todos in the sorted array
  const sortTodos = (arr : todoType[]) : void => {
    arr.sort((a : todoType, b : todoType) : number => {
      if(a.status === b.status){
        return a.id - b.id; // Sort acc to id for same status
      }
      if(a.status) // a is active
        return -1; // Put a first
      else
        return 1; // Put b first
    })
  }

  // Set the application status to loaded.
  const setApplicationLoaded = () : void => {
    setState((prevState: applicationStateType) => {
      return {...prevState, isLoaded: true, loadingStatus: ''};
    });
  }

  // Set the application status text to show around spinner
  const setApplicationLoadingStatus = (status: string) : void => {
    setState((prevState: applicationStateType) => {
      return {...prevState, loadingStatus: status};
    });
  }

  // Add a todo
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

  // Update a todo text
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

  // Delete a todo
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

  // Change a todo's status
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

  // Populate the state with data from local storage
  const populateStateFromLocalStorage = () : void => {
    const storedTodos : todoType[] = getTodosFromLocalStorage();
 
    setState((prevState: applicationStateType) => {
      return {...prevState, todos: storedTodos};
    });
  }

  // Check if the todo array is empty
  const isStateEmpty = () : boolean => {
    // Check in local storage
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