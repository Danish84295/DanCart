import React from 'react';

const textualStyle = {
  maxWidth: '900px',
  margin: '0 auto',
  padding: '40px',
  background: '#18181b',
  borderRadius: '16px',
  border: '1px solid rgba(255, 255, 255, 0.05)',
  lineHeight: '1.8',
  color: '#a1a1aa'
};

const Disclaimer = () => {
  return (
    <div style={textualStyle}>
      <h2
        style={{
          color: '#fff',
          marginBottom: '20px',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          paddingBottom: '15px'
        }}
      >
        Legal & Site Disclaimer
      </h2>

      <p style={{ marginBottom: '20px' }}>
        The data, interfaces, and graphical components represented across the DanCart
        platform strictly act as an educational development project. This codebase
        demonstrates modern full-stack application architecture and is intended solely
        for learning, portfolio, and demonstration purposes.
      </p>

      <h4 style={{ color: '#f97316', marginTop: '25px', marginBottom: '10px' }}>
        1. Accuracy of Materials
      </h4>
      <p style={{ marginBottom: '15px' }}>
        The materials displayed throughout the DanCart platform may include sample
        content, placeholder text, demo product information, and publicly available
        images. Products, prices, and descriptions are intended only for demonstration
        and may not represent real commercial offerings.
      </p>

      <h4 style={{ color: '#f97316', marginTop: '25px', marginBottom: '10px' }}>
        2. Payment Processing Restrictions
      </h4>
      <p style={{ marginBottom: '15px' }}>
        No real financial transactions are processed within this project. Payment
        functionality uses testing environments (such as Razorpay Sandbox) and is
        provided solely for educational purposes. No actual money is charged.
      </p>

      <h4 style={{ color: '#f97316', marginTop: '25px', marginBottom: '10px' }}>
        3. External Links
      </h4>
      <p style={{ marginBottom: '15px' }}>
        DanCart may include links to third-party websites, services, or publicly hosted
        resources. We are not responsible for the content, availability, or policies of
        these external platforms.
      </p>

      <p style={{ marginTop: '30px', fontStyle: 'italic', fontSize: '0.9rem' }}>
        By using DanCart, you acknowledge that this project is created for educational
        and portfolio purposes and agree to the terms outlined in this disclaimer.
      </p>
    </div>
  );
};

export default Disclaimer;