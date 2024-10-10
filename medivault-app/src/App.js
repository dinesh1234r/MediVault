import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Intro from './Pages/Intro';
import NotFound from './Pages/NoFound';

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Intro/>}/>
            <Route path='/*' element={<NotFound/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
