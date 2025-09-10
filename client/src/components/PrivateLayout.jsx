import { Redirect } from "wouter";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Redirect to="/login" />;
}

export default PrivateRoute;
