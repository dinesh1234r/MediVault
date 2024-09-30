import Login from '../src/Pages/Login'
import Home from '../src/Pages/Home'
import Entry from './Pages/Entry';


import { BrowserRouter,Routes,Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/home' element={<Home/>} />
          <Route path='/entry' element={<Entry/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
