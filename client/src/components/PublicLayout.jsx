import { Redirect } from "wouter";

function PublicRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? <Redirect to="/" /> : children;
}

export default PublicRoute;
