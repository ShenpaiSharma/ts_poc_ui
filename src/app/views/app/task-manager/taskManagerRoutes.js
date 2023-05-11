import todoRoutes from "./todo/todoRoutes";
import { lazy } from "react";

const TaskManager = lazy(() => import("./TaskManager"));
const TaskManagerList = lazy(() => import("./TaskManagerList"));

const taskManagerRoutes = [
  {
    path: "/task-manager",
    element: <TaskManager />,
  },
  {
    path: "/task-manager-list",
    element: <TaskManagerList />,
  },
  ...todoRoutes,
];

export default taskManagerRoutes;
