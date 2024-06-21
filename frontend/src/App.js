import './App.css';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Signup from './Component/Signup';
import Login from './Component/Login';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
