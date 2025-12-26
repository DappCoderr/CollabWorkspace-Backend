import mongoose from 'mongoose';

const workspaceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide workspace name'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide workspace description'],
      trim: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: ['personal', 'organization'],
      default: 'personal',
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

workspaceSchema.pre('save', function () {
  if (this.isNew) {
    this.members = [
      {
        user: this.owner,
        role: 'owner',
        joinedAt: new Date(),
      },
    ];
  }
});

const Workspace = mongoose.model('Workspace', workspaceSchema);

export default Workspace;
