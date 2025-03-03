import React from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Main from "./components/Main/Main";
import './index.css'
import {DataProvider} from './context/DataContext'
function App() {
  
  return (
    <DataProvider>
    <div className="root">     
      <Sidebar />
      <Main />   
    </div>
    </DataProvider>
  );
}

export default App;
