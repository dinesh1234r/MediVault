import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Login from './Pages/Login';
import NotFound from './Pages/NotFound';
import {Provider} from 'react-redux'
import store from './Redux/Store';
import PatientLogin from './Pages/PatientLogin'
import PatientHis from './Pages/PatientHistory'
import Bar from './Pages/Bar'
import DoctorProfile from './Pages/DoctorProfile';

function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/patient-login' element={<PatientLogin/>}/>
          <Route path='/patient-history' element={<PatientHis/>}/>
          <Route path='/bar' element={<Bar/>}/>
          <Route path='/doctor-profile' element={<DoctorProfile/>}/>
          <Route path='/*' element={<NotFound/>}/>
        </Routes>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
