import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Project name is required'],
      trim: true,
    },
    workspaceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Workspace',
      required: true,
    },
  },
  { timestamps: true }
);

const Project = mongoose.model('Project', projectSchema);

export default Project;
