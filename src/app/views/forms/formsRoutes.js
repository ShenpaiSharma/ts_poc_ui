import { lazy } from "react";

const FormBasic = lazy(() => import("./FormBasic"));
const ActionBarForm = lazy(() => import("./ActionBarForm"));
const LayoutForm = lazy(() => import("./LayoutForm"));
const MultiColumnForms = lazy(() => import("./MultiColumnForms"));
const InputGroupForm = lazy(() => import("./InputGroupForm"));
const FormValidation = lazy(() => import("./FormValidation"));
const FormsWizard = lazy(() => import("./FormsWizard"));
const TagInput = lazy(() => import("./TagInput"));
const FormEditor = lazy(() => import("./FormEditor"));

const formsRoutes = [
  {
    path: "/forms/basic",
    element: <FormBasic />,
  },
  {
    path: "/forms/action-bar",
    element: <ActionBarForm />,
  },
  {
    path: "/forms/layouts",
    element: <LayoutForm />,
  },
  {
    path: "/forms/multi-column-forms",
    element: <MultiColumnForms />,
  },
  {
    path: "/forms/input-group",
    element: <InputGroupForm />,
  },
  {
    path: "/forms/form-validation",
    element: <FormValidation />,
  },
  {
    path: "/forms/forms-wizard",
    element: <FormsWizard />,
  },
  {
    path: "/forms/form-editor",
    element: <FormEditor />,
  },
  {
    path: "/forms/tag-input",
    element: <TagInput />,
  },
];

export default formsRoutes;
