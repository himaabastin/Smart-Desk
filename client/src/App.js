import { BrowserRouter as Router } from "react-router-dom";
import { DataProvider } from "./GlobalState";

import MainPages from "./components/mainpages/Pages";
import AdminSidebar from "./components/sidebar/AdminSidebar";

import Header from "./components/headers/Header";

function App() {
  return (
    <DataProvider>
      <Router>
        <div className="App">
          <Header />
          <MainPages />
          <AdminSidebar />
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
