import axios from "axios";
import { SimpleCard } from "@gull";
import { Breadcrumb } from "@gull";
import { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, {
  Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";

const SearchableDataTable = () => {
  const [state, setState] = useState({
    userList: [],
  });

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
      setState({ userList });
    });
  }, []);

  let { userList } = state;
  let { SearchBar } = Search;

  return (
    <div>
      <Breadcrumb
        routeSegments={[
          { name: "Dashboard", path: "/" },
          { name: "Data Table", path: "data-table" },
          { name: "Searchable Data Table" },
        ]}
      />
      <SimpleCard title="Searchable Data Table">
        <ToolkitProvider
          striped
          keyField="id"
          data={userList}
          columns={sortableColumn}
          search
        >
          {(props) => (
            <>
              <div className="d-flex justify-content-end align-items-center">
                <span className="mb-2 me-1">Search:</span>
                <SearchBar {...props.searchProps} className="mb-2" />
              </div>
              <BootstrapTable
                {...props.baseProps}
                bootstrap4
                pagination={paginationFactory(paginationOptions)}
                noDataIndication={"Table is empty"}
              />
            </>
          )}
        </ToolkitProvider>
      </SimpleCard>
    </div>
  );
};

export default SearchableDataTable;
