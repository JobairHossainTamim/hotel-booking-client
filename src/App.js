import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar/Navbar';
import HomeScreen from './Pages/HomeScreen/HomeScreen';
import BookingScreen from './Pages/Booking/BookingScreen';
import Login from './Pages/Login/Login';
import Registration from './Pages/Registration/Registration';
import 'antd/dist/antd.min.css';
import Profile from './Pages/Profile/Profile';
import Admin from './Pages/Admin/Admin';
import LandingPage from './Pages/LandingPage/LandingPage';




function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Navbar />
        <Routes>
        <Route exact path='/' element={<LandingPage/>} />
        <Route exact path='/home' element={<HomeScreen/>} />
        <Route exact path='/login' element={<Login/>} />
        <Route exact path='/register' element={<Registration/>} />
        <Route exact path='/profile' element={<Profile/>} />
        <Route exact path='/booked' element={<Profile/>} />
        <Route exact path='/admin' element={<Admin/>} />
        <Route exact path='/booking/:roomId/:fromDate/:toDate' element={<BookingScreen/>} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
