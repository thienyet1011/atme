import React from "react";

const About = React.memo(() => {
    return (
      <React.Fragment>
        <h2 className="uppercase">ATME VIỆT NAM</h2>

        <div className="mb-40">
          <div className="company-info">
            <div className="company-info-text">
              <p>
                Công ty TNHH MTV Thương mại điện tử ATME Việt Nam là một doanh
                nghiệp trẻ, năng động với những thành viên đam mê và đầy sáng
                tạo, nhiệt huyết.
              </p>

              <p>
                Với mục tiêu trở thành công ty cung cấp các dịch vụ điện tử tốt
                nhất trên toàn quốc, ATME Việt Nam sẽ nỗ lực hết mình để trở
                thành một thương hiệu được tất cả khách hàng tin tưởng.
              </p>

              <p>&nbsp;</p>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
});

export default About;
