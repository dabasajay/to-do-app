import { renderHook, act } from '@testing-library/react-hooks';

import {
  useApplicationHook,
  todoType
} from './application';

const correctTodo : todoType = {
  id: 0,
  status: false,
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

describe('[useApplicationHook]', () => {
  it('should have initial state', async () => {
      const {
        result
      } = renderHook(() => useApplicationHook());
      expect(result.current.state.isLoaded).toBe(false);
      expect(result.current.state.todos.length).toBe(0);
  })
  it('should set app loaded on calling setApplicationLoaded', async () => {
      const {
        result
      } = renderHook(() => useApplicationHook());
      const {
        setApplicationLoaded
      } = result.current;
      act(() => setApplicationLoaded());
      expect(result.current.state.isLoaded).toBe(true);
  })
  it('should set app loading status on calling setApplicationLoadingStatus', async () => {
      const {
        result
      } = renderHook(() => useApplicationHook());
      const {
        setApplicationLoadingStatus
      } = result.current;
      act(() => setApplicationLoadingStatus('test'));
      expect(result.current.state.loadingStatus).toBe('test');
  })
  it('should push todo to state on calling pushToDo', async () => {
      const {
        result
      } = renderHook(() => useApplicationHook());
      const {
        pushToDo
      } = result.current;
      act(() => pushToDo('test'));
      expect(result.current.state.todos.length).toBe(1);
  })
  it('should update todo in state on calling updateToDo', async () => {
      const {
        result
      } = renderHook(() => useApplicationHook());
      const {
        pushToDo,
        updateToDo
      } = result.current;
      act(() => pushToDo('test'));
      expect(result.current.state.todos.length).toBe(1);
      const todo = result.current.state.todos[0];
      todo.text = 'test-update';
      act(() => updateToDo(todo));
      expect(result.current.state.todos.length).toBe(1);
      expect(result.current.state.todos[0].text).toBe('test-update');
  })
  it('should delete todo from state on calling popToDo', async () => {
      const {
        result
      } = renderHook(() => useApplicationHook());
      const {
        pushToDo,
        popToDo
      } = result.current;
      act(() => pushToDo('test'));
      expect(result.current.state.todos.length).toBe(1);
      const todoID = result.current.state.todos[0].id;
      act(() => popToDo(todoID));
      expect(result.current.state.todos.length).toBe(0);
  })
  it('should return correct state empty status on calling isStateEmpty', async () => {
      const {
        result
      } = renderHook(() => useApplicationHook());
      const {
        pushToDo,
        isStateEmpty
      } = result.current;
      returnNull = true; // return NO data from local storage
      expect(isStateEmpty()).toBe(true);
      act(() => pushToDo('test'));
      returnNull = false; // return data from local storage
      expect(isStateEmpty()).toBe(false);
  })
});