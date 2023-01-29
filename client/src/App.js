import { BrowserRouter as Router } from "react-router-dom";
import { DataProvider } from "./GlobalState";
import AdminHeader from "./components/headers/AdminHeader";
import MainPages from "./components/mainpages/Pages";


function App() {
  return (
    <DataProvider>
      <Router>
        <div className="App">
          <AdminHeader/>
          <MainPages/>
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
