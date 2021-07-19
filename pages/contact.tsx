import { useEffect } from "react";
import {
  Container,
  Form,
  FormGroup,
  FormControl,
  FormLabel,
  Row,
  Col,
} from "react-bootstrap";

import { useAppContext } from '../context';

import Layout from "../components/layout";

export default function Contact() {
  const { categories, setPage } = useAppContext();

  useEffect(() => {
    setPage(4);
  }, [setPage])

  return (
    <Layout categories={categories}>
      <Container fluid className="main-content">
        <Row>
          <Col
            md={12}
            lg={{ span: 10, offset: 1 }}
            className="main-content-container"
          >
            <div id="contact-us">
              <Form method="post" action="https://atme.vn/vi/Page/Contact">
                <Row className="contact-us-form">
                  <Col md={12} lg={7}>
                    <h3 className="company-name">ATME Việt Nam</h3>
                    <p className="company-info">
                      Địa chỉ: Nha Trang, Khánh Hòa
                      <br />
                      Số điện thoại: 0983 383 283
                      <br />
                      Email: thu.vo.lhu@gmail.com
                    </p>
                  </Col>

                  <Col md={12} lg={5}></Col>

                  <Col md={12} lg={7}>
                    <div className="location">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3899.0524098010396!2d109.17682521481447!3d12.244730691335686!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31705d82ff910419%3A0x6f727aeea6508d23!2zOCwgMyBIxrDGoW5nIMSQaeG7gW4sIFBoxrDhu5tjIEjhuqNpLCBUaMOgbmggcGjhu5EgTmhhIFRyYW5nLCBLaMOhbmggSMOyYSA2NTAwMDA!5e0!3m2!1svi!2s!4v1573197083713!5m2!1svi!2s"
                        width="600"
                        height="450"
                        frameBorder="0"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </Col>

                  <Col md={12} lg={5} className="main-form-container">
                    <div className="form-col">
                      <h4 className="form-row form-title">Liên hệ</h4>
                    </div>

                    <FormGroup  id="name">
                      <FormLabel>Họ tên:</FormLabel>
                      <FormControl
                        id="customerName"
                        name="customerName"
                        placeholder="Nhập họ tên của quý khách"
                        type="text"
                      />
                    </FormGroup>

                    <FormGroup id="phone">
                      <FormLabel>Điện thoại:</FormLabel>
                      <FormControl
                        id="customerPhoneNumber"
                        name="customerPhoneNumber"
                        placeholder="Nhập số điện thoại của quý khách"
                        type="text"
                      />
                    </FormGroup>

                    <FormGroup id="email">
                      <FormLabel>Email:</FormLabel>
                      <FormControl
                        id="customerEmail"
                        name="customerEmail"
                        placeholder="Nhập địa chỉ email của quý khách"
                        type="email"
                      />
                    </FormGroup>

                    <FormGroup id="description">
                      <FormLabel>Nội dung:</FormLabel>
                      <FormControl 
                        as="textarea"
                        id="txtContent-Contact-Us"
                        name="emailContent"
                        placeholder="Nội dung"
                      ></FormControl>
                    </FormGroup>

                    <div className="row row-btn">
                      <a>
                        <input
                          className="btn btn-view-more"
                          type="submit"
                          value="Gửi"
                        />
                      </a>
                    </div>
                  </Col>
                </Row>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}
