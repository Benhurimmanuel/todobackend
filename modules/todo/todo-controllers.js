const {
  getToDoservice,
  getSingleToDoService,
  postToDoService,
  updateToDoService,
  deleteToDoService,
} = require("./todo-service");
// const {
//     getToDoservice,
//     getSingleToDoService,
//     postToDoService,
//     updateToDoService,
//     deleteToDoService,
//   } = require("./todo-3rdparty-service");

const addtodocontroller = async (req, res, next) => {
  try {
    const payload = req.body;
    const creatorId = req.session.user._id;
    payload.createdBy = creatorId;
    let post = await postToDoService(payload);
    res.json(post);
  } catch (error) {
    next(error);
  }
};

const gettodocontroller = async (req, res, next) => {
  try {
    const creatorId = req.session.user._id;
    let result = await getToDoservice(creatorId);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getSingleToDoController = async (req, res, next) => {
  try {
    payload = {};
    payload.createdBy = req.session.user._id;
    payload.id = req.params.id;
    let singleToDo = await getSingleToDoService(payload);
    res.json(singleToDo);
  } catch (error) {
    next(error);
  }
};

const deleteToDoController = async (req, res, next) => {
  try {
    payload = {};
    payload.createdBy = req.session.user._id;
    payload.id = req.params.id;
    let deleteToDo = await deleteToDoService(payload);
    res.json(deleteToDo);
  } catch (error) {
    next(error);
  }
};

const updateToDoController = async (req, res, next) => {
  try {
    payload = {};
    payload.createdBy = req.session.user._id;
    payload.id = req.params.id;
    payload.body = req.body;
    let updateToDo = await updateToDoService(payload);
    res.json(updateToDo);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addtodocontroller,
  gettodocontroller,
  getSingleToDoController,
  deleteToDoController,
  updateToDoController,
};
