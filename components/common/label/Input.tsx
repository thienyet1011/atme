import React from "react";
import styles from "./styles/Input.module.css";

interface InputProps {
  id: string;
  name: string;
  placeholder?: string;
  label: string;
  value?: string;
  data_required_error?: string;
  type: string;
  onBlur?: React.FocusEventHandler<HTMLInputElement> | undefined;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  readonly?: boolean;
  required?: boolean;
  touched?: boolean,
  error?: string,
  container_class_name: string;
  control_container_class_name: string;
  label_class_name?: string;
}

const Input: React.ForwardRefExoticComponent<
  InputProps & React.RefAttributes<HTMLInputElement>
> = React.memo(React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      name,
      placeholder,
      label,
      value,
      data_required_error,
      type,
      onBlur,
      onChange,
      readonly,
      required,
      touched,
      error,
      container_class_name,
      control_container_class_name,
      label_class_name,
    }: InputProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <div className={container_class_name}>
        <label htmlFor={id} className={label_class_name}>
          {label}
        </label>

        <div className={control_container_class_name}>
          <input
            id={id}
            ref={ref}
            type={type}
            name={name}
            placeholder={placeholder}
            className={`form-control ${error ? styles.hasError : ""}`}
            data-required-error={data_required_error}
            value={value}
            readOnly={readonly}
            required={required}
            onBlur={onBlur}
            onChange={onChange}
          />
          {touched && error && (
            <React.Fragment>
              <span
                className="glyphicon form-control-feedback"
                aria-hidden="true"/>
              <div className={styles.withError}>{error}</div>
            </React.Fragment>
          )}
        </div>
      </div>
    );
  }
));

Input.defaultProps = {
  type: "text",
  readonly: false,
  required: false,
  touched: false,
  error: null
};

export default Input;
