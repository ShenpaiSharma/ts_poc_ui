import swal from "sweetalert2";
import { classList } from "@utils";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Table, Button, Card } from "react-bootstrap";
import { getAllInvoice, deleteInvoice } from "./InvoiceService";

const InvoiceList = (props) => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    invoiceList: [],
    shouldShowConfirmationDialog: false,
  });

  useEffect(() => {
    getAllInvoice().then((res) =>
      setState((prevState) => ({ ...prevState, invoiceList: res.data }))
    );
  }, []);

  const handeViewClick = (invoiceId) => {
    navigate(`/invoice/${invoiceId}`);
  };

  const handleDeleteInvoice = (invoice) => {
    deleteInvoice(invoice).then((res) => {
      swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        type: "success",
        icon: "success",
        timer: 1500,
      });

      setState({
        invoiceList: res.data,
        shouldShowConfirmationDialog: false,
      });
    });
  };

  const handleDialogClose = () => {
    setState((prevState) => ({
      ...prevState,
      shouldShowConfirmationDialog: false,
    }));
  };

  let { invoiceList } = state;
  return (
    <div>
      <Link to="/invoice/create">
        <Button className="mb-3" variant="primary">
          Add Invoice
        </Button>
      </Link>
      <Card elevation={6} className="w-100 overflow-auto">
        <Table style={{ minWidth: 750 }}>
          <thead>
            <tr>
              <th className="pl-sm-24">Order No.</th>
              <th className="px-0">Bill From</th>
              <th className="px-0">Bill To</th>
              <th className="px-0">Status</th>
              <th className="px-0">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoiceList.map((invoice, index) => (
              <tr key={invoice.id}>
                <td className="pl-sm-24 capitalize" align="left">
                  {invoice.orderNo}
                </td>
                <td className="pl-0 capitalize" align="left">
                  {invoice.seller.name}
                </td>
                <td className="pl-0 capitalize" align="left">
                  {invoice.buyer.name}
                </td>
                <td className="pl-0 capitalize">
                  <small
                    className={classList({
                      "badge rounded-pill text-white px-8 py-2": true,
                      "bg-success": invoice.status === "delivered",
                      "bg-warning": invoice.status === "processing",
                      "bg-danger": invoice.status === "pending",
                    })}
                  >
                    {invoice.status}
                  </small>
                </td>
                <td className="pl-0">
                  <i
                    className="i-Arrow-Right mr-4 font-weight-900 text-primary cursor-pointer"
                    onClick={() => handeViewClick(invoice.id)}
                  ></i>
                  <i
                    className="i-Folder-Trash font-weight-900 text-danger cursor-pointer"
                    onClick={() => {
                      swal
                        .fire({
                          title: "Are you sure?",
                          text: "You won't be able to revert this!",
                          icon: "warning",
                          type: "question",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Yes, delete it!",
                          cancelButtonText: "No",
                        })
                        .then((result) => {
                          if (result.value) {
                            handleDeleteInvoice(invoice);
                          }
                        });
                    }}
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
      {/* <ConfirmationDialog
          open={state.shouldShowConfirmationDialog}
          onConfirmDialogClose={handleDialogClose}
          onYesClick={handleDeleteInvoice}
          text="Are you sure to delete?"
        /> */}
    </div>
  );
};

export default InvoiceList;
