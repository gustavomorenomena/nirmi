/* eslint-disable react-refresh/only-export-components */
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import * as React from "react";

function RootComponent() {
  return (
    <React.Fragment>
      <div>Hello "__root"!</div>
      <Outlet />
      <TanStackRouterDevtools />
    </React.Fragment>
  );
}

export const Route = createRootRoute({
  component: RootComponent,
});
