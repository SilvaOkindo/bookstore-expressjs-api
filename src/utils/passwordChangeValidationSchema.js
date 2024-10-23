export const changePasswordValidators = {
    password: {
      notEmpty: {
        errorMessage: "Current password cannot be empty.",
      },
      isString: {
        errorMessage: "Current password must be a string.",
      },
    },
    newPassword: {
      notEmpty: {
        errorMessage: "New password cannot be empty.",
      },
      isLength: {
        options: { min: 8, max: 16 },
        errorMessage: "New password must be between 8 and 16 characters long.",
      }
    },
    confirmPassword: {
      notEmpty: {
        errorMessage: "Password confirmation cannot be empty.",
      },
      custom: {
        options: (value, { req }) => {
          if (value !== req.body.newPassword) {
            throw new Error("Password confirmation does not match the new password.");
          }
          return true;
        },
      },
    },
  };
  