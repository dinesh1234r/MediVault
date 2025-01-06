import Login from "./Pages/Login";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Dashboard from './Pages/Dashboard'
import AddHospitalForm from "./Pages/AddHospital";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/add-hospital" element={<AddHospitalForm/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
