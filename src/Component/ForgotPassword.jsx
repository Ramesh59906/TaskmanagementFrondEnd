import React, { useState } from 'react';
import Axios from '../Axios/Axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const ForgotPassword = () => {
    const [step, setStep] = useState(1); // Step 1: Email input, Step 2: OTP, Step 3: Reset password
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState({ new_password: '', confirm_password: '' });
    const navigate = useNavigate();

    // Forgot Password Request
    const handleForgotPassword = async () => {
        if (!email) {
            toast.error("Email is required for password reset.");
            return;
        }

        try {
            await Axios.post('forgot-password/', { email });
            toast.success('OTP sent to your email.');
            // setStep(2); // Move to the next step (OTP verification)
        } catch (error) {
            toast.error('Failed to send OTP. Please try again.');
        }
    };

    // Verify OTP
    const handleVerifyOTP = async () => {
        if (!otp) {
            toast.error("OTP is required.");
            return;
        }

        try {
            await Axios.post('verify-otp/', { email, otp });
            toast.success('OTP verified. You can now reset your password.');
            setStep(3); // Move to the next step (Reset Password)
        } catch (error) {
            toast.error('Invalid OTP. Please try again.');
        }
    };

    // Reset Password
    const handleResetPassword = async () => {
        if (!newPassword.new_password || !newPassword.confirm_password) {
            toast.error("Both new password and confirm password are required.");
            return;
        }

        if (newPassword.new_password !== newPassword.confirm_password) {
            toast.error("Passwords don't match.");
            return;
        }

        try {
            await Axios.post('reset-password/', {
                email,
                new_password: newPassword.new_password,
                confirm_password: newPassword.confirm_password
            });
            toast.success('Password reset successful. Redirecting to login...');
            setTimeout(() => {
                navigate('/login'); // Redirect to login after password reset
            }, 2000);
        } catch (error) {
            toast.error('Failed to reset password. Please try again.');
        }
    };

    return (
        <div>
            <Container fluid style={{ backgroundColor: "#94ffee24", padding: "0px", margin: "0px" }}>
                <Row className="d-flex justify-content-around align-items-center">
                    <Col md={6} lg={6}>
                        <h1 className='text-black h1 p-2 rounded mt-2' style={{ fontStyle: "oblique", boxShadow: "2px 2px 2px white -2px -2px -2px white" }}>
                            kite<span style={{ fontStyle: "oblique" }} className='text-info rounded py-0 px-1'>C</span>areer
                        </h1>
                    </Col>
                    <Col md={6} lg={3}>
                        <button className='border px-5 py-2 bg-warning fw-bold text-white mx-2' style={{cursor:"pointer",borderRadius:"50px"}} onClick={() => navigate('/login')}>login</button>
                        <button className='border px-5 py-2 bg-info fw-bold text-white mx-2' style={{cursor:"pointer",borderRadius:"50px"}} onClick={() => navigate('/')}>Register</button>

                    </Col>
                </Row>
            </Container>
            <Container fluid>
                <Row className="d-flex justify-content-center align-items-center" style={{minHeight:"87vh"}}>
                    <Col xs={12} sm={10} md={8} lg={5} className='p-2' >
                        <div className="p-4 rounded bg-white shadow border">
                            {step === 1 && (
                                <>
                                    <Col className='text-end align-items-center justify-content-center mt-1 mb-4'>
                                        <i class="bi bi-x-lg fs-2 mt-2 mb-2" style={{cursor:"pointer"}} onClick={() => navigate('/login')}></i>
                                    </Col>
                                    <h4 className='mt-1 mb-3 text-info'>Forgot Password</h4>
                                    <hr className='text-info' />
                                    <Form.Group controlId="formEmail" className="mb-3">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </Form.Group>
                                    <button className='w-100 border p-1 bg-lightblue text-info' style={{cursor:"pointer"}} onClick={handleForgotPassword}>Send OTP</button>
                                    <>

                                        {/* <h4>Enter OTP</h4> */}
                                        <Form.Group controlId="formOtp" className="mb-3 mt-5">
                                            <Form.Label>OTP</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter OTP"
                                                value={otp}
                                                onChange={(e) => setOtp(e.target.value)}
                                                className='border'
                                            />
                                        </Form.Group>
                                        <button className='w-100 border p-1 bg-lightblue text-info' style={{cursor:"pointer"}} onClick={handleVerifyOTP}>Verify OTP</button>
                                    </>
                                </>
                            )}

                            {/* {step === 2 && ( */}

                            {/* )} */}

                            {step === 3 && (
                                <>
                                    <h4 className='mt-1 mb-3 text-info'>Reset Password</h4>
                                    <hr className='text-info' />
                                    <Form.Group controlId="formNewPassword" className="mb-3">
                                        <Form.Label>New Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Enter new password"
                                            value={newPassword.new_password}
                                            onChange={(e) => setNewPassword({ ...newPassword, new_password: e.target.value })}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formConfirmPassword" className="mb-3">
                                        <Form.Label>Confirm Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Confirm new password"
                                            value={newPassword.confirm_password}
                                            onChange={(e) => setNewPassword({ ...newPassword, confirm_password: e.target.value })}
                                        />
                                    </Form.Group>

                                    <button className='w-100 border p-1 bg-lightblue text-info' style={{cursor:"pointer"}} onClick={handleResetPassword}>Reset Password</button>
                                </>
                          )} 
                        </div>
                    </Col>
                </Row>
            </Container>
            <ToastContainer />
        </div>
    );
};

export default ForgotPassword;
