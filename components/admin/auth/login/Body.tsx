import React, { useRef } from "react";
import { Button, Spinner } from "react-bootstrap";
import { Formik, FormikProps } from "formik";

import * as yup from "yup";

import Input from "@components/common/label/Input";

let schema = yup.object().shape({
  email: yup.string().email("The email address you entered is not valid!").required("[Email] field is required!"),
  password: yup.string().required("[Password] field is required!"),
});

export interface FormValues {
  email: string,
  password: string,
};

interface BodyProps {
  loading?: boolean,
  onSubmit: (values: FormValues) => void;
};

const Body: React.FC<BodyProps> = React.memo(({ loading, onSubmit }: BodyProps) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const submitCallback = async (values: FormValues) => {
    onSubmit(values);
  }

  return (
    <div className="panel-body">
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={schema}
        onSubmit={async (values, { resetForm }) => {
          await submitCallback(values);
          resetForm();
        }}
      >
        {({ errors, touched, handleBlur, handleChange, handleSubmit }: FormikProps<FormValues>) => {          
          return (
            <form onSubmit={handleSubmit} noValidate>
              <Input
                id="email"
                ref={emailRef}
                placeholder="Bạn vui lòng nhập tài khoản email"
                name="email"
                type="text"
                readonly={loading}
                touched={touched.email}
                error={errors.email}
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                container_class_name="form-group row"
                control_container_class_name="col-md-12"
                label_class_name="col-md-12 col-form-label"
              />
  
              <Input
                id="password"
                ref={passwordRef}
                placeholder="*********************"
                name="password"
                type="password"
                readonly={loading}
                touched={touched.password}
                error={errors.password}
                label="Mật khẩu"
                onBlur={handleBlur}
                onChange={handleChange}
                container_class_name="form-group row"
                control_container_class_name="col-md-12"
                label_class_name="col-md-12 col-form-label"
              />
  
              <div>
                <Button
                  type="submit"
                  className="btn btn-primary pull-right"
                  style={{
                    minWidth: '100px',
                    fontWeight: 600,
                    color: 'rgba(0, 0, 0, 0.7)',
                    backgroundColor: '#fec52d',
                    borderColor: '#d39e00'
                  }}
                  variant="warning"
                  disabled={loading}
                >
                  {loading && (
                    <Spinner
                      as="span"
                      animation="grow"
                      variant="light"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  )}
  
                  {loading ? "Loading..." : "Login"}
                </Button>
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
});

Body.defaultProps = {
  loading: false,
};

export default Body;
