import './App.css';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Signup from './Component/Signup';
import Login from './Component/Login';
import StudentDashboard from '../src/Component//Student/Frontpage'
import StudentComplaint from '../src/Component/Student/Complaint'
import ContactPage from './Component/Student/ContactPage';
import AccountantDashboard from '../src/Component/Accountant/Dashboard'
import ComplainStatus from '../src/Component/Student/Complainstatus'
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/studentmain" element={<StudentDashboard />}/>
          <Route path="/complain" element={<StudentComplaint/>}/>
          <Route path='/contact' element={<ContactPage/>}/>
          <Route path="/accountant" element={<AccountantDashboard/>}/>
          <Route path="/complainstatus" element={<ComplainStatus/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
