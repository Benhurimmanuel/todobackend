const Todo = require("./todo-model");
const joiSchema = require("./todo-helpers");

const getToDoservice = async (creatorId) => {
  let getToDoList = await Todo.find({ createdBy: creatorId });
  return { status: true, payload: getToDoList };
};

const getSingleToDoService = async (payload) => {
  //Validations
  joiSchema.validate({ id: payload.id });
  // Business Logic
  let getToDoItem = await Todo.find({
    $and: [{ _id: payload.id }, { createdBy: payload.createdBy }],
  });
  const response = {};
  if (getToDoItem) {
    response.success = true;
    response.payload = getToDoItem;
    return response;
  }
  response.success = false;
  response.message = "no to do found";
  return response;
};

const postToDoService = async (value) => {
  //Validations
  joiSchema.validate({
    title: value.title,
    toDoDetail: value.toDoDetail,
  });
  //business Logic
  const response = {};
  let create = await Todo.create(value);
  response.success = true;
  response.payload = create;
  return response;
};

const updateToDoService = async (payload) => {
  //Validations
  joiSchema.validate({
    title: payload.body.title,
    toDoDetail: payload.body.toDoDetail,
    createdBy: payload.createdBy,
  });
  // Business Logic
  const response = {};

  const updateToDoItem = await Todo.findOneAndUpdate(
    { _id: payload.id, createdBy: payload.createdBy },
    {
      $set: { title: payload.body.title, toDoDetail: payload.body.toDoDetail },
    },
    { new: true }
  );

  if (updateToDoItem) {
    response.success = true;
    response.payload = updateToDoItem;
    return response;
  }
  response.success = false;
  response.message = "cannot update";
  return response;
};

const deleteToDoService = async (payload) => {
  //Validations
  joiSchema.validate({
    id: payload.id,
    createdBy: payload.createdBy,
  });
  // Business Logic
  const response = {};
  let deleteToDo = await Todo.deleteOne({
    $and: [{ _id: payload.id }, { createdBy: payload.createdBy }],
  });

  if (deleteToDo) {
    response.success = true;
    response.payload = deleteToDo;
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
