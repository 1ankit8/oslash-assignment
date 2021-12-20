const VALIDATORS = {
    isRequired: (value: string | number, msg?: string): (ValidationErr | null) => {
        msg = msg || 'Field is required';
        if (typeof (value) === 'string') {
            if (!value.trim()) {
                return { key: 'isRequired', value: '[Error] ' + msg };
            }
        }
        return !value ? { key: 'isRequired', value: '[Error] ' + msg } : null;
    },

    email: (value: string, msg?: string): (ValidationErr | null) => {
        msg = msg || 'Invalid Email';
        const isValidEmail = String(value)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );

        return !isValidEmail ? { key: 'validEmail', value: '[Error] ' + msg } : null;
    }
}

export interface ValidationErr {
    key: string;
    value: string;
}

export default VALIDATORS