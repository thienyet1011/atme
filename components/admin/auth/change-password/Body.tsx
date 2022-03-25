import React, { useRef } from "react";
import { Button, Spinner } from "react-bootstrap";
import { Formik, FormikProps } from "formik";

import * as yup from "yup";

import Input from "@components/common/label/Input";

let schema = yup.object().shape({
  old_password: yup.string().required("[Old Pasword] field is required!"),
  new_password: yup.string().required("[New Password] field is required!"),
  match_password: yup
    .string()
    .oneOf(
      [yup.ref("new_password"), null],
      "Password confirmation must match!"
    ),
});

export interface FormValues {
  old_password: string;
  new_password: string;
  match_password: string;
}

interface BodyProps {
  loading?: boolean;
  onSubmit: (values: FormValues) => void;
}

const Body: React.FC<BodyProps> = React.memo(
  ({ loading, onSubmit }: BodyProps) => {
    const oldPasswordRef = useRef<HTMLInputElement>(null);
    const newPasswordRef = useRef<HTMLInputElement>(null);
    const matchPasswordRef = useRef<HTMLInputElement>(null);

    const submitCallback = async (values: FormValues) => {
      onSubmit(values);
    };

    return (
      <div className="panel-body">
        <Formik
          initialValues={{
            old_password: "",
            new_password: "",
            match_password: "",
          }}
          validationSchema={schema}
          onSubmit={async (values, { resetForm }) => {
            await submitCallback(values);
            resetForm();
          }}
        >
          {({
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }: FormikProps<FormValues>) => {
            return (
              <form onSubmit={handleSubmit} noValidate>
                <Input
                  id="old_password"
                  ref={oldPasswordRef}
                  placeholder="*********************"
                  name="old_password"
                  type="password"
                  readonly={loading}
                  touched={touched.old_password}
                  error={errors.old_password}
                  label="Mật khẩu cũ"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  container_class_name="form-group row"
                  control_container_class_name="col-md-12"
                  label_class_name="col-md-12 col-form-label"
                />

                <Input
                  id="new_password"
                  ref={newPasswordRef}
                  placeholder="*********************"
                  name="new_password"
                  type="password"
                  readonly={loading}
                  touched={touched.new_password}
                  error={errors.new_password}
                  label="Mật khẩu mới"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  container_class_name="form-group row"
                  control_container_class_name="col-md-12"
                  label_class_name="col-md-12 col-form-label"
                />

                <Input
                  id="match_password"
                  ref={matchPasswordRef}
                  placeholder="*********************"
                  name="match_password"
                  type="password"
                  readonly={loading}
                  touched={touched.match_password}
                  error={errors.match_password}
                  label="Xác nhận mật khẩu"
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
                      minWidth: "100px",
                      fontWeight: 600,
                      color: "rgba(0, 0, 0, 0.7)",
                      backgroundColor: "#fec52d",
                      borderColor: "#d39e00",
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

                    {loading ? "Loading..." : "Change now"}
                  </Button>
                </div>
              </form>
            );
          }}
        </Formik>
      </div>
    );
  }
);

Body.defaultProps = {
  loading: false,
};

export default Body;
