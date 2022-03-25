import React, { useRef, useState } from "react";
import { Form, FormikProvider, useFormik } from "formik";

import * as yup from "yup";

import Button from "@components/common/label/Button";
import Input from "@components/common/label/Input";
import Textarea from "@components/common/label/Textarea";

const schema = yup.object().shape({
  name: yup.string(),
  email: yup.string().email("The email address you entered is not valid!"),
  mobile: yup.string(),
  description: yup.string(),
  status: yup.number(),
});

export interface FormValues {
  name: string;
  mobile: string;
  email: string;
  description: string;
  status: number;
}

interface BodyProps {
  loading?: boolean;
  onSubmit: (values: FormValues) => void;
}

const Body: React.FC<BodyProps> = React.memo(
  ({ loading, onSubmit }: BodyProps) => {
    const nameRef = useRef<HTMLInputElement>(null);
    const mobileRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    
    const initialValues={
      name: "",
      mobile: "",
      email: "",
      description: "",
      status: 0,
    };

    const submitCallback = (values: FormValues) => {
      onSubmit(values);
    };

    const formik = useFormik({
      initialValues,
      onSubmit: (values: FormValues, { resetForm }) => {
        submitCallback(values);
        resetForm();
      },
      validationSchema: schema
    });

    return (
      <div className="panel-body">
        <FormikProvider value={formik}>
          <Form>
            <Input
              id="name"
              ref={nameRef}
              placeholder="Bạn vui lòng nhập họ tên"
              name="name"
              type="text"
              readonly={true}
              touched={formik.touched.name}
              error={formik.errors.name}
              label="Họ tên (*)"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              container_class_name="form-group row"
              control_container_class_name="col-md-12"
              label_class_name="col-md-12 col-form-label"
            />

            <Input
              id="mobile"
              ref={mobileRef}
              placeholder="Bạn vui lòng nhập số điện thoại (eg:098-625-6321)"
              name="mobile"
              type="text"
              readonly={true}
              touched={formik.touched.mobile}
              error={formik.errors.mobile}
              label="Số điện thoại"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              container_class_name="form-group row"
              control_container_class_name="col-md-12"
              label_class_name="col-md-12 col-form-label"
            />

            <Input
              id="email"
              ref={emailRef}
              placeholder="Bạn vui lòng nhập tài khoản email (eg: admin@covid.com)"
              name="email"
              type="text"
              readonly={true}
              touched={formik.touched.email}
              error={formik.errors.email}
              label="Email (*)"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              container_class_name="form-group row"
              control_container_class_name="col-md-12"
              label_class_name="col-md-12 col-form-label"
            />

            <Textarea
              id="description"
              ref={descriptionRef}
              placeholder="Bạn vui lòng nhập nội dung"
              name="content"  
              readonly={true}
              touched={formik.touched.description}
              error={formik.errors.description}
              label="Nội dung (*)"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              container_class_name="form-group row"
              control_container_class_name="col-md-12"
              label_class_name="col-md-12 col-form-label"
            />

            <div className="mt-4">
              <Button
                disabled={loading}
                label="Lưu thông tin"
                loading={loading}
              />
            </div>
          </Form>
        </FormikProvider>
      </div>
    );
  }
);

Body.defaultProps = {
  loading: false,
};

export default Body;
