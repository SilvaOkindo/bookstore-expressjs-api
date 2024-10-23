export const loginUserSchemaValidators = {
    email: {
      notEmpty: {
        errorMessage: "Email is needed to login.",
      },
      isString: {
        errorMessage: "Email must be a string",
      },
      isEmail: {
        errorMessage: "Email must be a valid email",
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
    }
  };
  