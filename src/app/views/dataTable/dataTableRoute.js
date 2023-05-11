import { lazy } from "react";

const BasicDataTable = lazy(() => import("./BasicDataTable"));
const DefaultSortedDataTable = lazy(() => import("./DefaultSortedDataTable"));
const MultiColumnOrderingDataTable = lazy(() =>
  import("./MultiColumnOrderingDataTable")
);
const SearchableDataTable = lazy(() => import("./SearchableDataTable"));
const CellEditorDataTable = lazy(() => import("./CellEditorDataTable"));

const dataTableRoute = [
  {
    path: "/data-table/basic",
    element: <BasicDataTable />,
  },
  {
    path: "/data-table/default-sorted",
    element: <DefaultSortedDataTable />,
  },
  {
    path: "/data-table/search",
    element: <SearchableDataTable />,
  },
  {
    path: "/data-table/cell-editor",
    element: <CellEditorDataTable />,
  },
  {
    path: "/data-table/multi-column-ordering",
    element: <MultiColumnOrderingDataTable />,
  },
];

export default dataTableRoute;
