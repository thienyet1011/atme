import React from 'react';

export default React.memo(() => {
    return (
        <div className="panel-heading">
            <div className="view-header">
                <div className="header-icon">
                    <i className="pe-7s-unlock"></i>
                </div>
                <div className="header-title">
                    <h3>Forgot Password</h3>
                    <small>
                        <strong>
                            &nbsp;Vui lòng nhập tài khoản E-mail để đổi mật khẩu.
                        </strong>
                    </small>
                </div>
            </div>
        </div>
    )
});