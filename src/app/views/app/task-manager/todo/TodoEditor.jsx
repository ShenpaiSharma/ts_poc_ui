import React, { Component, useEffect, useState } from "react";
import {
  Card,
  Button,
  Dropdown,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getTodoById,
  getAllTodoTag,
  updateTodoById,
  deleteTodo,
  addTodo,
} from "./todoService";
import DatePicker from "react-datepicker";
import { Formik } from "formik";
import * as yup from "yup";
import {
  MdArrowBack,
  MdDrafts,
  MdMarkunread,
  MdError,
  MdErrorOutline,
  MdStar,
  MdStarBorder,
  MdLibraryAdd,
  MdLabel,
  MdDelete,
  MdClose,
} from "react-icons/md";
import { GullTooltip } from "@gull";
import TagDialog from "./TagDialog";

const TodoEditor = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const todoId = parseInt(id);
  const [state, setState] = useState({
    todo: {
      title: "",
      note: "",
      done: false,
      read: false,
      starred: false,
      important: false,
      startDate: new Date(),
      dueDate: new Date(),
      tag: [],
    },
    tagList: [],
    shouldOpenTagDialog: false,
  });

  useEffect(() => {
    getAllTodoTag().then(({ data: tagList }) => {
      if (todoId !== "add") {
        getTodoById(todoId).then(({ data }) => {
          console.log(data, todoId);
          if (!data) {
            // navigate("/todo/list");
            return;
          }
          setState((prevState) => ({
            ...prevState,
            todo: { ...data },
            tagList: [...tagList],
          }));
        });
      } else {
        setState((prevState) => ({
          ...prevState,
          tagList,
        }));
      }
    });
  }, [todoId]);

  const addNewTodo = (values) => {
    addTodo({ ...values }).then(() => {
      navigate("/todo/list");
    });
  };

  const updateTodo = (todo) => {
    updateTodoById(todo);
    setState((prevState) => ({
      ...prevState,
      todo: {
        ...state.todo,
        ...todo,
      },
    }));
  };

  const reloadTagList = () => {
    getAllTodoTag().then(({ data }) => {
      setState((prevState) => ({
        ...prevState,
        tagList: [...data],
      }));
    });
  };

  const addTagInTodo = (id) => {
    let { tag } = state.todo;
    if (!tag.includes(id)) {
      tag.push(id);
      setState((prevState) => ({
        ...prevState,
        todo: {
          ...state.todo,
          tag,
        },
      }));
    }
  };

  const handleTagDelete = (tagId) => {
    let { tag: tagList = [] } = state.todo;
    tagList = tagList.filter((id) => id !== tagId);
    setState((prevState) => ({
      ...prevState,
      todo: {
        ...state.todo,
        tag: [...tagList],
      },
    }));
  };

  const handleTodoDelete = () => {
    deleteTodo({ ...state.todo }).then(() => {
      navigate("/todo/list");
    });
  };

  const handleSubmit = (values) => {
    if (todoId === "add") {
      addNewTodo(values);
    } else {
      updateTodoById({ ...state.todo, ...values }).then(() => {
        navigate("/todo/list");
      });
    }
  };

  const handleTagDialogToggle = () => {
    setState((prevState) => ({
      ...prevState,
      shouldOpenTagDialog: !state.shouldOpenTagDialog,
    }));
  };

  let { done, read, starred, important, tag: tagIdList = [] } = state.todo;
  let { tagList } = state;

  return (
    <Card className="todo-editor position-relative m-sm-30">
      <div className="editor__topbar bg-light-gray p-2 d-flex flex-wrap card-header justify-content-between align-items-center">
        <div className="d-flex flex-wrap align-items-center">
          <Link to="/todo/list">
            <div className="p-2 rounded-circle btn-hover">
              <MdArrowBack size={24}></MdArrowBack>
            </div>
          </Link>
          <div className="ml-4">
            <label className="checkbox checkbox-primary mb-0">
              <input
                type="checkbox"
                name="agree"
                checked={done}
                onChange={() => updateTodo({ ...state, done: !done })}
              />
              <span>{`Mark As ${done ? "Und" : "D"}one`}</span>
              <span className="checkmark"></span>
            </label>
          </div>
        </div>
        <div className="d-flex flex-wrap">
          <GullTooltip
            title={`Mark As ${read ? "Unr" : "R"}ead`}
            fontSize="large"
          >
            <div
              className="p-2 rounded-circle btn-hover cursor-pointer mr-2"
              onClick={() => updateTodo({ ...state, read: !read })}
            >
              {read ? (
                <MdDrafts size={24}></MdDrafts>
              ) : (
                <MdMarkunread size={24}></MdMarkunread>
              )}
            </div>
          </GullTooltip>

          <GullTooltip
            title={`Mark As ${important ? "Uni" : "I"}mportant`}
            fontSize="large"
          >
            <div
              className="p-2 rounded-circle btn-hover  cursor-pointer mr-2"
              onClick={() => updateTodo({ ...state, important: !important })}
            >
              {important ? (
                <MdError className="text-danger" size={24}></MdError>
              ) : (
                <MdErrorOutline size={24}></MdErrorOutline>
              )}
            </div>
          </GullTooltip>

          <GullTooltip
            title={`Mark As ${starred ? "Uns" : "S"}tarred`}
            fontSize="large"
          >
            <div
              className="p-2 rounded-circle btn-hover  cursor-pointer mr-2"
              onClick={() => updateTodo({ ...state, starred: !starred })}
            >
              {starred ? (
                <MdStar className="text-warning" size={24}></MdStar>
              ) : (
                <MdStarBorder size={24}></MdStarBorder>
              )}
            </div>
          </GullTooltip>

          <GullTooltip title="Manage tags" fontSize="large">
            <div
              className="p-2 rounded-circle btn-hover  cursor-pointer mr-2"
              onClick={handleTagDialogToggle}
            >
              <MdLibraryAdd size={24}></MdLibraryAdd>
            </div>
          </GullTooltip>

          <Dropdown>
            <Dropdown.Toggle as="span" className="cursor-pointer toggle-hidden">
              <GullTooltip title="Add tags" fontSize="large">
                <div className="p-2 rounded-circle btn-hover">
                  <MdLabel size={24}></MdLabel>
                </div>
              </GullTooltip>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {state.tagList.map((tag) => (
                <Dropdown.Item
                  className="text-capitalize"
                  key={tag.id}
                  onClick={() => addTagInTodo(tag.id)}
                >
                  {tag.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          <GullTooltip title="Delete" fontSize="large">
            <div
              className="p-2 rounded-circle btn-hover  cursor-pointer mr-2"
              onClick={handleTodoDelete}
            >
              <MdDelete size={24}></MdDelete>
            </div>
          </GullTooltip>
        </div>
      </div>

      <div className="editor__form p-3">
        <div className="my-3">
          {tagIdList.map((tagId) => {
            let tagName = (tagList.find((tag) => tag.id === tagId) || {}).name;
            if (!tagName) return null;
            else
              return (
                <div
                  className="badge badge-pill bg-gray-400 text-capitalize mr-2 pl-2"
                  key={tagId}
                >
                  <div className=" d-flex align-items-center">
                    <span className="text-12">{tagName}</span>
                    <span
                      className="p-1 rounded-circle btn-hover"
                      onClick={() => handleTagDelete(tagId)}
                    >
                      <MdClose size="18"></MdClose>
                    </span>
                  </div>
                </div>
              );
          })}
        </div>

        <Formik
          initialValues={state.todo}
          validationSchema={todoSchema}
          enableReinitialize={true}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <FormLabel>Title</FormLabel>
                <FormControl
                  className="mb-3 w-100"
                  label="Title*"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  name="title"
                  value={values.title}
                  isInvalid={errors.title && touched.title}
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>Put your notes</FormLabel>
                <FormControl
                  as="textarea"
                  className="mb-3 w-100"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  name="note"
                  value={values.note}
                  isInvalid={errors.note && touched.note}
                />
              </FormGroup>

              <div className="row mb-3">
                <FormGroup className="col-4">
                  <FormLabel className="mr-2">Start date</FormLabel>
                  <DatePicker
                    className="form-control"
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Start date"
                    selected={new Date(values.startDate)}
                    onChange={(date) => {
                      setFieldValue("startDate", date);
                    }}
                  />
                </FormGroup>
                <FormGroup className="col-4">
                  <FormLabel className="mr-2">Due date</FormLabel>
                  <DatePicker
                    className="form-control"
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Start date"
                    selected={new Date(values.dueDate)}
                    onChange={(date) => {
                      setFieldValue("dueDate", date);
                    }}
                  />
                </FormGroup>
              </div>
              <Link to="/todo/list">
                <Button className="mr-3" variant="outline-danger" type="button">
                  Cancel
                </Button>
              </Link>
              <Button variant="primary" type="submit">
                Save
              </Button>
            </form>
          )}
        </Formik>
      </div>
      <TagDialog
        reloadTagList={reloadTagList}
        open={state.shouldOpenTagDialog}
        handleClose={handleTagDialogToggle}
      />
    </Card>
  );
};

const todoSchema = yup.object().shape({
  title: yup.string().required("title is required"),
  note: yup.string().required("note is required"),
});

export default TodoEditor;
