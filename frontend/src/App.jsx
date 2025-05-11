// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home/home"
// import LogupForm from "./pages/regisration"
// import LoginForm from "./pages/login"
// import AdminDashboard from "./pages/dashboard/dash"
// import Footer from "./components/footer"
// import AddAddBookForm from './pages/dashboard/formbook';
// import Navbar from './components/nav';

// function App() {
//   return (
//       <Router>
//         <div className="App font-cairo">
         

//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/registration" element={<LogupForm/>} />
//             <Route path="/login" element={<LoginForm/>} />
//             <Route path="/dash" element={<AdminDashboard/>} />
//             <Route path="/formbook" element={<AddAddBookForm/>} />




           
//           </Routes>
//           <Footer />
//         </div>

//       </Router>
//   );
// }

// export default App;


import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from "react-router-dom";

import Home from "./pages/Home/home";
import LogupForm from "./pages/regisration";
import LoginForm from "./pages/login";
import AdminDashboard from "./pages/dashboard/dash";
import Footer from "./components/footer";
import AddAddBookForm from './pages/dashboard/formbook';
import Navbar from './components/nav';
import Details from './pages/detailspage'
import BookInterface from './pages/singlepage'

function AppContent() {
  const location = useLocation();
  const hideNavbar = location.pathname === '/';
  

  return (
    <div className="App font-cairo">
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration" element={<LogupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/dash" element={<AdminDashboard />} />
        <Route path="/formbook" element={<AddAddBookForm />} />
        <Route path="/details" element={<Details/>} />
        <Route path="/books/:id" element={<BookInterface/>} />



      </Routes>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;


