import React from 'react';
import { Result } from 'antd';
import { Link } from 'react-router-dom';
import { SuccessProps } from '../types/type';

const Successfully: React.FC<SuccessProps> = ({ modalStatus, title, link }) => {
    return (
        <div className='successfully_modal'>
            <Result status={modalStatus} title={title}
                extra={
                    [
                        <Link to={link}>Davolashlar ro'yhatiga qaytish</Link>,
                    ]
                }
            />
        </div>
    );
}

export default Successfully;