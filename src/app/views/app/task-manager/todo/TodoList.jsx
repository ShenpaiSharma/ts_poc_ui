import {
  getAllTodo,
  updateTodoById,
  reorderTodoList,
  getAllTodoTag,
} from "./todoService";
import TodoItem from "./TodoItem";
import { useEffect, useState } from "react";
import { Button, Card, Dropdown } from "react-bootstrap";
import { MdArrowDropDown, MdLabel } from "react-icons/md";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useNavigate } from "react-router-dom";

const TodoList = (props) => {
  let todoList = [];
  const navigate = useNavigate();

  const [state, setState] = useState({
    tagList: [],
    todoList: [],
  });

  const search = (query) => {
    query = query.toLowerCase();
    let filteredTodoList = todoList.filter(
      (todo) =>
        todo.title.toLowerCase().match(query) ||
        todo.note.toLowerCase().match(query)
    );
    setState((prevState) => ({
      ...prevState,
      todoList: [...filteredTodoList],
    }));
  };

  const updateTodo = (todo) => {
    updateTodoById(todo).then(({ data }) => {
      setState((prevState) => ({
        ...prevState,
        todoList: [...data],
      }));
      todoList = [...data];
    });
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    let todoList = reorder(
      state.todoList,
      result.source.index,
      result.destination.index
    );

    reorderTodoList(todoList).then(({ data }) => {
      setState((prevState) => ({
        ...prevState,
        todoList: [...data],
      }));
      todoList = [...data];
    });
  };

  const filterTodoListByProperty = (queryField, queryValue) => {
    if (queryField !== "all") {
      setState((prevState) => ({
        ...prevState,
        todoList: [
          ...todoList.filter((todo) => todo[queryField] === queryValue),
        ],
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        todoList: [...todoList],
      }));
    }
  };

  const filterTodoListByTag = (tagId) => {
    if (tagId !== "all")
      setState((prevState) => ({
        ...prevState,
        todoList: [...todoList.filter((todo) => todo.tag.includes(tagId))],
      }));
    else {
      setState((prevState) => ({
        ...prevState,
        todoList: [...todoList],
      }));
    }
  };

  useEffect(() => {
    props.setSearchFunction(search);
    getAllTodo().then(({ data }) => {
      getAllTodoTag().then(({ data: tagList }) => {
        setState({
          tagList,
          todoList: [...data],
        });
        todoList = [...data];
      });
    });
  }, []);

  // let { todoList, tagList } = state;

  return (
    <Card className="todo position-relative">
      <div className="todo-list__topbar card-header py-2 d-flex flex-wrap justify-content-between align-items-center">
        <div className="d-flex ms-3">
          <Dropdown>
            <Dropdown.Toggle as="div" className="toggle-hidden cursor-pointer">
              <div className="p-2 btn-hover rounded-circle">
                <MdArrowDropDown size={24}></MdArrowDropDown>
              </div>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => filterTodoListByProperty("all")}>
                All
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => filterTodoListByProperty("read", true)}
              >
                Read
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => filterTodoListByProperty("read", false)}
              >
                Unread
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => filterTodoListByProperty("done", true)}
              >
                Done
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => filterTodoListByProperty("done", false)}
              >
                Undone
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => filterTodoListByProperty("important", true)}
              >
                Important
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => filterTodoListByProperty("important", false)}
              >
                Unimportant
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => filterTodoListByProperty("starred", true)}
              >
                Starred
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => filterTodoListByProperty("starred", false)}
              >
                Unstarred
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown>
            <Dropdown.Toggle as="div" className="toggle-hidden cursor-pointer">
              <div className="p-2 btn-hover rounded-circle">
                <MdLabel size={24}></MdLabel>
              </div>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                className="text-capitalize"
                onClick={() => filterTodoListByTag("all")}
              >
                all
              </Dropdown.Item>
              {state.tagList.map((tag) => (
                <Dropdown.Item
                  key={tag.id}
                  className="text-capitalize"
                  onClick={() => filterTodoListByTag(tag.id)}
                >
                  {tag.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="pe-3">
          <Button variant="primary" onClick={() => navigate("/todo/list/add")}>
            Create Todo
          </Button>
        </div>
      </div>

      <div className="todo-list">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {state.todoList.map((todo, index) => (
                  <Draggable
                    key={todo.id}
                    draggableId={todo.id.toString()}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        style={provided.draggableProps.style}
                      >
                        <TodoItem
                          tagList={state.tagList}
                          updateTodo={updateTodo}
                          key={index}
                          todo={todo}
                          dragHandleProps={provided.dragHandleProps}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </Card>
  );
};

export default TodoList;
