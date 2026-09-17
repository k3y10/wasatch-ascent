import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";

const Workspace = lazy(() => import("./pages/Workspace.tsx"));
const API = lazy(() => import("./pages/API.tsx"));
const Activate = lazy(() => import("./pages/Activate.tsx"));
const BillingSuccess = lazy(() => import("./pages/BillingSuccess.tsx"));
const DemoAccess = lazy(() => import("./pages/DemoAccess.tsx"));
const Demos = lazy(() => import("./pages/Demos.tsx"));
const Edge = lazy(() => import("./pages/Downloads.tsx"));
const Investors = lazy(() => import("./pages/Investors.tsx"));
const ProtectedDemoRoute = lazy(() => import("./components/ProtectedDemoRoute.tsx"));

const queryClient = new QueryClient();

const RouteLoading = () => (
  <div className="flex min-h-screen items-center justify-center bg-background px-6" role="status">
    <div className="flex w-full max-w-md flex-col gap-4">
      <Skeleton className="h-5 w-44" />
      <Skeleton className="h-32 w-full" />
      <span className="sr-only">Loading TerraSatch workspace</span>
    </div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<RouteLoading />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/workspace" element={<Workspace />} />
            <Route path="/workspace-preview" element={<Navigate to="/workspace" replace />} />
            <Route path="/api" element={<API />} />
            <Route path="/edge" element={<Edge />} />
            <Route path="/downloads" element={<Navigate to="/edge" replace />} />
            <Route path="/investors" element={<Investors />} />
            <Route path="/activate" element={<Activate />} />
            <Route path="/billing/success" element={<BillingSuccess />} />
            <Route path="/demo-access" element={<DemoAccess />} />
            <Route
              path="/demos"
              element={
                <ProtectedDemoRoute>
                  <Demos />
                </ProtectedDemoRoute>
              }
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
