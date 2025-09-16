// models/Teacher.js
import { model, Schema } from "mongoose";

const teacherSchema = new Schema(
  {
    // 1. Personal Information
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    dateOfBirth: {
      type: Date,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
    },
    nationalId: {
      type: String,
      unique: true,
      sparse: true,
    },
    profilePhoto: {
      type: String,
    }, // store image URL
    contactNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    address: {
      current: {
        type: String,
      },
      permanent: {
        type: String,
      },
    },
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

    // 2. Employment Details
    userId: {
      type: String,
      unique: true,
    },
    department: {
      type: String,
    },
    designation: {
      type: String,
    },
    joiningDate: {
      type: Date,
    },
    employmentType: {
      type: String,
      enum: ["Full-time", "Part-time", "Contract"],
    },
    workStatus: {
      type: String,
      enum: ["Active", "On Leave", "Resigned"],
      default: "Active",
    },
    assignedClasses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Class",
      },
    ],
    assignedSubjects: [
      {
        type: Schema.Types.ObjectId,
      },
    ],
    assignedSection: [
      {
        type: Schema.Types.ObjectId,
        ref: "Section",
      },
    ],
    assignedAsClassTeacher: {
      classId: {
        type: Schema.Types.ObjectId,
        ref: "Class",
      },
      sectionId: {
        type: Schema.Types.ObjectId,
        ref: "Section",
      },
    },

    shift: {
      type: String,
      enum: ["Morning", "Day", "Evening"],
    },
    weeklyWorkloadHours: {
      type: Number,
    },

    // 3. Academic & Professional Qualifications
    qualifications: [
      {
        degree: {
          type: String,
        },
        fieldOfStudy: {
          type: String,
        },
        institute: {
          type: String,
        },
        graduationYear: {
          type: Number,
        },
      },
    ],
    teachingExperienceYears: {
      type: Number,
    },
    certifications: [
      {
        type: String,
      },
    ],
    specialSkills: [
      {
        type: String,
      },
    ],

    // 4. Payroll & Financial
    salary: {
      basic: {
        type: Number,
      },
      allowances: {
        type: Number,
      },
      deductions: {
        type: Number,
      },
    },
    bankDetails: {
      accountNumber: {
        type: String,
      },
      bankName: {
        type: String,
      },
      branch: {
        type: String,
      },
    },
    paymentMethod: {
      type: String,
      enum: ["Bank Transfer", "Cash"],
    },
    taxId: { type: String },

    // 5. System Access & Roles
    username: {
      type: String,
      sparse: true,
    },

    password: {
      type: String,
      default: "SecurePass123",
    },

    role: {
      type: String,
      enum: ["Admin", "Teacher", "Head Teacher"],
      default: "Teacher",
    },
    lastLogin: { type: Date },

    // 6. Additional Data
    performanceReviews: [
      {
        date: {
          type: Date,
        },
        reviewer: {
          type: String,
        },
        remarks: {
          type: String,
        },
      },
    ],
    attendanceRecords: [
      {
        date: {
          type: Date,
        },
        status: {
          type: String,
          enum: ["Present", "Absent", "Leave"],
        },
      },
    ],
    leaveRecords: [
      {
        startDate: {
          type: Date,
        },
        endDate: {
          type: Date,
        },
        reason: {
          type: String,
        },
      },
    ],
    notes: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Teacher = model("Teacher", teacherSchema);
