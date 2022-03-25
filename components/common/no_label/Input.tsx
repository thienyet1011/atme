import React from "react";

interface InputProps {
  id: string,
  ref: React.MutableRefObject<any>,
  name: string,
  placeholder?: string,
  value?: string,
  data_required_error?: string,
  type: string,
  onChange: () => void,
  readonly?: boolean,
  required?: boolean,
  control_container_class_name: string
};

const Input: React.FC<InputProps> = React.memo(
  ({
    id,
    ref,
    name,
    placeholder,
    value,
    data_required_error,
    type,
    onChange,
    readonly,
    required,
    control_container_class_name
  }: InputProps) => {
    return (
      <div className={control_container_class_name}>
        <input
          id={id}
          ref={ref}
          type={type}
          name={name}
          placeholder={placeholder}
          className="form-control"
          data-required-error={data_required_error}
          value={value}
          readOnly={readonly}
          required={required}
          onChange={onChange}
        />
        {required && (
          <span
            className="glyphicon form-control-feedback"
            aria-hidden="true"
          ></span>
        )}

        {required && <div className="help-block with-errors"></div>}
      </div>
    );
  }
);

Input.defaultProps = {
  type: "text",
  readonly: false,
  required: false
};

export default Input;
