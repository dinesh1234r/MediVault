import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Login from './Pages/Login';
import Home from './Pages/Home';
import Patientlog from './Pages/Patientlog';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/patient-logged' element={<Patientlog/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
