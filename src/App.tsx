import React, { useEffect } from "react";

import { ApplicationContainer } from './providers/application';

import Dashboard from './views/dashboard/dashboard';
import LoadingSpinner from './views/spinner/spinner';

// Utility function to mock execution pause
export const sleep = (millisec: number) : Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, millisec));
}

export const App = () : JSX.Element => {

  const {
    state: applicationState,
    setApplicationLoadingStatus: setAppStatus,
    setApplicationLoaded,
    pushToDo,
    populateStateFromLocalStorage: populate,
    isStateEmpty
  } = ApplicationContainer.useContainer();

  // Once app is rendered initially, perform below stuff only once
  // Behaves like componentDidMount()
  useEffect(() => {
    const work = async () => {
      // Upon loading app, populate todos data from local storage
      populate();
      // Wait 3 second to let hooks update app state (if local data is found)
      await sleep(3000);
      // If it's still empty, fetch data from Chuck Norris jokes API
      if(isStateEmpty()){
        // Update loading status
        setAppStatus('Data not found. Loading some Chuck Norris jokes ;)');
        const initialTodos : string[] = [];
        const jokesCount = 3;
        for(let i = 1; i <= jokesCount; i++){
          try{
            const response = await fetch(
              "https://api.chucknorris.io/jokes/random?category=dev"
            );
            const result = await response.json();
            const { value } = result;
            initialTodos.push(value);
          }catch(err){
            console.log(err);
            // Update loading status
            setAppStatus('Error occurred! Please check your connection.');
            return;
          }
        }
        // Push todos to app state
        pushToDo(initialTodos);
        // Wait 3 second to let hooks update app state
        // Don't need this much time but spinner looks pretty cool ;)
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

// Provider wrapper for unstated-next to work
export const ProviderWrapper = (props : ProviderWrapperPropTypes) : JSX.Element => {
  return (
    <ApplicationContainer.Provider>
      {props.children}
    </ApplicationContainer.Provider>
  );
}