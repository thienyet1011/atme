import React from "react";
import styles from "./styles/Textarea.module.css";

interface TextareaProps {
  id: string;
  name: string;
  placeholder?: string;
  label: string;
  value?: string;
  rows?: number;
  data_required_error?: string;
  onBlur?: React.FocusEventHandler<HTMLTextAreaElement> | undefined;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement> | undefined;
  readonly?: boolean;
  required?: boolean;
  touched?: boolean,
  error?: string,
  container_class_name: string;
  control_container_class_name: string;
  label_class_name?: string;
}

const Textarea: React.ForwardRefExoticComponent<
TextareaProps & React.RefAttributes<HTMLTextAreaElement>
> = React.memo(React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      id,
      name,
      placeholder,
      label,
      value,
      rows,
      data_required_error,
      onBlur,
      onChange,
      readonly,
      required,
      touched,
      error,
      container_class_name,
      control_container_class_name,
      label_class_name,
    }: TextareaProps,
    ref: React.ForwardedRef<HTMLTextAreaElement>
  ) => {
    return (
      <div className={container_class_name}>
        <label htmlFor={id} className={label_class_name}>
          {label}
        </label>

        <div className={control_container_class_name}>
          <textarea
            id={id}
            ref={ref}
            name={name}
            placeholder={placeholder}
            rows={rows}
            className={`form-control ${error ? styles.hasError : ""}`}
            data-required-error={data_required_error}
            readOnly={readonly}
            required={required}
            onBlur={onBlur}
            onChange={onChange}
          >{value}</textarea>
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

Textarea.defaultProps = {
  readonly: false,
  required: false,
  rows: 5,
  touched: false,
  error: null
};

export default Textarea;
