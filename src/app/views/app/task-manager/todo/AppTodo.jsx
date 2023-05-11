import { useState } from "react";
import TodoList from "./TodoList";
import TodoEditor from "./TodoEditor";
import { Routes, Route } from "react-router-dom";
import { MdSearch } from "react-icons/md";

const AppTodo = () => {
  let search = null;
  const [state, setState] = useState({ query: "" });

  const handleQueryChange = (event) => {
    setState({
      query: event.target.value,
    });
  };

  let { query } = state;

  return (
    <div className="todo">
      <div className="todo__search-box-holder">
        <div className="d-flex flex-column justify-content-start mb-4">
          <div className="todo__search-box d-flex align-items-center pl-2 pr-3">
            <MdSearch size="24" className="text-primary search-icon">
              search
            </MdSearch>
            <input
              className="h-100 pl-5 pr-3 flex-grow-1"
              type="text"
              name="query"
              value={query}
              onChange={handleQueryChange}
            />
          </div>
        </div>
      </div>
      <div className="todo__content">
        <TodoList
          setSearchFunction={(searchFunction) => (search = searchFunction)}
        />
        {/* <Routes>
          <Route path="/todo/list/:id" component={TodoEditor} />
          <Route
            path="/todo/list"
            element={
              <TodoList
                setSearchFunction={(searchFunction) =>
                  (search = searchFunction)
                }
              />
            }
          />
        </Routes> */}
      </div>
    </div>
  );
};

export default AppTodo;
