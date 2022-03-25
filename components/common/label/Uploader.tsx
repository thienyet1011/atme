import React from "react";
import Dropzone from "react-dropzone";
import { AddAPhoto } from "@material-ui/icons";

import styles from "./styles/Uploader.module.css";
import { FormikErrors, FormikTouched } from "formik";

interface UploaderProps {
  accept?: string[];
  label: string;
  maxFiles?: number;
  maxSize?: number;
  multiple?: boolean;
  photos: PhotoProps[];
  setPhotos: (files: PhotoProps[]) => void;
  readonly?: boolean;
  touched?: boolean | FormikTouched<any> | FormikTouched<any>[];
  error?: string | string[] | FormikErrors<any> | FormikErrors<any>[];
  container_class_name: string;
  control_container_class_name: string;
}

export interface PhotoProps extends File {
  preview: string;
}

const Uploader: React.ForwardRefExoticComponent<
  UploaderProps & React.RefAttributes<HTMLTextAreaElement>
> = React.memo(
  React.forwardRef<HTMLTextAreaElement, UploaderProps>(
    (
      {
        label,
        photos,
        accept,
        maxFiles,
        maxSize,
        multiple,
        setPhotos,
        readonly,
        touched,
        error,
        container_class_name,
        control_container_class_name,
      }: UploaderProps,
      ref: React.ForwardedRef<HTMLTextAreaElement>
    ) => {
      const renderPhotos = (photos: PhotoProps[]) => {
        return photos.map((photo: PhotoProps, index: number) => {
          return (
            <div className="thumb" key={index}>
              <div className="thumb-inner">
                <img src={photo.preview} alt={photo.name} />
              </div>
            </div>
          );
        });
      };

      const onDrop = (acceptedFiles: File[]) => {
        const files = acceptedFiles.map((file: File) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );

        setPhotos(files);
      };

      return (
        <div className={container_class_name}>
          <div className={control_container_class_name}>
            {renderPhotos(photos)}

            <Dropzone
              accept={accept}
              disabled={readonly}
              maxFiles={maxFiles}
              maxSize={maxSize}
              multiple={multiple}
              onDrop={onDrop}
            >
              {({ getRootProps, getInputProps }) => (
                <div className="add-thumb">
                  <div
                    {...getRootProps({
                      className: "dropzone text-center",
                    })}
                  >
                    <input {...getInputProps()} />
                    <AddAPhoto style={{ fontSize: "2rem" }} />
                    <p>{label}</p>
                  </div>
                </div>
              )}
            </Dropzone>

            {touched && error && (
              <React.Fragment>
                <span
                  className="glyphicon form-control-feedback"
                  aria-hidden="true"
                />
                <div className={styles.withError}>{error}</div>
              </React.Fragment>
            )}
          </div>
        </div>
      );
    }
  )
);

Uploader.defaultProps = {
  accept: ["image/png", "image/jpeg"],
  maxFiles: 0,
  maxSize: 1 * 1024 * 1024,
  multiple: false,
};

export default Uploader;
