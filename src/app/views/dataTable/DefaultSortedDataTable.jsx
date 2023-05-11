import axios from "axios";
import { Breadcrumb } from "@gull";
import { SimpleCard } from "@gull";
import { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

const DefaultSortedDataTable = () => {
  const [state, setState] = useState({
    userList: [],
  });

  const defaultSorted = [
    {
      dataField: "name",
      order: "asc",
    },
  ];

  const sortableColumn = [
    {
      dataField: "index",
      text: "No",
      sort: true,
    },
    {
      dataField: "name",
      text: "User Name",
      sort: true,
    },
    {
      dataField: "email",
      text: "User Email",
      sort: true,
    },
    {
      dataField: "company",
      text: "Company",
      sort: true,
    },
    {
      dataField: "balance",
      text: "Balance",
      sort: true,
      align: "center",
      headerAlign: "center",
    },
    {
      dataField: "age",
      text: "Age",
      sort: true,
      align: "center",
      headerAlign: "center",
    },
  ];

  const paginationOptions = {
    // custom: true,
    paginationSize: 5,
    pageStartIndex: 1,
    firstPageText: "First",
    prePageText: "Back",
    nextPageText: "Next",
    lastPageText: "Last",
    nextPageTitle: "First page",
    prePageTitle: "Pre page",
    firstPageTitle: "Next page",
    lastPageTitle: "Last page",
    showTotal: true,
    totalSize: state.userList.length,
  };

  useEffect(() => {
    axios.get("/api/user/all").then(({ data }) => {
      let userList = data.map(
        ({ id, name, email, age, company, balance }, ind) => ({
          id,
          name,
          email,
          age,
          balance,
          company,
          index: ind + 1,
        })
      );
      setState((prevState) => ({ ...prevState, userList }));
    });
  }, []);

  let { userList } = state;

  return (
    <div>
      <Breadcrumb
        routeSegments={[
          { name: "Dashboard", path: "/" },
          { name: "Data Table", path: "data-table" },
          { name: "Default Sorted Data Table" },
        ]}
      />
      <SimpleCard title="Default Sorted Data Table">
        <BootstrapTable
          bootstrap4
          keyField="id"
          data={userList}
          columns={sortableColumn}
          defaultSorted={defaultSorted}
          pagination={paginationFactory(paginationOptions)}
          noDataIndication={"Table is empty"}
        />
      </SimpleCard>
    </div>
  );
};

export default DefaultSortedDataTable;
