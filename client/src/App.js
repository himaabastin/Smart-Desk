import { BrowserRouter as Router } from "react-router-dom";
import { DataProvider } from "./GlobalState";

import MainPages from "./components/mainpages/Pages";
import AdminSidebar from './components/sidebar/AdminSidebar'
import AdminHeader from "./components/headers/AdminHeader";


function App() {
   
  return (
    <DataProvider>
      <Router>
        <div className="App">
     
          <AdminHeader/>
          <MainPages/>
       <AdminSidebar/>
         
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
