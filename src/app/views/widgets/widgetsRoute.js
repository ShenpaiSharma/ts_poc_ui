import { lazy } from "react";

const CardWidget = lazy(() => import("./CardWidget"));
const StatisticsWidget = lazy(() => import("./StatisticsWidget"));
const ListWidget = lazy(() => import("./ListWidget"));
const AppWidget = lazy(() => import("./AppWidget"));
const WeatherWidget = lazy(() => import("./WeatherWidget"));

const widgetsRoute = [
  {
    path: "/widgets/card",
    element: <CardWidget />,
  },
  {
    path: "/widgets/statistics",
    element: <StatisticsWidget />,
  },
  {
    path: "/widgets/list",
    element: <ListWidget />,
  },
  {
    path: "/widgets/app",
    element: <AppWidget />,
  },
  {
    path: "/widgets/weather-app",
    element: <WeatherWidget />,
  },
];

export default widgetsRoute;
