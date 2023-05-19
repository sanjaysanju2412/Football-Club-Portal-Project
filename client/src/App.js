import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Routes,Route} from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Landing } from './components/Landing/landing';
import { Signup } from './components/Signup/signup';
import { Login } from './components/Login/login';
import Format from './components/Format/format';
import { Team } from './components/Team/team';
import { Teamplayers } from './components/team players/team players';

function App() {
  return (
      <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={[<Landing/>]}/>
        <Route path='/signup' element={[<Signup/>]}/>
        <Route path='/login' element={[<Login/>]}/>
        <Route path='/format' element={[<Format/>]}/>
        <Route path='/team' element={[<Team/>]}/>
        <Route path='/team players' element={[<Teamplayers/>]}/>




        
      </Routes>
      </BrowserRouter>
      </>
  );
}

export default App;
