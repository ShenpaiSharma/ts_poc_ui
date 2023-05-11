import { lazy } from "react";

const AppAlert = lazy(() => import("./alerts/AppAlert"));
const AppAccordion = lazy(() => import("./accordions/AppAccordion"));
const AppBadge = lazy(() => import("./badges/AppBadge"));
const AppButton = lazy(() => import("./buttons/AppButton"));
const AppTab = lazy(() => import("./tabs/AppTab"));
const AppCard = lazy(() => import("./cards/AppCards"));
const CardMetrics = lazy(() => import("./card-metrics/CardMetrics"));
const AppCarousel = lazy(() => import("./carousel/AppCarousel"));
const AppCollapsible = lazy(() => import("./collapsibles/AppCollapsibles"));
const AppList = lazy(() => import("./lists/AppList"));
const AppPagination = lazy(() => import("./pagination/AppPagination"));
const AppPopover = lazy(() => import("./popover/AppPopover"));
const AppProgressbar = lazy(() => import("./progressbar/AppProgressbar"));
const AppTable = lazy(() => import("./tables/AppTable"));
const AppTooltip = lazy(() => import("./tooltip/AppTooltip"));
const AppModal = lazy(() => import("./modals/AppModal"));
const AppSlider = lazy(() => import("./slider/AppSlider"));
const AppRating = lazy(() => import("./ratings/AppRating"));

const uiKitsRoutes = [
  {
    path: "/uikits/alerts",
    element: <AppAlert />,
  },
  {
    path: "/uikits/accordions",
    element: <AppAccordion />,
  },
  {
    path: "/uikits/badges",
    element: <AppBadge />,
  },
  {
    path: "/uikits/buttons",
    element: <AppButton />,
  },
  {
    path: "/uikits/tabs",
    element: <AppTab />,
  },
  {
    path: "/uikits/cards",
    element: <AppCard />,
  },
  {
    path: "/uikits/cards-metrics",
    element: <CardMetrics />,
  },
  {
    path: "/uikits/carousel",
    element: <AppCarousel />,
  },
  {
    path: "/uikits/collapsibles",
    element: <AppCollapsible />,
  },
  {
    path: "/uikits/lists",
    element: <AppList />,
  },
  {
    path: "/uikits/paginations",
    element: <AppPagination />,
  },
  {
    path: "/uikits/popover",
    element: <AppPopover />,
  },
  {
    path: "/uikits/progressbar",
    element: <AppProgressbar />,
  },
  {
    path: "/uikits/tables",
    element: <AppTable />,
  },
  {
    path: "/uikits/tooltip",
    element: <AppTooltip />,
  },
  {
    path: "/uikits/modals",
    element: <AppModal />,
  },
  {
    path: "/uikits/sliders",
    element: <AppSlider />,
  },
  {
    path: "/uikits/rating",
    element: <AppRating />,
  },
];

export default uiKitsRoutes;
