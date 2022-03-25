import React from "react";

const Footer = React.memo(() => (
  <footer>
    <div className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center mb-40">
            <div className="center">
              Công ty TNHH MTV Thương mại điện tử ATME Việt Nam
            </div>
            <div className="center">Phân phối - Thi công - Sửa chữa</div>

            <div className="center">&nbsp;</div>
          </div>

          <div className="col-md-4">
            <div className="container-fluid">
              <div className="row" data-container="container">
                <div className="col-xs-3">
                  <span className="fa"></span>
                </div>

                <div className="col-xs-9 widget-container">
                  <div>
                    <p className="widget-header">Address</p>
                    <p className="widget-body">Nha Trang, Khánh Hòa</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4 col-center">
            <div className="container-fluid">
              <div className="row" data-container="container">
                <div className="col-xs-3">
                  <span className="fa"></span>
                </div>
                <div className="col-xs-9 widget-container">
                  <div>
                    <p className="widget-header">Phone</p>
                    <p className="widget-body">
                      <a href="tel:0983 383 283">0983 383 283</a>
                      <br />
                      <a>thu.vo.lhu@gmail.com</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="container-fluid">
              <div className="row">
                <div className="col-xs-3">
                  <span className="fa fa-dribbble"></span>
                </div>
                <div className="col-xs-9 widget-container">
                  <div>
                    <p className="widget-header">Social Network</p>

                    <p className="widget-body"></p>
                    <div className="social-footer">
                      <a
                        href="https://www.facebook.com/thu.vo.lhu"
                        title="Facebook"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <span>
                          <i className="fa fa-facebook"></i>
                        </span>
                      </a>
                      <a
                        href="https://twitter.com/amte.vn"
                        title="Twitter"
                        target="_blank"
                        className=""
                        rel="noreferrer"
                      >
                        <span>
                          <i className="fa fa-twitter"></i>
                        </span>
                      </a>
                      <a
                        href="https://www.linkedin.com/amte.vn"
                        title="Linkedin"
                        target="_blank"
                        className=""
                        rel="noreferrer"
                      >
                        <span>
                          <i className="fa fa-linkedin"></i>
                        </span>
                      </a>
                    </div>
                    <p></p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="clearMe"></div>
        </div>

        <div className="row copyright-info">
          <div className="col-12">
            <div>Bản quyền thuộc về ATME Vi&#xEA;&#x323;t Nam</div>{" "}
            <div className="originator">
              {" "}
              Designed by{" "}
              <a
                href="https://guviet.vn/"
                title="Đơn vị thiết kế website hiện đại - nhanh - đơn giản | www.guviet.vn"
                target="blank"
              >
                Gu Việt
              </a>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
));

export default Footer;
