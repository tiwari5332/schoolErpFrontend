import React from "react";
import { RouterProvider } from "react-router-dom";
import AppRouter from "./router/index.tsx";
import { LocalStorageSync } from "./services/LocalStorageSync.ts";

LocalStorageSync.init();

const Main = () => {
  return (
    <RouterProvider router={AppRouter} />
  );
};

export default Main;
