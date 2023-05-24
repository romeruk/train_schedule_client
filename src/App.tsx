import { GitHubBanner, Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  ErrorComponent,
  notificationProvider,
  RefineSnackbarProvider,
  ThemedLayoutV2,
} from "@refinedev/mui";

import { CssBaseline, GlobalStyles } from "@mui/material";
import routerBindings, {
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { Header } from "./components/header";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { StationList, StationCreate, StationEdit } from './pages/stations';
import { RouteList, RouteCreate, RouteEdit } from './pages/routes'
import { TrainList, TrainCreate, TrainEdit } from './pages/trains'
import { ScheduleList } from './pages/trains/schedule';

// import { MuiInferencer } from "@refinedev/inferencer/mui";

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <RefineSnackbarProvider>
            <Refine
              dataProvider={dataProvider("http://localhost:3001/v1")}
              notificationProvider={notificationProvider}
              routerProvider={routerBindings}
              resources={[
                {
                  name: "stations",
                  list: "/stations",
                  create: "/stations/create",
                  edit: "/stations/edit/:id",
                  meta: {
                    canDelete: true,
                  },
                },
								{
                  name: "routes",
                  list: "/routes",
                  create: "/routes/create",
                  edit: "/routes/edit/:id",
                  meta: {
                    canDelete: true,
                  },
                },
								{
                  name: "trains",
                  list: "/trains",
                  create: "/trains/create",
                  edit: "/trains/edit/:id",
                  meta: {
                    canDelete: true,
                  },
                },
              ]}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
              }}
            >
              <Routes>
                <Route
                  element={
                    <ThemedLayoutV2 Header={() => <Header sticky />}>
                      <Outlet />
                    </ThemedLayoutV2>
                  }
                >
                  <Route
                    index
                    element={<NavigateToResource resource="stations" />}
                  />
                  <Route path="/stations">
									<Route index element={<StationList />} />
                    <Route path="create" element={<StationCreate />} />
                    <Route path="edit/:id" element={<StationEdit />} />
                  </Route>

									<Route path="/routes">
									<Route index element={<RouteList />} />
                    <Route path="create" element={<RouteCreate />} />
                    <Route path="edit/:id" element={<RouteEdit />} />
                  </Route>

									<Route path="/trains">
									<Route index element={<TrainList />} />
                    <Route path="create" element={<TrainCreate />} />
                    <Route path="edit/:id" element={<TrainEdit />} />
										<Route path=":id/route/:routeId/schedule" element={<ScheduleList />} />
                  </Route>

                  <Route path="*" element={<ErrorComponent />} />
                </Route>
              </Routes>

              <RefineKbar />
              <UnsavedChangesNotifier />
            </Refine>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
