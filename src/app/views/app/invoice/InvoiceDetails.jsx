import { Card } from "react-bootstrap";
import InvoiceViewer from "./InvoiceViewer";
import InvoiceEditor from "./InvoiceEditor";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const InvoiceDetails = (props) => {
  const params = useParams();
  const [state, setState] = useState({
    showInvoiceEditor: false,
    isNewInvoice: false,
  });

  const toggleInvoiceEditor = () => {
    setState({
      showInvoiceEditor: !state.showInvoiceEditor,
      isNewInvoice: false,
    });
  };

  useEffect(() => {
    if (params.id === "create")
      setState({ showInvoiceEditor: true, isNewInvoice: false });
  }, [params]);

  return (
    <Card elevation={6} className="invoice-details m-sm-30">
      {state.showInvoiceEditor ? (
        <InvoiceEditor
          toggleInvoiceEditor={toggleInvoiceEditor}
          isNewInvoice={state.isNewInvoice}
        />
      ) : (
        <InvoiceViewer toggleInvoiceEditor={toggleInvoiceEditor} />
      )}
    </Card>
  );
};

export default InvoiceDetails;
