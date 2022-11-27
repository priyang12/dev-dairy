import User from "../models/User";
import Project from "../models/Project";
import Post from "../models/Post";
import ShareProject from "../models/ShareProject";
import WorkSessions from "../models/WorkSessions";

const models = {
  User,
  Project,
  Post,
  ShareProject,
  WorkSessions,
};

// explicitly create each collection
// for Mongoose multi-document write support which is needed for transactions
function CreateModels() {
  Object.keys(models).forEach((modelName) => {
    const model = models[modelName];
    model.createCollection();
  });
}

export { CreateModels, models };
