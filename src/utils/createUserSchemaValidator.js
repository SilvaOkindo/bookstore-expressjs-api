// user model fields: first-name, last-name, email, password, role

export const createUserSchemaValidators = {
    firstName: {
      notEmpty: {
        errorMessage: "First name cannot be empty.",
      },
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
      notEmpty: {
        errorMessage: "Last name cannot be empty.",
      },
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
      notEmpty: {
        errorMessage: "Email cannot be empty.",
      },
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
        options: [['admin', 'user', 'author']], 
        errorMessage: "Role must be one of: admin, user, author",
      },
    },
    password: {
      notEmpty: {
        errorMessage: "Password cannot be empty.",
      },
      isString: {
        errorMessage: "Password must be a string",
      },
      isLength: {
        options: {
          min: 8,
          max: 16,
        },
        errorMessage: "Password must be between 8 and 16 characters long",
      },
    },

    confirmPassword: {
        notEmpty: {
          errorMessage: "Password confirmation cannot be empty.",
        },
        isString: {
          errorMessage: "Password confirmation must be a string",
        },
        custom: {
          options: (value, { req }) => {
            if (value !== req.body.password) {
              throw new Error("Passwords do not match.");
            }
            return true;
          },
        },
      },
  };
  