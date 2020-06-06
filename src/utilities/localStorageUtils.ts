import { todoType } from '../providers/application';

export const allFieldsPresent = (todo : todoType) : boolean => {
  try{
    const sampleTodo : todoType = {
      id: 0,
      status: false,
      text: ''
    };
    const sampleKeys : Array<string> = Object.keys(sampleTodo).sort();
    const actualKeys : Array<string> = Object.keys(todo).sort();
    return JSON.stringify(sampleKeys) === JSON.stringify(actualKeys);
  }catch(err){
    console.log(err);
    return false;
  }
}

export const getTodosFromLocalStorage = () : todoType[] => {
  try{
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
  }catch(err){
    console.log(err);
    return [];
  }
}

export const saveTodosInLocalStorage = (todos : todoType[]) : void => {
  try{
    // Stringy the object and save to local storage
    const todosStringified = JSON.stringify(todos);
    localStorage.setItem('todos', todosStringified);
  }catch(err){
    console.log(err);
  }
}

export const isFoundInLocalStorage = () : boolean => {
  try{
    const todosStringified : todoType[] = getTodosFromLocalStorage();
    return todosStringified.length > 0;
  }catch(err){
    console.log(err);
    return false;
  }
}