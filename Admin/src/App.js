
import Login from '../src/Pages/Login'
import NotFound from './Pages/NotFound';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import AdminDashboard from './Pages/Dashboard';
import Doctors from './Pages/Doctors';
import Nurses from './Pages/Nurses';
import Scancenter from './Pages/Scancenters'
import CreateDoctor from './Pages/CreateDoctor';
import CreateNurse from './Pages/CreateNurse'
import CreateScancenter from './Pages/CreateScancenter'
import Settings from './Pages/Settings'

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/dashboard' element={<AdminDashboard/>} />
          <Route path='/doctors' element={<Doctors/>} />
          <Route path='/nurses' element={<Nurses/>} />
          <Route path='/scancenter' element={<Scancenter/>} />
          <Route path='/create-doctor' element={<CreateDoctor/>} />
          <Route path='/create-nurse' element={<CreateNurse/>} />
          <Route path='/create-scancenter' element={<CreateScancenter/>} />
          <Route path='/settings' element={<Settings/>} />
          <Route path='/*' element={<NotFound/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
