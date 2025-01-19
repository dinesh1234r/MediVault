import { BrowserRouter , Routes,Route } from 'react-router-dom';
import Login from './Pages/Login';
import NotFound from './Pages/NotFound';
import Patientlogin from './Pages/PatientLogin'
import ReportsAdded from './Pages/ReportsAdded'
import ScanCenterProfile from './Pages/ScancenterProfile';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/patient-login' element={<Patientlogin/>} />
          <Route path='/patient-report' element={<ReportsAdded/>} />
          <Route path='/scancenter-profile' element={<ScanCenterProfile/>} />
          <Route path='/*' element={<NotFound/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
