import { Route, Routes } from 'react-router-dom'
import Nav from './Nav'
import { Login_Route, SignUp_Route } from '../Routeslist/RouteList'
import Login from './Login'
import Signup from './SignUp'
import { HomePage_route } from '../Routeslist/RouteList'
import Home from './Home'

const Router = () => {
  return (
   <>
   <Nav/>
   <Routes>
   <Route path = {HomePage_route} element={<Home/>}/>
    <Route path = {Login_Route} element={<Login/>}/>
    <Route path = {SignUp_Route} element={<Signup/>}/>


    
   </Routes> 
   </>
  )
}

export default Router