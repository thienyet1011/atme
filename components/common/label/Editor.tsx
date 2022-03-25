import React, { useEffect, useState } from "react";
import styles from "./styles/Editor.module.css";

const toolbar = [
  "heading", "|", "bold", "italic", "underline", "bulletedList", "numberedList", "todoList", "strikethrough", "subscript", "superscript", "blockQuote", "|", 
  "alignment", "outdent", "indent", "link", "code", "codeBlock", "htmlEmbed",
  "horizontalLine", "fontColor", "fontFamily", "fontsize", "specialCharacters", "uploadImage", "insertTable", "mediaEmbed", "undo", "redo",
];

interface EditorProps {
  id: string;
  label: string;
  value?: string;
  onBlur?: (event: any, editor: any) => void | undefined;
  onChange?: (event: any, editor: any) => void | undefined;
  readonly?: boolean;
  touched?: boolean;
  error?: string;
  container_class_name: string;
  control_container_class_name: string;
  label_class_name?: string;
}

const Editor: React.ForwardRefExoticComponent<
EditorProps & React.RefAttributes<HTMLTextAreaElement>
> = React.memo(
  React.forwardRef<HTMLTextAreaElement, EditorProps>(
    (
      {
        id,
        label,
        value,
        onBlur,
        onChange,
        readonly,
        touched,
        error,
        container_class_name,
        control_container_class_name,
        label_class_name,
      }: EditorProps,
      ref: React.ForwardedRef<HTMLTextAreaElement>
    ) => {
      const [editor, setEditor] = useState<{ CKEditor: any; ClassicEditor: any }>({CKEditor: null, ClassicEditor: null});
      const { CKEditor, ClassicEditor } = editor || {};

      useEffect(() => {
        setEditor({
          CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
          ClassicEditor: require("../../../lib/ckeditor5/build/ckeditor"),
        });
      }, []);

      return (
        <div className={container_class_name}>
          <label htmlFor={id} className={label_class_name}>
            {label}
          </label>

          <div className={control_container_class_name}>
            {editor.CKEditor && (
              <CKEditor
                id="description"
                config={{
                  ckfinder: {
                    options: {
                      resizeImages: true, // ['small', 'medium']
                      resourceType: "Images",
                    },
                    uploadUrl: "/api/uploads",
                  },
                  toolbar: {
                    items: toolbar,
                    shouldNotGroupWhenFull: true,
                  },
                }}
                data={value}
                disable={readonly}
                editor={ClassicEditor}
                onChange={onChange}
              />
            )}
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

Editor.defaultProps = {
  readonly: false,
  touched: false,
  error: null,
};

export default Editor;
