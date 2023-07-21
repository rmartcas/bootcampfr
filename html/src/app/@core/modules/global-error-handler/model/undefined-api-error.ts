export class UndefinedApiError extends Error {
    constructor(m = 'Acceso a API incorrecto') {
        super(m);

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, UndefinedApiError.prototype);
    }
}
