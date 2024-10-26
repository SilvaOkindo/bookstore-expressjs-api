export const createBookValidationSchema = {
    title: {
        notEmpty: {
            errorMessage: "Book title cannot be empty"
        },
        isString: {
            errorMessage: "Book title must be a string"
        }
    },
    category: {
        notEmpty: {
            errorMessage: "Category cannot be empty"
        },
        isString: {
            errorMessage: "Category must be a string"
        }
    },
    ISBN: {
        notEmpty: {
            errorMessage: "ISBN cannot be empty"
        },
        isString: {
            errorMessage: "ISBN must be a string"
        }
    },
    summary: {
        notEmpty: {
            errorMessage: "Book summary cannot be empty"
        },
        isString: {
            errorMessage: "Book summary must be a string"
        }
    },
    price: {
        notEmpty: {
            errorMessage: "Price cannot be empty"
        },
        isNumeric: {
            errorMessage: "Price must be a number"
        }
    },
    stock: {
        notEmpty: {
            errorMessage: "Stock cannot be empty"
        },
        isInt: {
            errorMessage: "Stock must be an integer"
        }
    },
}