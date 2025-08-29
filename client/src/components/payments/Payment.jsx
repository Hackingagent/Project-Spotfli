import React, { useState } from "react";
import momoLogo from '../../assets/MTN_Mobile_money.jpg'
import omLogo from '../../assets/Orange money.png'

import axios from 'axios';
import './Payment.css';

const Payment = ({ onClose, handleSubmit }) => {
    const [number, setNumber] = useState('');
    const [amount] = useState('2');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [paymentRequestSent, setPaymentRequestSent] = useState(false);

    const handleChange = (event) => {
        const value = event.target.value;
        if (/^\d*$/.test(value)) {
            setNumber(value);
        }
    };

    const handlePayment = async () => {
        setLoading(true);
        setError(null);
        setPaymentRequestSent(false);

        const phoneNumber = `237${number.replace(/^237/, '')}`;

        if (number.length !== 9) {
            setError('Please enter a valid phone number (9 digits after country code).');
            setLoading(false);
            return;
        }

        const data = JSON.stringify({
            amount: amount,
            from: phoneNumber,
            description: "Booking Payment",
            external_reference: ""
        });

        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://demo.campay.net/api/collect/',
            headers: {
                'Authorization': `Token ${import.meta.env.VITE_PAYMENT_API_TOKEN}`,
                'Content-Type': 'application/json'
            },
            data: data
        };

        try {
            const response = await axios(config);
            console.log(JSON.stringify(response.data));
            
            // Show the payment request sent message
            setPaymentRequestSent(true);
            
            const transactionReference = response.data.reference;
            await pollTransactionStatus(transactionReference);

        } catch (error) {
            console.log(error);
            setError('Payment failed. Please try again.');
            setPaymentRequestSent(false);
        } finally {
            setLoading(false);
        }
    };

    const pollTransactionStatus = async (reference) => {
        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `https://demo.campay.net/api/transaction/${reference}/`,
            headers: {
                'Authorization': `Token ${import.meta.env.VITE_PAYMENT_API_TOKEN}`,
                'Content-Type': 'application/json'
            }
        };

        let isApproved = false;

        while (!isApproved) {
            try {
                const response = await axios(config);
                console.log(JSON.stringify(response.data));

                if (response.data.status === 'SUCCESSFUL') {
                    isApproved = true;
                    await handleSubmit();
                    onClose();
                } else if (response.data.status === 'FAILED') {
                    setError('Transaction failed.');
                    setPaymentRequestSent(false);
                    break;
                }
            } catch (error) {
                console.log(error);
                setError('Error checking transaction status.');
                setPaymentRequestSent(false);
                break;
            }

            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    };

    return (
        <div className="payment-overlay">
            <div className="payment-modal">
                <div className="payment-header">
                    <h2>Complete Your Booking</h2>
                    <button className="close-btn" onClick={onClose}>
                        &times;
                    </button>
                </div>
                
                <div className="payment-content">
                    <div className="payment-amount">
                        <span className="amount-label">Total Amount</span>
                        <span className="amount-value">XAF {amount}.00</span>
                    </div>
                    
                    <div className="payment-methods">
                        <p className="methods-label">Select Payment Method</p>
                        <div className="method-logos">
                            <div className="method-logo active">
                                <img src={omLogo} />
                                <span>Orange Money</span>
                            </div>
                            <div className="method-logo">
                                <img src={momoLogo} alt="MTN Mobile Money" />
                                <span>MTN MoMo</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="payment-form">
                        <div className="input-group">
                            <label htmlFor="phone">Phone Number</label>
                            <div className="input-prefix">
                                <span>+237</span>
                                <input 
                                    type="text"
                                    id="phone"
                                    name="number"
                                    value={number}
                                    onChange={handleChange}
                                    placeholder="6XX XXX XXX"
                                    maxLength="9"
                                />
                            </div>
                        </div>
                        
                        <button 
                            className="pay-btn" 
                            onClick={handlePayment} 
                            disabled={loading || number.length !== 9}
                        >
                            {loading ? (
                                <>
                                    <div className="spinner"></div>
                                    Processing Payment...
                                </>
                            ) : (
                                `Pay XAF ${amount}.00`
                            )}
                        </button>
                        
                        {paymentRequestSent && (
                            <div className="payment-instruction">
                                <div className="instruction-icon">💡</div>
                                <p>Payment request sent! Please confirm with your PIN code or dial *126# to complete the transaction.</p>
                            </div>
                        )}
                        
                        {error && (
                            <div className="error-message">
                                <div className="error-icon">⚠️</div>
                                <p>{error}</p>
                            </div>
                        )}
                    </div>
                </div>
                
                <div className="payment-footer">
                    <p>Your payment is secure and encrypted</p>
                </div>
            </div>
        </div>
    );
}

export default Payment;