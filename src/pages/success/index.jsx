import { Button, Result } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function SuccessPage() {
  const navigate = useNavigate()
  return (
    <div>
        <Result
            status="success"
            title="Successfully Booked your POD!"
            subTitle="Do you want to book another POD ?"
            extra={[
            <Button type="primary" key="console" onClick={() => navigate('/')}>
                Home Page
            </Button>,
            <Button key="buy" onClick={() => navigate('/shop')}>Book Again</Button>,
            ]}
        />
    </div>
  )
}

export default SuccessPage