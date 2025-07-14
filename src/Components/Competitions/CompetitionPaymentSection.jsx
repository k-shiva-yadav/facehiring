import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import './CompetitionPaymentSection.css';

const paymentIcons = {
  visa: 'https://img.icons8.com/color/48/000000/visa.png',
  mastercard: 'https://img.icons8.com/color/48/000000/mastercard.png',
  netbanking: 'https://img.icons8.com/color/48/000000/online-payment-with-a-credit-card.png',
  rupay: 'https://img.icons8.com/color/48/000000/rupay.png',
  paypal: 'https://img.icons8.com/color/48/000000/paypal.png',
  amex: 'https://img.icons8.com/color/48/000000/american-express.png',
  upi: 'https://img.icons8.com/color/48/000000/bhim-upi.png',
  razorpay: 'https://razorpay.com/assets/images/logo-dark.svg' // Note: This is a dark logo, might need styling
};

const CompetitionPaymentSection = ({ competition, onBack }) => {
  const price = competition && competition.price ? competition.price : 499;
  const navigate = useNavigate();
  return (
    <>
    <div className="my-payment-container">
      <Container fluid>
      <div className='competition-details-inner-container'>
    <div className="competition-payment-section">
      <div className="team-header">
        <img src={competition.logo} alt="Logo" className="team-logo" />
        <h2 className="team-title">{competition.title}</h2>
      </div>
      <div className="team-tab">Payment</div>
      <div className="payment-content">
        <h3>Amount summary</h3>
        <div className="payment-summary">
          <div className="amount-summary-box">Total Due (Round Off): <b>₹{price}</b></div>
          <button className="payment-btn" onClick={() => navigate('/competition/progress')}>
            Confirm and pay
          </button>
        </div>
        <div className="payment-icons-row">
          <img src={paymentIcons.visa} alt="VISA" />
          <img src={paymentIcons.mastercard} alt="MasterCard" />
          <img src={paymentIcons.netbanking} alt="NetBanking" />
          <img src={paymentIcons.rupay} alt="RuPay" />
          <img src={paymentIcons.paypal} alt="PayPal" />
          <img src={paymentIcons.amex} alt="AmEx" />
          <img src={paymentIcons.upi} alt="UPI" />
        </div>
        <div className="secure-badge">
           <img src="https://img.icons8.com/ios-filled/24/4CAF50/security-shield-green.png" alt="secure" />
          <span>Secured by <b style={{ fontWeight: 700 }}>Razorpay</b></span>
        </div>
      </div>
    </div>

    </div>
      </Container>
    </div>
    </>
  );
};

export default CompetitionPaymentSection; 