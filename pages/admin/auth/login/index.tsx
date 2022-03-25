import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useRouter } from "next/router";

import axios from "axios";

import { loginUser } from "../../../../actions/auth.action";
import { RootState } from "store";

import Header from "@components/admin/auth/login/Header";
import Body, { FormValues } from "@components/admin/auth/login/Body";
import Footer from "@components/admin/auth/login/Footer";
import ToastX, { MessageProps, Variants } from "@components/common/ToastX";

import { ATME_APP_TITLE } from "../../../../config";

let source = axios.CancelToken.source();

const Login = () => {
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
        if (auth.isAuth) {
            router.replace("/admin");
        }

        return () => {
            if (source) source.cancel();
        }
    }, [auth.isAuth]);

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

    console.log('params: ', params);    

    setLoading(true);
    // await dispatch(loginUser(params));
    setLoading(false);
  }

  return (
    <div className="login-wrapper">
      <div className="container">
        <div className="row"
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="col-sm-12 col-md-8 col-lg-6 col-xl-4">
            <Card>
              <Card.Header>
                <Header />
              </Card.Header>

              <Card.Body>
                <Body loading={loading} onSubmit={onSubmit} />
              </Card.Body>

              <Card.Footer>
                <Footer />
              </Card.Footer>
            </Card>

            <ToastX
              message={toast.message}
              variant={toast.variant}
              show={toast.show}
              onClose={onClose}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
