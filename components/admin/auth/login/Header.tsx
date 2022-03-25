import React from 'react';

export default React.memo(() => {
    return (
        <div className="panel-heading">
            <div className="view-header">
                <div className="header-icon">
                    <i className="pe-7s-unlock"></i>
                </div>
                <div className="header-title">
                    <h3>Login</h3>
                    <small>
                        <strong>
                            &nbsp;Vui lòng sử dụng tài khoản của bạn để truy cập vào
                            hệ thống.
                        </strong>
                    </small>
                </div>
            </div>
        </div>
    )
});