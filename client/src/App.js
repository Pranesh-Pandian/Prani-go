import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Flights from "./pages/Flights";
import Admin from "./pages/Admin";
import Admindisp from "./pages/Admindisp";
import Addflight from "./pages/Addflight";
import './App.css';
import Booking from "./pages/Booking";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route element={<Login/>} path="/"></Route>
            <Route element={<Signup/>} path="/signup"></Route>
            <Route element={<Flights/>} path="/home"></Route>
            <Route element={<Admin/>} path="/admin"></Route>
            <Route element={<Admindisp/>} path="/adisp"></Route>
            <Route element={<Addflight/>} path="/add"></Route>
            <Route element={<Booking/>} path="/book/:id"></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;