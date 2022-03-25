import React from "react";
import { Button, Spinner } from "react-bootstrap";
import clsx from "clsx";

import styles from "./styles/Button.module.css";

interface SubmitButtonProps {
  disabled: boolean;
  label: string;
  loading: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = React.memo(
  ({
    disabled,
    label,
    loading,
  }: SubmitButtonProps) => {
    return (
      <Button
        type="submit"
        className={clsx("btn btn-primary pull-right", styles.button)}
        variant="warning"
        disabled={disabled}
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

        {loading ? "Loading..." : label}
      </Button>
    );
  }
);

export default SubmitButton;
