import './App.css';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Signup from './Component/Signup';
import Login from './Component/Login';
import StudentDashboard from '../src/Component//Student/Frontpage'
import StudentComplaint from '../src/Component/Student/Complaint'
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/studentmain" element={<StudentDashboard />}/>
          <Route path="/complain" element={<StudentComplaint/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
