import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './Pages/Login'
import {Provider} from 'react-redux'
import store from './Redux/Store';
import Profile from './Pages/Profile'
import History from './Pages/History'
import Prescription from './Pages/Prescription'
import PatientVideoCall from './Pages/PatientVideoCall'

function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/history' element={<History/>}/>
            <Route path='/prescription' element={<Prescription/>}/>
            <Route path='/patient-videocall' element={<PatientVideoCall/>}/>
        </Routes>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
