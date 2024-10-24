import Axios from '../Axios/Axios'
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { ScaleLoader } from 'react-spinners';

const Activity = () => {
    const [activity, setActivity] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showData, setShowData] = useState(false); // New state to control when to show data

    useEffect(() => {
        // Fetch data from the API
        Axios.get("get_activity_logs/")
            .then(res => {
                console.log(res.data.logs); // Log data to verify
                setActivity(res.data.logs);
                setTimeout(() => {
                    setLoading(false); // Show data after the spinner has been shown twice
                }, 1000); // 5s * 2 = 10s
                setShowData(true);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                fontSize: "100px",
                fontWeight: "700",
                color: "green",
                transition: "1s"
            }}>
                <ScaleLoader
                    color="#008287"
                    loading={loading}
                    size={200}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
        );
    }

    if (error) {
        return (
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                fontSize: "30px",
                fontWeight: "300",
                color: "red"
            }}>
                <div>
                    <img src="https://cdni.iconscout.com/illustration/premium/thumb/man-frustrated-with-404-error-illustration-download-in-svg-png-gif-file-formats--line-logo-page-not-found-internet-network-interruption-pack-design-development-illustrations-5059514.png?f=webp" alt="" />
                    <br /><span className='fs-5'>    Error:"Looks like you're not connected to the internet"</span>
                </div>
            </div>
        );
    }

    if (!showData) {
        return null; // Show nothing while waiting to display data
    }

    return (
        <div className='container mt-4 bg-white p-md-4 mb-5 rounded'>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h2>Activity Details</h2>

                {/* <Button variant="primary">
                    Create Task
                </Button> */}
            </div>
            <hr className='text-black' />
            <div className="container-fluid">
                <div className="row">
                    <div className="table-responsive col-md-12 col-sm-12 col-lg-12 mx-auto">
                        <table className="mt-3 table table-hover table-border table-hover p-3 mb-5 bg-white rounded">
                            <thead>
                                <tr >
                                    <th>User</th>
                                    <th>Action</th>
                                    <th>Description</th>

                                </tr>
                            </thead>
                            <tbody>
                                {activity.map((item, index) => (
                                    <tr key={index} style={getRowStyle(item.action)}>
                                        <td>{item.user}</td>
                                        <td>{item.action}</td>
                                        <td>{item.description}</td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Function to set the background color based on action
const getRowStyle = (action) => {
    switch (action?.toLowerCase()) { // Convert action to lowercase for consistency
        case 'processing':
            return { backgroundColor: '#f0ad4e' }; // Orange for processing
        case 'completed':
            return { backgroundColor: '#5cb85c' }; // Green for completed
        case 'in process':
            return { backgroundColor: '#5bc0de' }; // Blue for in process
        default:
            return {}; // No background for other statuses
    }
};

export default Activity;
