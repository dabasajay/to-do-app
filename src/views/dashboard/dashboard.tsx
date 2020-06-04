import React from 'react';
import './dashboard.css';
import { HLine } from '../../components/hline/hline';

import { Writer } from '../writer/writer';
import { Editor } from '../editor/editor';

const Dashboard = () : JSX.Element => {
  return (
    <div className = 'Dashboard'>
      {/* Heading */}
      <div>
        Add a Todo
      </div>
      <HLine/>
      {/* Writer - Write and add a todo */}
      <Writer/>
      {/* Heading */}
      <div>
        Todos
      </div>
      <HLine/>
      {/* Editor - Read, edit, delete, mark as complete a todo */}
      <Editor/>
    </div>
  );
}

export default Dashboard;