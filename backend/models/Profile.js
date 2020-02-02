const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  points: {
    type: Number,
    default: 0
  },
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  friend_requests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  job: {
    type: String
  },
  location: {
    type: String
  },
  hobbies: {
    type: [String]
  },
  skills: {
    type: [String]
  },
  bio: {
    type: String
  },
  education: [
    {
      school: {
        type: String,
        required: true
      },
      degree: {
        type: String,
        required: true
      },
      fieldofstudy: {
        type: String,
        required: true
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  },
  birthday: {
    type: Date
  }
});
module.exports = mongoose.model("profile", ProfileSchema);
