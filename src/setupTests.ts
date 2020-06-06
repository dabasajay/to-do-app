// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';

import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

// Configure Enzyme

Enzyme.configure({adapter: new EnzymeAdapter()});

// Setup mock local storage

let localStorageMock = (function(){
  let store : {
    [index: string]: string
  } = {};
  return {
    getItem: function(key : string){
      return store[key];
    },
    setItem: function(key : string, value : string){
      store[key] = value.toString();
    },
    clear: function() {
      store = {};
    },
    removeItem: function(key: string){
      delete store[key];
    }
  };
});

Object.defineProperty(window, 'localStorage', { value: localStorageMock() });