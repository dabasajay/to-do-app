import { todoType } from '../providers/application';

// Check if all the fields in the todo from local storage
// are same as the ones defined in code
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

// Parse the data from local storage and return todos array.
export const getTodosFromLocalStorage = () : todoType[] => {
  try{
    // Parse the stored object in local storage and return data
    let todosStringified : string | null = localStorage.getItem('todos');
    // If it's an empty string or null, change it to empty array
    if(!todosStringified)
      todosStringified = '[]';
    const todosParsed : todoType[] = JSON.parse(todosStringified);
    // Make sure the if todoType type is not same, local storage
    // data is discarded and it'll be saved again correctly through app.
    if(todosParsed.length > 0 && !allFieldsPresent(todosParsed[0]))
      return [];
    return todosParsed;
  }catch(err){
    console.log(err);
    return [];
  }
}

// Serialize the todo array into string and store in local storage.
export const saveTodosInLocalStorage = (todos : todoType[]) : void => {
  try{
    // Stringy the object and save to local storage
    const todosStringified = JSON.stringify(todos);
    localStorage.setItem('todos', todosStringified);
  }catch(err){
    console.log(err);
  }
}

// Check if non-empty todo array is present in local storage.
export const isFoundInLocalStorage = () : boolean => {
  try{
    const todosStringified : todoType[] = getTodosFromLocalStorage();
    return todosStringified.length > 0;
  }catch(err){
    console.log(err);
    return false;
  }
}