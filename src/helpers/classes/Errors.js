class Errors {
    /**
     * Create a new Errors instance.
     */
    constructor() {
        this.errors = {};
    }


    /**
     * Determine if an errors exists for the given field.
     *
     * @param {string} field
     */
    has(field) {
        return Object.prototype.hasOwnProperty.call(this.errors, field);
    }


    /**
     * Determine if we have any errors.
     */
    any() {
        return Object.keys(this.errors).length > 0;
    }


    /**
     * Retrieve the error message for a field.
     *
     * @param {string} field
     */
    get(field) {

        if (this.errors[field]) {
            return this.errors[field];
        }
    }


    /**
     * Record the new errors.
     *
     * @param {object} errors
     */
    record(errors) {

        // Yii2 version
        let newError = {}
        // eslint-disable-next-line no-unused-vars
        for (const [key, value] of Object.entries(errors)) {
            newError[value.field] = value.message
        }

        this.errors = newError;

        // laravel version
        // this.errors = errors;
    }


    /**
     * Clear one or all error fields.
     *
     * @param {string|null} field
     */
    clear(field) {


        if (field) {
            delete this.errors[field];
            return;
        }

        this.errors = {};
    }
}

export default Errors