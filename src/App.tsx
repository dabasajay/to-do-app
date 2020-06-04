import React, { useEffect } from "react";

import { ApplicationContainer } from './providers/application';

import Dashboard from './views/dashboard/dashboard';
import LoadingSpinner from './views/spinner/spinner';

export const App = () : JSX.Element => {

  const {
    state: applicationState,
    setApplicationLoaded,
    pushToDo,
    populateStateFromLocalStorage: populate,
    isStateEmpty
  } = ApplicationContainer.useContainer();

  const sleep = (millisec: number) : Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, millisec));
  }

  useEffect(() => {
    const work = async () => {
      // Upon loading app, populate todos data from local storage
      populate();
      // Wait 3 second to let hooks update app state (if found)
      await sleep(3000);
      // If it's still empty, fetch from Chuck Norris jokes API
      if(isStateEmpty()){
        const initialTodos : string[] = [];
        for(let i = 1; i <= 3; i++){
          const response = await fetch("https://api.chucknorris.io/jokes/random?category=dev");
          const result = await response.json();
          const { value } = result;
          initialTodos.push(value);
        }
        pushToDo(initialTodos);
        // Wait 3 second to let hooks update app state
        await sleep(3000);
      }
      // Load application
      setApplicationLoaded();
    }
    work();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    applicationState.isLoaded
    ?
    (
      <Dashboard/>
    )
    :
    (
      <LoadingSpinner/>
    )
  );
}

type ProviderWrapperPropTypes = {
  children: JSX.Element
};

export const ProviderWrapper = (props : ProviderWrapperPropTypes) : JSX.Element => {
  return (
    <ApplicationContainer.Provider>
      {props.children}
    </ApplicationContainer.Provider>
  );
}