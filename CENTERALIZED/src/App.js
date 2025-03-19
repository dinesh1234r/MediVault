import Login from "./Pages/Login";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Dashboard from './Pages/Dashboard'
import AddHospitalForm from "./Pages/AddHospital";
import NotFound from "./Pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/add-hospital" element={<AddHospitalForm/>}/>
        <Route path="/*" element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
