export const creatCategorySchemaValidators = {
    name: {
      notEmpty: {
        errorMessage: "Category name cannot be empty.",
      },
      isString: {
        errorMessage: "Category name must be a string",
      },
      isLength: {
        options: {
          min: 1, 
          max: 32, 
        },
        errorMessage: "Category name must be between 1 and 32 characters long",
      },
    },
    description: {
      notEmpty: {
        errorMessage: "Description cannot be empty.",
      },
      isString: {
        errorMessage: "description must be a string",
      }
    },
    slug: {
      notEmpty: {
        errorMessage: "Slug cannot be empty.",
      },
      isString: {
        errorMessage: "Slug must be a string",
      },
      
    },
}