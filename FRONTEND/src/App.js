
import Login from '../src/Pages/Login'
import Home from '../src/Pages/Home'
import NotFound from './Pages/NotFound';
import { BrowserRouter,Routes,Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/home' element={<Home/>} />
          <Route path='/*' element={<NotFound/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
