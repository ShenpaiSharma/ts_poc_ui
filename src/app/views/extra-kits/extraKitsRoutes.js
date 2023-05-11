import { lazy } from "react";

const UploadForm = lazy(() => import("./UploadForm"));
const AppToastr = lazy(() => import("./AppToastr"));
const LaddaButtons = lazy(() => import("./LaddaButtons"));
const AppLoader = lazy(() => import("./AppLoader"));
const AppSweetAlert = lazy(() => import("./AppSweetAlert"));
const AppDropdown = lazy(() => import("./AppDropdown"));
const AppImageCropper = lazy(() => import("./AppImageCropper"));
const AppTour = lazy(() => import("./AppTour"));

const extraKitsRoutes = [
  {
    path: "/extra-kits/upload",
    element: <UploadForm />,
  },
  {
    path: "/extra-kits/toastr",
    element: <AppToastr />,
  },
  {
    path: "/extra-kits/ladda-buttons",
    element: <LaddaButtons />,
  },
  {
    path: "/extra-kits/loaders",
    element: <AppLoader />,
  },
  {
    path: "/extra-kits/sweet-alert",
    element: <AppSweetAlert />,
  },
  {
    path: "/extra-kits/image-cropper",
    element: <AppImageCropper />,
  },
  {
    path: "/extra-kits/user-tour",
    element: <AppTour />,
  },
  {
    path: "/extra-kits/dropdown",
    element: <AppDropdown />,
  },
];

export default extraKitsRoutes;
