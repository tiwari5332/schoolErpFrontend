import React from "react";
import { RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AppRouter from "./router/index.tsx";
import { queryClient } from "./api/queryClient.ts";
import { LocalStorageSync } from "./services/LocalStorageSync.ts";
import { ToastContainer } from "./components/ui/Toast.tsx";

LocalStorageSync.init();

const Main = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={AppRouter} />
      <ToastContainer position="top-right" />
      {/* Devtools rendered only in development mode */}
      {(import.meta as any).env?.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
};

export default Main;
