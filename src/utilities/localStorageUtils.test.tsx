import {
  allFieldsPresent,
  getTodosFromLocalStorage,
  saveTodosInLocalStorage,
  isFoundInLocalStorage
} from './localStorageUtils';

import { todoType } from '../providers/application';

const correctTodo : todoType = {
  id: 0,
  status: false,
  text: ''
};

const incorrectTodo : object = {
  id: 0,
  text: ''
};

const correctTodoArray : todoType[] = [correctTodo];

// Mock local storage functions

let returnNull : boolean = false;

global.localStorage.getItem = (key : string) : string | null => {
  return returnNull ? null : JSON.stringify(correctTodoArray);
}

global.localStorage.setItem = (key : string, value : string) : void => {
  return;
}

// Tests

test('[allFieldsPresent] should return true for correct todoType', () => {
  const result : boolean = allFieldsPresent(JSON.parse(JSON.stringify(incorrectTodo)));
  expect(result).toBe(false);
})

test('[allFieldsPresent] should return false for incorrect todoType', () => {
  const result : boolean = allFieldsPresent(correctTodo);
  expect(result).toBe(true);
})

test('[getTodosFromLocalStorage] should return empty array for zero todos', () => {
  returnNull = true;
  const result : todoType[] = getTodosFromLocalStorage();
  returnNull = false;
  expect(result.length).toBe(0);
})

test('[getTodosFromLocalStorage] should return non-empty array for non-zero todos', () => {
  const result : todoType[] = getTodosFromLocalStorage();
  expect(result.length).toBeGreaterThan(0);
})

test('[saveTodosInLocalStorage] should execute without errors with empty todos array', () => {
  saveTodosInLocalStorage([]);
})

test('[saveTodosInLocalStorage] should execute without errors with non-empty todos array', () => {
  saveTodosInLocalStorage(correctTodoArray);
})

test('[isFoundInLocalStorage] should return false for empty todos array', () => {
  returnNull = true;
  const result : boolean = isFoundInLocalStorage();
  returnNull = false;
  expect(result).toBe(false);
})

test('[isFoundInLocalStorage] should return true for non-empty todos array', () => {
  const result : boolean = isFoundInLocalStorage();
  expect(result).toBe(true);
})