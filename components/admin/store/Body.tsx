import React, { useRef, useState } from "react";
import { Form, FormikProvider, useFormik } from "formik";

import * as yup from "yup";

import Editor from "@components/common/label/Editor";
import Input from "@components/common/label/Input";
import Button from "@components/common/label/Button";
import Uploader, { PhotoProps } from "@components/common/label/Uploader";

const schema = yup.object().shape({
  title: yup.string().required("[Name] field is required!"),
  slogan: yup.string().required("[Slogan] field is required!"),
  address: yup.string().required("[Address] field is required!"),
  email: yup
    .string()
    .email("The email address you entered is not valid!")
    .required("[Email] field is required!"),
  mobile: yup
    .string()
    .matches(/([0-9]{3})[-]{1}([0-9]{3}[-]{1}([0-9]{4}))/, {
      message: "The phone you entered is not valid!",
    })
    .required("[Phone] field is required!"),
  description: yup.string().required("[Description] field is required!"),
  photo: yup.string().required("[Logo] field is required!"),
});

export interface FormValues {
  title: string;
  slogan: string;
  address: string;
  email: string;
  mobile: string;
  description: string;
  photo: string;
}

interface BodyProps {
  loading?: boolean;
  onSubmit: (values: FormValues) => void;
}

const Body: React.FC<BodyProps> = React.memo(
  ({ loading, onSubmit }: BodyProps) => {
    const titleRef = useRef<HTMLInputElement>(null);
    const sloganRef = useRef<HTMLInputElement>(null);
    const addressRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const mobileRef = useRef<HTMLInputElement>(null);

    const [photos, setPhotos] = useState<PhotoProps[]>([]);
    
    const initialValues={
      title: "",
      slogan: "",
      address: "",
      email: "",
      mobile: "",
      description: "",
      photo: "",
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
              id="title"
              ref={titleRef}
              placeholder="B???n vui l??ng nh???p t??n c???a h??ng"
              name="title"
              type="text"
              readonly={loading}
              touched={formik.touched.title}
              error={formik.errors.title}
              label="C???a h??ng (*)"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              container_class_name="form-group row"
              control_container_class_name="col-md-12"
              label_class_name="col-md-12 col-form-label"
            />

            <Input
              id="slogan"
              ref={sloganRef}
              placeholder="B???n vui l??ng nh???p slogan"
              name="slogan"
              type="text"
              readonly={loading}
              touched={formik.touched.slogan}
              error={formik.errors.slogan}
              label="Slogan (*)"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              container_class_name="form-group row"
              control_container_class_name="col-md-12"
              label_class_name="col-md-12 col-form-label"
            />

            <Input
              id="address"
              ref={addressRef}
              placeholder="B???n vui l??ng nh???p ?????a ch??? c???a h??ng"
              name="address"
              type="text"
              readonly={loading}
              touched={formik.touched.address}
              error={formik.errors.address}
              label="?????a ch??? (*)"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              container_class_name="form-group row"
              control_container_class_name="col-md-12"
              label_class_name="col-md-12 col-form-label"
            />

            <Input
              id="email"
              ref={emailRef}
              placeholder="B???n vui l??ng nh???p t??i kho???n email (eg: admin@covid.com)"
              name="email"
              type="text"
              readonly={loading}
              touched={formik.touched.email}
              error={formik.errors.email}
              label="Email (*)"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              container_class_name="form-group row"
              control_container_class_name="col-md-12"
              label_class_name="col-md-12 col-form-label"
            />

            <Input
              id="mobile"
              ref={mobileRef}
              placeholder="B???n vui l??ng nh???p s??? ??i???n tho???i (eg:098-625-6321)"
              name="mobile"
              type="text"
              readonly={loading}
              touched={formik.touched.mobile}
              error={formik.errors.mobile}
              label="S??? ??i???n tho???i"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              container_class_name="form-group row"
              control_container_class_name="col-md-12"
              label_class_name="col-md-12 col-form-label"
            />

            <Editor
              id="description"
              readonly={loading}
              touched={formik.touched.description}
              error={formik.errors.description}
              label="M?? t??? (*)"
              onChange={(event, editor) => {
                console.log("data: ", editor.getData());
                formik.setFieldValue("description", editor.getData());
              }}
              container_class_name="form-group row"
              control_container_class_name="col-md-12"
              label_class_name="col-md-12 col-form-label"
            />

            <Uploader
              readonly={loading}
              maxFiles={1}
              multiple={false}
              touched={formik.touched.photo}
              error={formik.errors.photo}
              label="Ch???n logo c???a h??ng"
              photos={photos}
              setPhotos={(photos: PhotoProps[]) => {
                if (photos.length > 0)
                  formik.setFieldValue("photo", photos[0].name);
                else formik.setFieldValue("photo", "");

                setPhotos(photos);
              }}
              container_class_name="form-group row"
              control_container_class_name="col-md-12"
            />

            <div className="mt-4">
              <Button
                disabled={loading}
                label="L??u th??ng tin"
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
