import { Route, Routes } from "react-router-dom";

import {
  HOME_ROUTE,
  LOGIN_ROUTE,
  RATED_ROUTE,
  SIGNUP_ROUTE,
  WATCHED_ROUTE,
} from "../Routeslist/RouteList";
import Nav from "./Nav";
import Login from "./Login";
import Signup from "./SignUp";
import Home from "./Home";
import RatedMovies from "./RatedMovies";
import WatchedMovies from "./WatchedMovies";
import PrivateComponent from "./PrivateComponent";

const Router = () => {
  return (
    <>
      <Nav />
      <Routes>
        <Route element={<PrivateComponent />}>
          <Route path={WATCHED_ROUTE} element={<WatchedMovies />} />
          <Route path={RATED_ROUTE} element={<RatedMovies />} />
        </Route>
        <Route path={HOME_ROUTE} element={<Home />} />
        <Route path={LOGIN_ROUTE} element={<Login />} />
        <Route path={SIGNUP_ROUTE} element={<Signup />} />
      </Routes>
    </>
  );
};

export default Router;
