const fetch = require("node-fetch");
const joiSchema = require("./todo-helpers");

const getToDoservice = async () => {
  let getToDoList = await fetch("https://jsonplaceholder.typicode.com/todos");
  const json = await getToDoList.json();
  return { status: true, payload: json };
};

const getSingleToDoService = async (id) => {
  //Validations
  joiSchema.validate({ id: id });
  // Business Logic
  let getToDoItem = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${id}`
  );
  const json = await getToDoItem.json();
  const response = {};
  if (getToDoItem) {
    response.success = true;
    response.payload = json;
    return response;
  }
  response.success = false;
  response.message = "no to do found";
  return response;
};

const postToDoService = async (value) => {
  //Validations
  //   joiSchema.validate({
  //     title: value.title,
  //     toDoDetail: value.toDoDetail,
  //   });
  //business Logic
  const response = {};
  let create = await fetch("https://jsonplaceholder.typicode.com/todos", {
    method: "POST",
    body: JSON.stringify(value),
    headers: { "Content-Type": "application/json" },
  });
  const json = await create.json();
  response.success = true;
  response.payload = json;
  return response;
};

const updateToDoService = async (id, updateobj) => {
  //Validations
  //   joiSchema.validate({
  //     id: id,
  //     title: updateobj.title,
  //     toDoDetail: updateobj.toDoDetail,
  //   });
  // Business Logic
  const response = {};
  let updateToDoItem = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(updateobj),
      headers: { "Content-Type": "application/json" },
    }
  );
  const json = await updateToDoItem.json();
  if (json) {
    response.success = true;
    response.payload = json;
    return response;
  }
  response.success = false;
  response.message = "cannot update";
  return response;
};

const deleteToDoService = async (id) => {
  //Validations
  joiSchema.validate({ id: id });
  // Business Logic
  const response = {};
  let deleteToDo = await fetch(
       `https://jsonplaceholder.typicode.com/todos/${id}`,
    {
      method: "DELETE",
    }
  );
  const json = await deleteToDo.json();
  if (json) {
    response.success = true;
    response.payload = json;
    return response;
  }
  response.success = false;

  response.message = "Cannot delete";
  return response;
};

module.exports = {
  getToDoservice,
  getSingleToDoService,
  postToDoService,
  updateToDoService,
  deleteToDoService,
};
