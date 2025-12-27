import mongoose from 'mongoose';

const workspaceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide workspace name'],
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide workspace description'],
      trim: true,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    members: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        role: {
          type: String,
          enum: ['owner', 'collaborator', 'viewer'],
          default: 'collaborator',
        },
        joinedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    projects: [
      {
        projectId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Project',
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

// workspaceSchema.index(
//   { name: 1, owner: 1 },
//   { unique: true }
// );

const Workspace = mongoose.model('Workspace', workspaceSchema);

export default Workspace;
