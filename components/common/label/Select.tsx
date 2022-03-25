import React from "react";
import Select, { OptionTypeBase } from "react-select";

import styles from "./styles/Input.module.css";

interface Select2Props {
  id: string;
  name: string;
  placeholder?: string;
  label: string;
  value?: OptionTypeBase;
  options?: OptionTypeBase[];
  data_required_error?: string;
  onBlur?: React.FocusEventHandler<HTMLInputElement> | undefined;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  clearable?: boolean;
  disabled?: boolean;
  searchable?: boolean;
  required?: boolean;
  touched?: boolean,
  error?: string,
  container_class_name: string;
  control_container_class_name: string;
  label_class_name?: string;
}

const Select2: React.FC<Select2Props> = React.memo((
  {
    id,
    name,
    placeholder,
    label,
    value,
    options,
    data_required_error,
    onBlur,
    onChange,
    clearable,
    disabled,
    searchable,
    required,
    touched,
    error,
    container_class_name,
    control_container_class_name,
    label_class_name,
  }: Select2Props) => {
    return (
      <div className={container_class_name}>
        <label htmlFor={id} className={label_class_name}>
          {label}
        </label>

        <div className={control_container_class_name}>
          <Select
            id={id}
            name={name}
            placeholder={placeholder}
            className={`form-control ${error ? styles.hasError : ""}`}
            data-required-error={data_required_error}
            defaultValue={value}
            isDisabled={disabled}
            isClearable={clearable}
            isSearchable={searchable}
            options={options}
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
);

Select2.defaultProps = {
  clearable: true,
  disabled: false,
  searchable: true,
  required: false,
  touched: false,
  error: null
};

export default Select2;
