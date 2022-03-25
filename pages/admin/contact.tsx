import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";

import { GetStaticProps } from "next";
import { Container, Row, Col, Spinner } from "react-bootstrap";

import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useRouter } from "next/router";

import axios from "axios";

// import { loginUser } from "../../../../actions/auth.action";
import { RootState } from "store";

import Body, { FormValues } from "@components/admin/contact/Body";
import Data from "@components/admin/contact/Data";
import Layout from "@components/layout/admin";
import SideBar from "@components/layout/components/SideBar";
import ToastX, { MessageProps, Variants } from "@components/common/ToastX";

import { ATME_APP_TITLE } from "../../config";

let source = axios.CancelToken.source();

export interface ContactProps {}

const Contact = ({}: ContactProps) => {
  const dispatch = useDispatch();

  const errors = useSelector((state: RootState) => state.errors, shallowEqual);
  const auth = useSelector((state: RootState) => state.auth, shallowEqual);

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<MessageProps>({
    message: "",
    variant: Variants.Error,
    show: false,
  });

  const router = useRouter();

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      if (errors.message) {
        setToast({
          message: errors.message,
          variant: Variants.Error,
          show: true,
        });
      }
    }

    return () => {
      if (source) source.cancel();
    };
  }, [errors]);

  const onClose = () => {
    setToast({
      message: "",
      variant: Variants.None,
      show: false,
    });
  };

  const onSubmit = async (values: FormValues) => {
    const params = {
      ...values,
      cancelToken: source.token,
    };

    console.log("params: ", params);

    setLoading(true);
    // await dispatch(loginUser(params));
    setLoading(false);
  };

  return (
    <React.Fragment>
      <div
        className={`loading-overlay, ${
          router.isFallback ? "d-block" : "d-none"
        }`}
      >
        <Spinner className="spinner-md" animation="border" variant="warning" />
      </div>

      <Layout>
        <div id="render-body">
          <Container fluid>
            <Row>
              <Col md={4} lg={3} xl={2}
                className="left-sidebar d-none d-md-block"
              >
                <SideBar />
              </Col>

              <Col xs={12} md={8} lg={6} xl={8}
                className="section-content"
              >
                <div className="margin-vertical-50">
                  <Data />
                </div>
              </Col>

              <Col xs={12} md={12} lg={3} xl={2}
                className="margin-vertical-50"
              >
                <Body loading={loading} onSubmit={onSubmit} />
              </Col>
            </Row>

            {toast.show && (
              <ToastX
                message={toast.message}
                variant={toast.variant}
                show={toast.show}
                onClose={onClose}
              />
            )}
          </Container>
        </div>
      </Layout>
    </React.Fragment>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  return {
    props: {},
    revalidate: 20,
  };
};

export default Contact;
