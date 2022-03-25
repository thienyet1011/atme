import React from "react";
import { Toast, ToastProps } from "react-bootstrap";

import { ATME_APP_TITLE } from "../../config";

export enum Variants {
    Success = "Success",
    Error = "Danger",
    Warning = "Warning",
    Info = "Light",
    None = "",
}

export interface MessageProps {
    message: string,
    variant: Variants,
    show: boolean,
};

interface ToastXProps extends ToastProps{
    closeButton?: boolean,
    title?: string,
    time?: string,
    message: string,
    variant: string,
};

const ToastX: React.FC<ToastXProps> = React.memo(
  ({
    autohide,
    closeButton,
    delay,
    message,
    show,
    title,
    time,
    variant,
    onClose,
  }: ToastXProps) => {
    return (
      <div
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: "relative",
          minHeight: "100px",
        }}
      >
        <Toast
          animation={false}
          autohide={autohide}
          delay={delay}
          show={show}
          className={`bg-${variant.toLowerCase()}`}
          onClose={onClose}
          style={{
            position: "absolute",
            top: 0,
            right: 0,
          }}
        >
          <Toast.Header closeButton={closeButton}>
            <strong className="me-auto">{title}</strong>
            {time && <small>{time}</small>}
          </Toast.Header>
          <Toast.Body className="text-white">{message}</Toast.Body>
        </Toast>
      </div>
    );
  }
);

ToastX.defaultProps = {
    autohide: true,
    closeButton: true,
    delay: 3000, // in ms
    title: ATME_APP_TITLE,
    time: null,
};

export default ToastX;
