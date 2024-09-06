import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { navItems } from "./nav-items";
import ErrorBoundary from "@/components/ErrorBoundary";

const queryClient = new QueryClient();

const router = createBrowserRouter(
  navItems.map(({ to, page }) => ({
    path: to,
    element: page,
    errorElement: <ErrorBoundary />,
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
