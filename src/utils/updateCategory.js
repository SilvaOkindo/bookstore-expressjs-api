export const updateCategorySchemaValidators = {
    name: {
        optional: true,
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
        optional: true,
        isString: {
          errorMessage: "description must be a string",
        }
      },
      slug: {
        optional: true,
        isString: {
          errorMessage: "Slug must be a string",
        },
        
      },
}