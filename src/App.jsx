import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { navItems } from "./nav-items";

const queryClient = new QueryClient();

// Create a custom ErrorBoundary component
const ErrorBoundary = ({ error }) => (
  <div className="error-boundary">
    <h1>Oops! Something went wrong.</h1>
    <p>{error?.message || 'An unexpected error occurred.'}</p>
  </div>
);

const router = createBrowserRouter(
  navItems.map(({ to, page }) => ({
    path: to,
    element: page,
    errorElement: <ErrorBoundary />, // Add errorElement prop to each route
  })),
  { basename: import.meta.env.BASE_URL }
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <RouterProvider router={router} />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;