// user model fields: first-name, last-name, email, password, role

export const updateUserSchemaValidators = {
  firstName: {
    optional: true,
    isString: {
      errorMessage: "First name must be a string",
    },
    isLength: {
      options: {
        min: 1,
        max: 32,
      },
      errorMessage: "First name must be between 1 and 32 characters long",
    },
  },
  lastName: {
    optional: true,

    isString: {
      errorMessage: "Last name must be a string",
    },
    isLength: {
      options: {
        min: 1,
        max: 32,
      },
      errorMessage: "Last name must be between 1 and 32 characters long",
    },
  },
  email: {
    optional: true,

    isString: {
      errorMessage: "Email must be a string",
    },
    isEmail: {
      errorMessage: "Email must be a valid email",
    },
  },
  role: {
    optional: true,
    isString: {
      errorMessage: "Role must be a string",
    },
    isIn: {
      options: [["admin", "user", "author"]],
      errorMessage: "Role must be one of: admin, user, editor",
    },
  }
};
