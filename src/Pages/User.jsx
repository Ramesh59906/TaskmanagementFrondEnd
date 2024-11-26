import Axios from '../Axios/Axios'
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../App.css"
import { ScaleLoader } from 'react-spinners';
const User = () => {
  const [data, setData] = useState([]); // Complete user data
  const [displayedUsers, setDisplayedUsers] = useState([]); // Users to display per page
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [usersPerPage] = useState(10); // Users per page
  const [totalPages, setTotalPages] = useState(0); // Total pages
  const [editingUser, setEditingUser] = useState(null); // Track the user being edited
  const [editedData, setEditedData] = useState({}); // Edited form data
  const [showData, setShowData] = useState(false); // New state to control when to show data
  const [updateKey, setUpdateKey] = useState(0);

  const navigate=useNavigate();

  useEffect(() => {
    // Fetch data from the API
    Axios.get("users/")
      .then(res => {
        setData(res.data.users); // Set the complete user data
        setTotalPages(Math.ceil(res.data.total_users / usersPerPage)); // Calculate total pages
        setDisplayedUsers(res.data.users.slice(0, usersPerPage)); // Set the first page of users to display
        // setLoading(false);
        setTimeout(() => {
          setLoading(false); // Show data after the spinner has been shown twice
      }, 1000); // 5s * 2 = 10s
      setShowData(true);
      })
      .catch(err => {
        console.error('Error fetching data:', err);
        setError(err.message);
        setLoading(false);
      });
  }, [usersPerPage]);

  // Handle page click
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    const startIndex = (pageNumber - 1) * usersPerPage;
    const endIndex = startIndex + usersPerPage;
    setDisplayedUsers(data.slice(startIndex, endIndex));
  };

  // Handle delete user
  // const handleDelete = (userId) => {
  //   if (window.confirm("Are you sure you want to delete this user?")) {
  //   const response=  Axios.delete(`/users/delete/${userId}/`)
  //       const{message}=response.data
  //       .then(res => {
  //         // Update the user list by filtering out the deleted user
  //         setData(data.filter(user => user.id !== userId));
  //         setDisplayedUsers(displayedUsers.filter(user => user.id !== userId));
  //         swal("Deleted successfully!", "You clicked the button!", "success");
  //       })
  //       .catch(err => {
  //         swal("Got Error!", "Failed to delete user.!", "warning");
  //         console.error('Error deleting user:', err);
  //         // alert("Failed to delete user.");
  //       });
  //   }
  // };
  
  const handleDelete = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      Axios.delete(`/users/delete/${userId}/`)
        .then((response) => {
          const { message } = response.data;  // Extract message from the response data
          // Update the user list by filtering out the deleted user
          setData(data.filter((user) => user.id !== userId));
          setDisplayedUsers(displayedUsers.filter((user) => user.id !== userId));
          swal("Deleted successfully!", message, "success");  // Use the message from the server response
        })
        .catch((err) => {
          swal("Got Error!", "Failed to delete user.", "warning");
          console.error('Error deleting user:', err);
        });
    }
  };
  
  
  // Handle edit user
  const handleEdit = (user) => {
    setEditingUser(user.id); // Set the ID of the user being edited
    setEditedData({ ...user }); // Prepopulate the form with existing data
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  // Handle update user
  const handleUpdate = (e) => {
    e.preventDefault();
  
    Axios.put(`users/edit/${editingUser}/`, editedData)
      .then(res => {
        const { message } = res.data;  // Extract message from the response data

        // Update the user in the local state
        const updatedUsers = data.map(user => (user.id === editingUser ? res.data : user));
        setData(updatedUsers);
        setDisplayedUsers(updatedUsers.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage));
        setEditingUser(null); // Clear editing state
        swal("Updated successfully!",message, "success");
        navigate('/Dashbord', { replace: true });  // Navigate to a different route temporarily
        setTimeout(() => {
          navigate('/Dashbord/user');  // Navigate back to the original route
        },100);  // Small delay to allow rerendering
      })
      .catch(error => {  // Correct syntax
        // Check if the error response exists and contains the specific message
        if (error.response && error.response.data && error.response.data.error === "Phone number already exists.") {
            swal("Got Error!", "Phone number already exists.", "warning");
        } else {
            // Handle any other errors
            swal("Got Error!", "Failed to update user.", "warning");
        }
        console.error('Error updating user:', error);
      });
  };
  

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error}</div>;
  
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
            flexWrap:"wrap",
            height: "100vh",
            fontSize: "30px",
            fontWeight: "300",
            color: "red",
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
    <div className=''>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 mx-auto  p-2 mb-5 bg-white rounded">
            <h2 className='px-3 pt-2 text-dark'>Users list</h2>
            <hr className='text-dark' />
            <div className="table-responsive">
              <table className='table table-hover table-border table-hover p-3 mb-5 bg-white rounded'>
                <thead>
                  <tr>
                    <th className='fs-5'>Name</th>
                    <th className='fs-5'>Email</th>
                    <th className='fs-5'>phone_number</th>
                    <th className='fs-5'>Role</th>
                    <th className='fs-5'>gender</th>
                    <th className='fs-5'>status</th>
                    <th className='fs-5'>Actions</th> {/* New Actions column */}

                  </tr>
                </thead>
                <tbody>
                  {displayedUsers.map((user, index) => (
                    <tr key={index}>
                      <td className='py-3  text-muted sm-h1'>
                        {editingUser === user.id ? (
                          <input
                            type="text"
                            name="username"
                            value={editedData.username}
                            onChange={handleInputChange}
                            className="form-control"
                          />
                        ) : (
                          // user.username || "null"
                          user.username  ?  user.username.charAt(0).toUpperCase() + user.username.slice(1) : "Null"

                        )}
                      </td>
                      <td className='py-3  text-success'>
                        {editingUser === user.id ? (
                          <input
                            type="email"
                            name="email"
                            value={editedData.email}
                            onChange={handleInputChange}
                            className="form-control"
                          />
                        ) : (
                          user.email || "null"
                        )}
                      </td>
                      <td className='py-3  text-success'>
                        {editingUser === user.id ? (
                          <input
                            type="number"
                            name="phone_number"
                            value={editedData.phone_number}
                            onChange={handleInputChange}
                            className="form-control"
                          />
                        ) : (
                          user.phone_number || "null"
                        )}
                      </td>
                      <td className='py-3 text-muted'>
                        {editingUser === user.id ? (
                          <input
                            type="text"
                            name="role"
                            value={editedData.role.charAt(0).toUpperCase() + editedData.role.slice(1)}
                            onChange={handleInputChange}
                            className="form-control"
                          />
                        ) : (
                         user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : "Null"
                        )}
                      </td>
                      <td className='py-2 text-muted'>
                      {editingUser === user.id ? (
                          <input
                            type="text"
                            name="gender"
                            value={editedData.gender}
                            onChange={handleInputChange}
                            className="form-control"
                          />
                        ) : (
                        user.gender ? user.gender.charAt(0).toUpperCase() + user.gender.slice(1) : "Null"
                        )}
                       </td>
                       <td className='py-2 text-muted'>
                      {editingUser === user.id ? (
                          <input
                            type="text"
                            name="status"
                            value={editedData.status}
                            onChange={handleInputChange}
                            className="form-control"
                          />
                        ) : (
                          user.status || "null"
                        )}
                       </td>
                      <td className='py-3 w-sm-100'>
                        {editingUser === user.id ? (
                          <>
                            <button className="btn btn-success btn-sm me-2" onClick={handleUpdate}>
                              Save
                            </button>
                            <button className="btn btn-secondary btn-sm" onClick={() => setEditingUser(null)}>
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button className="btn btn-success btn-sm me-2 px-3 py-1" onClick={() => handleEdit(user)}>
                              Edit
                            </button>
                            <button className="btn btn-danger btn-sm px-3 py-1" onClick={() => handleDelete(user.id)}>
                              Delete
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <nav>
              <ul className="pagination justify-content-center">
                {[...Array(totalPages)].map((_, i) => (
                  <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => handlePageClick(i + 1)}>
                      {i + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
