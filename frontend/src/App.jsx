import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/home"
import LogupForm from "./pages/regisration"
import LoginForm from "./pages/login"
import AdminDashboard from "./pages/dashboard/dash"
import Footer from "./components/footer"
function App() {
  return (
      <Router>
        <div className="App font-cairo">
         

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/registration" element={<LogupForm/>} />
            <Route path="/login" element={<LoginForm/>} />
            <Route path="/dash" element={<AdminDashboard/>} />



           
          </Routes>
          <Footer />
        </div>

      </Router>
  );
}

export default App;

