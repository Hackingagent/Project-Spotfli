import React, { useState } from "react";
import axios from 'axios';
import './Payment.css';

const Payment = () => {
    const [number, setNumber] = useState('');
    const [amount] = useState('2'); // Set the amount here or make it dynamic
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (event) => {
        const value = event.target.value;
        // Allow only digits
        if (/^\d*$/.test(value)) {
            setNumber(value);
        }
    };

    const handlePayment = async () => {
        setLoading(true);
        setError(null);

        // Prepend '237' to the phone number
        const phoneNumber = `237${number.replace(/^237/, '')}`; // Remove any existing '237' before prepending

        // Validate phone number length (Cameroon numbers are usually 9 digits after the country code)
        if (number.length !== 9) {
            setError('Please enter a valid phone number (9 digits after country code).');
            setLoading(false);
            return;
        }

        const data = JSON.stringify({
            amount: amount,
            from: phoneNumber,
            description: "Test",
            external_reference: ""
        });

        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://demo.campay.net/api/collect/',
            headers: {
                'Authorization': 'Token e3209039b0163470526c713039b51b8016074b48',
                'Content-Type': 'application/json'
            },
            data: data
        };

        try {
            const response = await axios(config);
            console.log(JSON.stringify(response.data));

            // Poll for transaction status
            const transactionReference = response.data.reference;
            await pollTransactionStatus(transactionReference);

        } catch (error) {
            console.log(error);
            setError('Payment failed. Please try again.');
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
                'Authorization': 'Token e3209039b0163470526c713039b51b8016074b48',
                'Content-Type': 'application/json'
            }
        };

        let isApproved = false;

        // Poll every 2 seconds
        while (!isApproved) {
            try {
                const response = await axios(config);
                console.log(JSON.stringify(response.data));

                if (response.data.status === 'SUCCESSFUL') {
                    isApproved = true;
                    // Handle approved transaction (e.g., show success message)
                } else if (response.data.status === 'FAILED') {
                    setError('Transaction failed.');
                    break;
                }
            } catch (error) {
                console.log(error);
                setError('Error checking transaction status.');
                break;
            }

            // Wait for 2 seconds before the next check
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    };

    return (
        <>
            <div className="payment-container">
                <div className="main">
                    <div className="head">
                        <h1>Booking Fee</h1>
                        <span>X</span>
                    </div>
                    <div className="body">
                        <div className="input">
                            <label>Enter Phone Number to make payment</label>
                            <input 
                                name="number"
                                value={number}
                                onChange={handleChange}
                                placeholder="Phone number (9 digits)"
                            />
                        </div>
                        <button onClick={handlePayment} disabled={loading}>
                            {loading ? 'Processing...' : 'Pay'}
                        </button>
                        {error && <div className="error">{error}</div>}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Payment;