
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './components/layout/Layout'
import GetStart from './components/getStart/GetStart'
import SignupPage from './components/signUp/SignupPage'
import axios from 'axios'
import UserContexProvider from './components/context/UserContexProvider'
import Weather from './components/weather/Weather'
import WeatherContextProvider from './components/context/WeatherContextProvider'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import MyLocation from './components/myLocation/MyLocation'
axios.defaults.baseURL = 'http://localhost:8080'  //'https://fullstack-weather-app.onrender.com';  
axios.defaults.withCredentials = true;  //Automatically include cookies in requests
function App() {

  return (

    <UserContexProvider>
      <WeatherContextProvider>
        <Routes>
          <Route path='/' element={<Layout />} >
            <Route index element={<GetStart />} />
            <Route path='/signup' element={<SignupPage />} />
            <Route path='/weather' element={<PrivateRoute><Weather /></PrivateRoute>} />
            <Route path='/weather/my-location' element={<PrivateRoute><MyLocation /></PrivateRoute>} />
          </Route>
        </Routes>
      </WeatherContextProvider>
    </UserContexProvider>
  )
}

export default App
