import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 30,
    },

    email: {
      type: String,
      unique: [true, 'Email already exists'],
      required: [true, 'Email is required'],
      maxlength: 50,
    },
    password: {
      type: String,
      required: function () {
        return !this.googleId; // Make password required only if googleId is not present
      },
      minlength: 6,
    },
    image: {
      type: String,
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true, // Ensure unique index is sparse to allow multiple null values
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isExco: {
      type: Boolean,
      default: false,
    },
    occupation: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    position: {
      type: String,
      enum: [
        'Chairman',
        'Vice-President',
        'Secretary',
        'Financial Officer',
        'Director of Socials',
        'CSO',
        'CTO',
        'Deputy CTO',
        'Director Medicals',
        'PRO',
        'Disciplinary Officer',
        'Chest Bearer',
      ],
      default: null,
    },
    resetPasswordToken: {
      type: String,
      default: null,
    },
    resetPasswordExpires: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

// Ensure index creation
UserSchema.index({ googleId: 1 }, { unique: true, sparse: true });

const User = models.User || model('User', UserSchema);

export default User;
