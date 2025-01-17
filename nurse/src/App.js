import Login from '../src/Pages/Login'
import NotFound from './Pages/NotFound';
import PatientLogin from './Pages/PatientLogin'
import PatientEntry from './Pages/PatientEntry'
import PatientRegister from './Pages/PatientRegister'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import NurseProfile from './Pages/NurseProfile'

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/patient-login' element={<PatientLogin/>} />
          <Route path='/patient-entry' element={<PatientEntry/>} />
          <Route path='/patient-register' element={<PatientRegister/>} />
          <Route path='/nurse-profile' element={<NurseProfile/>} />
          <Route path='/*' element={<NotFound/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
