const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "users"
    },
    name: {
      type: String,
      requried: true
    },
    jsonData: {
      type: String,
      requried: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = Project = mongoose.model("projects", ProjectSchema);
