import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Login from './Pages/Login';
import Home from './Pages/Home';
import Patientlog from './Pages/Patientlog';
import NotFound from './Pages/NotFound';
import {Provider} from 'react-redux'
import store from './Redux/Store';

function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/patient-logged' element={<Patientlog/>}/>
          <Route path='/*' element={<NotFound/>}/>
        </Routes>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
