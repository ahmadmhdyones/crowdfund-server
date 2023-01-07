import mongoose from 'mongoose';

// TODO: move to single file
const requestSchema = new mongoose.Schema({
  index: {
    type: Number,
    required: true,
    unique: true,
    validate: {
      validator: (x) => x > 0,
      message: 'Index must be positive'
    }
  },
  description: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: [1, 'Should be greater than zero, got {VALUE}']
  },
  recipient: {
    type: String,
    required: true
  },
  isCompleted: {
    type: Boolean,
    required: false,
    default: false
  },
  countApprovals: {
    type: Number,
    required: false,
    default: 0,
    min: [0, 'Should not be negative, got {VALUE}']
  }
});

const campaginSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    name: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    goal: {
      type: Number,
      required: true,
      min: [1, 'Should be greater than zero, got {VALUE}']
    },
    pledged: {
      type: Number,
      required: false,
      default: 0,
      min: [0, 'Should not be negative, got {VALUE}']
    },
    startAt: {
      type: Date,
      required: function () {
        return this.state === 'deployed';
      },
      default: null
    },
    endAt: {
      type: Date,
      required: true,
      validate: {
        validator: (d) => d - new Date() > 0,
        message: 'Duration must be at least one day'
      }
    },
    minPledge: {
      type: Number,
      required: false,
      default: 0,
      min: [0, 'Should not be negative, got {VALUE}']
    },
    // TODO: move to single file
    requests: {
      type: [requestSchema],
      required: false,
      default: []
    },
    state: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'deployed', 'canceled'],
      required: false,
      default: 'pending'
    }
  },
  {
    timestamps: true
  }
);

const Campagin = mongoose.model('Campaign', campaginSchema);

export default Campagin;
