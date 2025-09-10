import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip.tsx";
import { AppProvider } from "@/context/app-context.jsx";
import { Sidebar } from "@/components/layout/sidebar.jsx";
import Dashboard from "@/pages/dashboard.jsx";
import Restaurants from "@/pages/restaurants.jsx";
import Categories from "@/pages/categories.jsx";
import Analytics from "@/pages/analytics.jsx";
import NotFound from "@/pages/not-found.jsx";
import Login from "./pages/login";
import PrivateRoute from "./components/PrivateLayout.jsx";
import { Toaster } from "react-hot-toast";
import PublicRoute from "./components/PublicLayout.jsx";
import { useEffect, useState } from "react";

function Router() {
  return (
    <Switch>
      <Route path="/login">
        <PublicRoute>
          <Login />
        </PublicRoute>
      </Route>

      <Route path="/">
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      </Route>
      <Route path="/restaurants">
        <PrivateRoute>
          <Restaurants />
        </PrivateRoute>
      </Route>
      <Route path="/categories">
        <PrivateRoute>
          <Categories />
        </PrivateRoute>
      </Route>
      <Route path="/analytics">
        <PrivateRoute>
          <Analytics />
        </PrivateRoute>
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [location] = useLocation();

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [token]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppProvider>
          <Toaster position="top-center" reverseOrder={false} />
          <div className="flex h-screen bg-background">
            {/* only show sidebar if logged in and NOT on /login */}
            {token && location !== "/login" && <Sidebar />}
            <Router />
          </div>
        </AppProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
