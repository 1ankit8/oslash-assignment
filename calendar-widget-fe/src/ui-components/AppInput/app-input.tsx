import { ValidationErr } from "../../services/app.validators";
import "./app-input.scss";
const AppInput = (props: AppInputProps) => {
    let isValid = false;
    let isTouched = false;
    let hasError: ValidationErr | null;

    const validate = (value: string | number) => {
        if (typeof (props.validators) === 'object') {
            for (let validator of props.validators) {
                hasError = validator(value);
                if (hasError) {
                    break;
                }
            }
        } else if (typeof (props.validators) === 'function') {
            hasError = props.validators(value);
        } else {
            hasError = null;
        }
        isValid = !hasError;
    }

    const inputChangeHandler = (value: string | number) => {
        if (!isTouched)
            isTouched = true;
        validate(value);
        if (props.onAppInputChange)
            props.onAppInputChange(value, isValid, isTouched, hasError);

    }
    const inputBlurHandler = (value: string | number) => {
        validate(value);
        if (props.onAppInputBlur)
            props.onAppInputBlur(value, isValid, isTouched, hasError);
    }
    return (
        <div className="form-control">
            <label htmlFor={props.label}>
                {props.label}
            </label>
            <input
                id={props.label}
                value={props.inputValue}
                type={props.appInputType}
                onChange={(evt) => inputChangeHandler(evt.target.value)}
                onBlur={(evt) => inputBlurHandler(evt.target.value)}
            ></input>
        </div>
    )
}

export default AppInput;

type AppInputValueTypes = string | number;

type ValidatorsTypes = Function | Function[];

interface AppInputProps {
    label: string;
    inputValue?: AppInputValueTypes;
    appInputType?: string;
    validators?: ValidatorsTypes;
    onAppInputBlur?: Function;
    onAppInputChange?: Function;

}