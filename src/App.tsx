import React from "react";
import './App.css';

const App = (props: Object) : JSX.Element => {
  return (
    <div className = 'App' data-test = 'component-app'>
      <div>Add a Todo</div>
      <hr className = 'hline'/>
      <div style = {{textAlign: 'center'}}>
        <form>
          <textarea className = "form-textarea" placeholder = {'Let\'s do it...'} rows = {5}></textarea>
          <br/>
          <button type = "submit" className = "btn">Add</button>
        </form>
      </div>
      <div>Todos</div>
      <hr className = 'hline'/>
    </div>
  );
}

export default App;