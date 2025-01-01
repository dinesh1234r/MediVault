import { BrowserRouter , Routes,Route } from 'react-router-dom';
import Login from './Pages/Login';
import Home from './Pages/Home';
import Patientlog from './Pages/Patientlog';
import NotFound from './Pages/NotFound';
import Patientlogin from './Pages/patientlogin'
import ReportsAdded from './Pages/ReportsAdded'

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/home' element={<Home/>} />
          <Route path='/patient-logged' element={<Patientlog/>} />
          <Route path='/patient-login' element={<Patientlogin/>} />
          <Route path='/patient-report' element={<ReportsAdded/>} />
          <Route path='/*' element={<NotFound/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
