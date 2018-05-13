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
    model: {
      type: Object,
      requried: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = Project = mongoose.model("projects", ProjectSchema);
