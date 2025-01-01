import Login from '../src/Pages/Login'
import Home from '../src/Pages/Home'
import Entry from './Pages/Entry';
import NotFound from './Pages/NotFound';
import PatientLogin from './Pages/PatientLogin'
import PatientEntry from './Pages/PatientEntry'
import PatientRegister from './Pages/PatientRegister'
import { BrowserRouter,Routes,Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/home' element={<Home/>} />
          <Route path='/entry' element={<Entry/>} />
          <Route path='/patient-login' element={<PatientLogin/>} />
          <Route path='/patient-entry' element={<PatientEntry/>} />
          <Route path='/patient-register' element={<PatientRegister/>} />
          <Route path='/*' element={<NotFound/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
