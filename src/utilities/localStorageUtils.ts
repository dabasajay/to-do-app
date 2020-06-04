import { todoType } from '../providers/application';

export const getTodosFromLocalStorage = () : todoType[] => {
  // Parse the stored object in local storage and return data
  let todosStringified : string | null = localStorage.getItem('todos');
  if(!todosStringified)
    todosStringified = '[]';
  const todosParsed : todoType[] = JSON.parse(todosStringified);
  return todosParsed;
}

export const saveTodosInLocalStorage = (todos : todoType[]) : void => {
  // Stringy the object and save to local storage
  const todosStringified = JSON.stringify(todos);
  localStorage.setItem('todos', todosStringified);
}

export const isFoundInLocalStorage = () : boolean => {
  const todosStringified : todoType[] = getTodosFromLocalStorage();
  return todosStringified.length > 0;
}