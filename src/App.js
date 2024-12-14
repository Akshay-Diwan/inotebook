
import './App.css';
import NoteState from './Context/NoteState';
import NoteApp from './NoteApp';
import UserState from './Context/UserState';
import GettingStarted from './GettingStarted';
import Note from './component/Note/Note';
import{
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import SignUpFrom from './SignUpFrom';

function App() {
  return (
    <Router>
    <NoteState>
      <UserState>
    <>

     <Routes>
      <Route path='/' element={<GettingStarted/>}/>
      <Route path='/Notes' element={<NoteApp/>}>
      <Route path='/Notes/:id' element={<Note/>}/>
       </Route>
      
      <Route path='/SignUp' element={<SignUpFrom/>}/>
     </Routes>
      </>
      </UserState>
      </NoteState>
      </Router>
    
  );
}

export default App;
