// models/Student.js
import { Schema, model } from "mongoose";

const studentSchema = new Schema(
  {
    // Basic Info
    name: {
      type: String,
      required: true,
      trim: true,
    },

    classId: {
      type: Schema.Types.ObjectId,
      ref: "Class",
    },

    sectionId: {
      type: [Schema.Types.ObjectId],
      ref: "Section",
    },

    // this is mainly for O-level
    subjects: {
      type: [String], // Array of subject names or IDs
      default: [],
    },

    // Additional Info}
    dateOfBirth: {
      type: Date,
      required: true,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },

    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
    },

    // Emergency Contact
    emergencyContact: {
      name: {
        type: String,
      },
      relation: {
        type: String,
      },
      phone: {
        type: String,
      },
    },
    password: {
      type: String,
      require: true,
    },
    // Parent Information
    parentInfo: {
      father: {
        name: {
          type: String,
        },
        occupation: {
          type: String,
        },
        phone: {
          type: String,
        },
        address: {
          type: String,
        },
      },
      mother: {
        name: {
          type: String,
        },
        occupation: {
          type: String,
        },
        phone: {
          type: String,
        },
        address: {
          type: String,
        },
      },
    },

    // Student Address
    address: {
      present: {
        type: String,
      },
      permanent: {
        type: String,
      },
    },

    // Academic Info
    assignedClass: {
      type: String,
      required: true,
    },
    group: {
      type: String,
      enum: ["Science", "Commerce", "Arts", "None"],
      default: "None",
    },

    // Profile Photo
    profilePhoto: {
      type: String, // store URL
    },

    // Soft Delete
    isDeleted: {
      type: Boolean,
      default: false,
    },

    religion: {
      type: String,
      enum: ["Islam", "Christianity", "Hinduism", "Buddhism", "Other"],
      default: "Other",
    },

    UserID: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },

    rollNumber: {
      type: String, // Unique roll number for the student
      required: true,
    },

    admissionDate: {
      type: Date, // Date of admission to the school
      required: true,
    },
  },
  { timestamps: true }
);

export const Student = model("Student", studentSchema);
