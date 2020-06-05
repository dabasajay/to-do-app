import { todoType } from '../providers/application';

const allFieldsPresent = (todo : todoType) : boolean => {
  const sampleObject : todoType = {
    id: 0,
    status: false,
    text: ''
  };
  const sampleKeys : Array<string> = Object.keys(sampleObject).sort();
  const actualKeys : Array<string> = Object.keys(todo).sort();
  return JSON.stringify(sampleKeys) === JSON.stringify(actualKeys);
}

export const getTodosFromLocalStorage = () : todoType[] => {
  // Parse the stored object in local storage and return data
  let todosStringified : string | null = localStorage.getItem('todos');
  if(!todosStringified)
    todosStringified = '[]';
  const todosParsed : todoType[] = JSON.parse(todosStringified);
  // Make sure the if todoType type is changed, previous local storage
  // data is discarded.
  if(todosParsed.length > 0 && !allFieldsPresent(todosParsed[0]))
    return [];
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