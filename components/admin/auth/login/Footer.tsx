import React from 'react';
import styles from "../../../pages/admin/login/Login.module.css";

export default React.memo(() => {
    return (
        <div id="bottom_text">
            Chưa có tài khoản? <a style={{color: '#fec52d'}} href="#/">Đăng ký</a>
            <br />
            <a style={{color: '#fec52d'}} href="#/">Quên mật khẩu</a>
          </div>
    )
});