import { Route, Routes } from 'react-router-dom'

import { HOME_ROUTE, LOGIN_ROUTE, RATED_ROUTE, SIGNUP_ROUTE, WATCHED_ROUTE } from '../Routeslist/RouteList'
import Nav from './Nav'
import Login from './Login'
import Signup from './SignUp'
import Home from './Home'
import Watchedmovies from './Watchedmovies'
import Rratedmovies from './Rratedmovies'




const Router = () => {

  return (
   <>
   <Nav/>
   <Routes>
   <Route path = {HOME_ROUTE} element={<Home/>}/>
    <Route path = {LOGIN_ROUTE} element={<Login/>}/>
    <Route path = {SIGNUP_ROUTE} element={<Signup/>}/>
    <Route path = {WATCHED_ROUTE} element={<Watchedmovies/>}/>
    <Route path = {RATED_ROUTE} element={<Rratedmovies/>}/>



    
   </Routes> 
   </>
  )
}

export default Router