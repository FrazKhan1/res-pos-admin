import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster.tsx";
import { TooltipProvider } from "@/components/ui/tooltip.tsx";
import { AppProvider } from "@/context/app-context.jsx";
import { Sidebar } from "@/components/layout/sidebar.jsx";
import Dashboard from "@/pages/dashboard.jsx";
import Restaurants from "@/pages/restaurants.jsx";
import Categories from "@/pages/categories.jsx";
import Analytics from "@/pages/analytics.jsx";
import NotFound from "@/pages/not-found.jsx";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/restaurants" component={Restaurants} />
      <Route path="/categories" component={Categories} />
      <Route path="/analytics" component={Analytics} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppProvider>
          <div className="flex h-screen bg-background">
            <Sidebar />
            <Router />
          </div>
          <Toaster />
        </AppProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
