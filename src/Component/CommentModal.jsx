// import Axios from '../Axios/Axios';
// import React, { useEffect, useState } from 'react';
// import { Container, Table, Row, Col, Button, Form, Modal, Offcanvas, Image } from 'react-bootstrap';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
// import swal from 'sweetalert';
// import { FaDownload, FaPaperclip, FaTelegramPlane } from 'react-icons/fa'; // Download and attachment icons
// import { FaTrash } from "react-icons/fa";

// const CommentModal = () => {
//   const [data, setData] = useState({
//     projects: [],
//     tasks: [],
//     activity_logs: [],
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isModalVisible, setModalVisible] = useState(false);
//   const [selectedTask, setSelectedTask] = useState(null);
//   const [selectedProject, setSelectedProject] = useState(null);
//   const [status, setStatus] = useState('');
//   const [newComment, setNewComment] = useState('');
//   const [comments, setComments] = useState([]);
//   const [isOffcanvasVisible, setOffcanvasVisible] = useState(false);
//   const [file, setFile] = useState(null); // To hold the base64 image data
//   const [showImageModal, setShowImageModal] = useState(false); // To show image modal
//   const [imageSrc, setImageSrc] = useState(''); // To store image source
//   const navigate = useNavigate();

//   const userId = localStorage.getItem('user_id');
//   const userName = localStorage.getItem('username'); // Retrieve username at the component level

//   useEffect(() => {
//     Axios
//       .get(`user/${userId}/details/`)
//       .then((res) => {
//         setData(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError(err.message);
//         setLoading(false);
//       });
//   }, [userId]);

//   const handleUpdateClick = (task) => {
//     setSelectedTask(task);
//     setStatus(task.status);
//     setModalVisible(true);
//   };

//   const handleCommentClick = async (project) => {
//     setSelectedProject(project);
//     setOffcanvasVisible(true);
//     fetchComments(project.id);
//   };

//   const fetchComments = async (projectId) => {
//     try {
//       const response = await Axios.get(`/task/${projectId}/comments/`);
//       setComments(response.data.comments);
//     } catch (err) {
//       console.error("Error fetching comments:", err);
//       swal("Error!", "Could not fetch comments.", "error");
//     }
//   };

//   // Handle the file change and convert image to base64
//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     if (selectedFile) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setFile(reader.result); // Set the base64 string of the image
//       };
//       reader.readAsDataURL(selectedFile); // Convert the file to base64
//     }
//   };

//   const handlePostComment = async (e) => {
//     e.preventDefault();
//     if (!newComment) return;

//     if (!userName) {
//       console.error("Username not found in localStorage");
//       swal("Error!", "Username not found. Please log in again.", "error");
//       return;
//     }

//     // Create form data
//     const formData = new FormData();
//     formData.append("content", newComment);
//     formData.append("name", userName);
//     if (file) {
//       formData.append("file", file); // The file is now a base64 string
//     }

//     try {
//       const res = await Axios.post(`/project/${selectedProject.id}/comment/`, formData, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       const { message } = res.data;
//       swal("Success!", message, "success");
//       setNewComment("");
//       setFile(null); // Reset the file input
//       fetchComments(selectedProject.id);
//     } catch (err) {
//       console.error("Error posting comment:", err);
//       swal("Error!", "Error posting comment.", "error");
//     }
//   };

//   // Show full image in modal
//   const handleImageClick = (file) => {
//     setImageSrc(file); // Set the image source
//     setShowImageModal(true); // Show modal
//   };

//   // Close image modal
//   const handleCloseImageModal = () => setShowImageModal(false);

//   // Handle image download
//   const handleDownloadImage = () => {
//     const link = document.createElement('a');
//     link.href = imageSrc;
//     link.download = 'image.jpg'; // You can change the filename
//     link.click();
//   };

//   return (
//     <div>
//       <Container fluid className="dashboard-container py-4 mt-2 rounded">
//         <Row>
//           <Col className="text">
//             <h1 style={{ backgroundColor: "#f3f3f3" }} className="section-title h2 p-2">Project Details</h1>
//             <hr className="text-dark" />
//           </Col>
//         </Row>
//         <Row>
//           <Col xs={12} className="bg-white p-3 rounded shadow-sm">
//             <Table responsive="sm" className="table table-hover table-border table-hover p-3 mb-5 bg-white rounded">
//               <thead>
//                 <tr>
//                   <th className='text-muted' style={{ fontSize: "14px", fontWeight: "100" }}>N/o</th>
//                   <th className='text-muted' style={{ fontSize: "14px", fontWeight: "100" }}>Project Name</th>
//                   <th className='text-muted' style={{ fontSize: "14px", fontWeight: "100" }}>Description</th>
//                   <th className='text-muted' style={{ fontSize: "14px", fontWeight: "100" }}>Start Date</th>
//                   <th className='text-muted' style={{ fontSize: "14px", fontWeight: "100" }}>End Date</th>
//                   <th className='text-muted' style={{ fontSize: "14px", fontWeight: "100" }}>Assigned Users</th>
//                   <th className='text-muted' style={{ fontSize: "14px", fontWeight: "100" }}>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {data.projects.map((project, index) => (
//                   <tr key={project.id}>
//                     <td>{index + 1}</td>
//                     <td>{project.name}</td>
//                     <td>{project.description}</td>
//                     <td>{project.start_date}</td>
//                     <td>{project.end_date}</td>
//                     <td>{project.assigned_users.map(user => user.username).join(', ')}</td>
//                     <td>
//                       <Button style={{ color: "white" }} onClick={() => handleCommentClick(project)}>
//                         Comment
//                       </Button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </Table>
//           </Col>
//         </Row>

//         <Offcanvas show={isOffcanvasVisible} onHide={() => setOffcanvasVisible(false)} placement="end">
//           <Offcanvas.Header closeButton>
//             <Offcanvas.Title>Comments for {selectedProject?.name}</Offcanvas.Title>
//           </Offcanvas.Header>
//           <Offcanvas.Body>


//             <hr />
//             <h5>Comments</h5>
//             {comments.length > 0 ? (
//               <ul className="list-unstyled">
//                 {comments.map((comment) => (
//                   <li key={comment.id} className="mb-2 d-flex" style={{ backgroundColor: "aliceblue" }}>
//                     <div className="me-2 d-flex align-items-start">
//                       <i className="bi bi-person-circle fs-1 text-success"></i>
//                     </div>
//                     <div className="flex-grow-1">
//                       <div className="d-flex justify-content-between align-items-center">
//                         <span className="me-2 mt-2 text-dark">{comment.name}</span>
//                         <small className="text-muted">{new Date().toLocaleString()}</small>
//                         </div>
//                       <p className='' style={{fontSize:"14px"}}>{comment.content}</p>
//                       {comment.file && (
//                         <Image
//                           src={comment.file}
//                           alt="attached file"
//                           width="60"
//                           height="60"
//                           onClick={() => handleImageClick(comment.file)} // Show image in modal
//                           style={{ cursor: "pointer" }}
//                         />
//                       )}
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p>No comments yet.</p>
//             )}
//           </Offcanvas.Body>
//           <Form onSubmit={handlePostComment} className='px-3 py-5'>
//               <Form.Group controlId="formNewComment">
//                 <Form.Label className='px-1'>Add a Comment</Form.Label>
//                 <Form.Control
//                   as="textarea"
//                   rows={3}
//                   value={newComment}
//                   onChange={(e) => setNewComment(e.target.value)}
//                   placeholder="Write your comment here..."
//                 />
//               </Form.Group>
//               {/* <FaPaperclip /> */}
//               <Form.Group controlId="formFile" className="mt-2 d-flex justify-content-start align-items-center">
//                 {/* <Form.Label> Attach File (Optional)</Form.Label> */}
//                 <div className='col-md-4 col-sm-4 col-lg-10'>
//                   <Form.Control
//                     type="file"
//                     onChange={handleFileChange} // Capture the selected file and convert to base64
//                   />
//                 </div>
//                 <div className='col-md-4 col-sm-4 col-lg-2'>
//                   <Button variant="link" type="button" onClick={handlePostComment} className="mt-2 p-0">
//                     <FaTelegramPlane className="text-success fs-4 mx-2" />
//                   </Button>
//                 </div>
//               </Form.Group>


//             </Form>
//         </Offcanvas>

//         {/* Image Modal */}
//         <Modal show={showImageModal} onHide={handleCloseImageModal} centered size="lg">
//           <Modal.Header closeButton>
//             <Modal.Title>Image Preview</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <div className="text-center">
//               <Image src={imageSrc} alt="Preview" fluid style={{ maxHeight: '80vh', maxWidth: '80%' }} />
//             </div>
//             <Button variant="" className="mt-3 text-dark fs-3" style={{ float: 'right' }} onClick={handleDownloadImage}>
//               <FaDownload className=" text-dark fs-3" />
//             </Button>
//           </Modal.Body>
//         </Modal>
//       </Container>
//     </div>
//   );
// };

// export default CommentModal;


import Axios from '../Axios/Axios';
import React, { useEffect, useState } from 'react';
import { Container, Table, Row, Col, Button, Form, Modal, Offcanvas, Image, Dropdown } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { FaDownload, FaPaperclip, FaTelegramPlane, FaTrash, FaEdit,FaReply } from 'react-icons/fa'; // Added FaTrash for delete icon


const CommentModal = () => {
  const [data, setData] = useState({
    projects: [],
    tasks: [],
    activity_logs: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [status, setStatus] = useState('');
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);
  const [isOffcanvasVisible, setOffcanvasVisible] = useState(false);
  const [file, setFile] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
  const navigate = useNavigate();
  const [replyContent, setReplyContent] = useState('');
  const [replyToCommentId, setReplyToCommentId] = useState(null); // Track which comment is being replied to

  const userId = localStorage.getItem('user_id');
  const userName = localStorage.getItem('username');

  useEffect(() => {
    Axios
      .get(`user/${userId}/details/`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [userId]);

  const handleCommentClick = async (project) => {
    setSelectedProject(project);
    setOffcanvasVisible(true);
    fetchComments(project.id);
  };

  // const fetchComments = async (projectId) => {
  //   try {
  //     const response = await Axios.get(`/task/${projectId}/comments/`);
  //     setComments(response.data.comments);
  //   } catch (err) {
  //     console.error("Error fetching comments:", err);
  //     swal("Error!", "Could not fetch comments.", "error");
  //   }
  // };
  const fetchComments = async (projectId) => {
    try {
      const response = await Axios.get(`/task/${projectId}/comments/`);
      setComments(response.data.comments);
    } catch (err) {
      console.error("Error fetching comments:", err);
      swal("Error!", "Could not fetch comments.", "error");
    }
  };

  // const handlePostReply = async (commentId) => {
  //   if (!replyContent) return;


  //   try {
  //     const response = await Axios.post(`/reply/${commentId}/`, { content: replyContent });
  //     swal("Success!", response.data.message, "success");

  //     // Clear reply state
  //     setReplyContent('');
  //     setReplyToCommentId(null);

  //     // Re-fetch comments to update replies
  //     fetchComments(selectedProject.id);
  //   } catch (err) {
  //     console.error("Error posting reply:", err);
  //     swal("Error!", "Could not post reply.", "error");
  //   }
  // };


  const handlePostReply = async (commentId, name) => {
    console.log("name", name);

    if (!replyContent) return;

    try {
      // Adjust the request to include 'name' field as required by the server
      const response = await Axios.post(`/reply/${commentId}/`, {
        content: replyContent,
        name: userName // Replace 'YourNameHere' with the appropriate value or variable
      });

      swal("Success!", response.data.message, "success");

      // Clear reply state
      setReplyContent('');
      setReplyToCommentId(null);

      // Re-fetch comments to update replies
      fetchComments(selectedProject.id);
    } catch (err) {
      console.error("Error posting reply:", err);
      swal("Error!", "Could not post reply.", "error");
    }
  };


  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFile(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handlePostComment = async (e) => {
    e.preventDefault();
    if (!newComment) return;

    if (!userName) {
      console.error("Username not found in localStorage");
      swal("Error!", "Username not found. Please log in again.", "error");
      return;
    }

    const formData = new FormData();
    formData.append("content", newComment);
    formData.append("name", userName);
    if (file) {
      formData.append("file", file);
    }

    try {
      const res = await Axios.post(`/project/${selectedProject.id}/comment/`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      swal("Success!", res.data.message, "success");
      setNewComment("");
      setFile(null);
      fetchComments(selectedProject.id);
    } catch (err) {
      console.error("Error posting comment:", err);
      swal("Error!", "Error posting comment.", "error");
    }
  };

  const handleDeleteComment = async (commentId) => {
    console.log('commentId', commentId);

    try {
      const res = await Axios.delete(`/delete/${commentId}/`);
      if (res.data.status === "success") {
        swal("Deleted!", "Comment has been deleted.", "success");
        setComments((prevComments) => prevComments.filter((comment) => comment._id !== commentId));
        navigate('/')
        setTimeout(() => {
          navigate('/AdminDashboard')
        }, 100);
      }
    } catch (err) {
      console.error("Error deleting comment:", err);
      swal("Error!", "Could not delete comment.", "error");
    }
  };

  const handleImageClick = (file) => {
    setImageSrc(file);
    setShowImageModal(true);
  };

  const handleCloseImageModal = () => setShowImageModal(false);

  const handleDownloadImage = () => {
    const link = document.createElement('a');
    link.href = imageSrc;
    link.download = 'image.jpg';
    link.click();
  };

  return (
    <div>
      <Container fluid className="dashboard-container py-4 mt-2 rounded">
        <Row>
          <Col className="text">
            <h1 style={{ backgroundColor: "#f3f3f3" }} className="section-title h2 p-2">Project Details</h1>
            <hr className="text-dark" />
          </Col>
        </Row>
        <Row>
          <Col xs={12} className="bg-white p-3 rounded shadow-sm">
            <Table responsive="sm" className="table table-hover table-border table-hover p-3 mb-5 bg-white rounded">
              <thead>
                <tr>
                  <th className='text-muted' style={{ fontSize: "14px", fontWeight: "100" }}>N/o</th>
                  <th className='text-muted' style={{ fontSize: "14px", fontWeight: "100" }}>Project Name</th>
                  <th className='text-muted' style={{ fontSize: "14px", fontWeight: "100" }}>Description</th>
                  <th className='text-muted' style={{ fontSize: "14px", fontWeight: "100" }}>Start Date</th>
                  <th className='text-muted' style={{ fontSize: "14px", fontWeight: "100" }}>End Date</th>
                  <th className='text-muted' style={{ fontSize: "14px", fontWeight: "100" }}>Assigned Users</th>
                  <th className='text-muted' style={{ fontSize: "14px", fontWeight: "100" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.projects.map((project, index) => (
                  <tr key={project.id}>
                    <td>{index + 1}</td>
                    <td>{project.name}</td>
                    <td>{project.description}</td>
                    <td>{project.start_date}</td>
                    <td>{project.end_date}</td>
                    <td>{project.assigned_users.map(user => user.username).join(', ')}</td>
                    <td>
                      <Button style={{ color: "white" }} onClick={() => handleCommentClick(project)}>
                        Comment
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>

        <Offcanvas show={isOffcanvasVisible} onHide={() => setOffcanvasVisible(false)} placement="end">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Comments for {selectedProject?.name}</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <hr />
            <h5>Comments</h5>
            {comments.length > 0 ? (
              <ul className="list-unstyled">
                {comments.map((comment) => (
                  <li key={comment._id} className="mb-2 d-flex border rounded" style={{ backgroundColor: "aliceblue" }}>
                    <div className="me-2 d-flex align-items-start">
                      <i className="bi bi-person-circle fs-1 text-success"></i>
                    </div>
                    <div className="flex-grow-1">
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="me-2 mt-2 text-dark">{comment.name}</span>
                        <Dropdown>
                          <Dropdown.Toggle variant="light" className="text-muted border-0 px-2">
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item>
                              {/* Format the date to "4 Oct 2024, 18:57" */}
                              <small className="text-muted">
                                {new Date().toLocaleDateString('en-GB', {
                                  day: 'numeric',
                                  month: 'short',
                                  year: 'numeric',
                                })}, {new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                              </small>
                            </Dropdown.Item>
                            <hr className="p-0 m-0 text-info" />

                            <Dropdown.Item>
                              {/* Edit Icon */}
                              <FaEdit className="text-warning me-2 cursor-pointer" />
                              Edit
                            </Dropdown.Item>
                            <hr className="p-0 m-0 text-info" />

                            <Dropdown.Item onClick={() => handleDeleteComment(comment.id)}>
                              <FaTrash className="text-danger me-2 cursor-pointer" />
                              Delete
                            </Dropdown.Item>
                            <hr className="p-0 m-0 text-info" />

                            <Dropdown.Item onClick={() => setReplyToCommentId(comment.id)}>
                              <FaReply className="me-2 text-primary" /> Reply
                            </Dropdown.Item>
                            {/* <Dropdown.Item onClick={() => handleDeleteComment(comment.id)}>
                              <Button variant="link" onClick={() => setReplyToCommentId(comment.id)}>
                                <i class="bi bi-reply"></i>
                              </Button>
                            </Dropdown.Item> */}
                          </Dropdown.Menu>
                        </Dropdown>


                      </div>
                      <p style={{ fontSize: "14px" }}>{comment.content}</p>
                      {comment.file && (
                        <Image
                          src={comment.file}
                          alt="attached file"
                          width="60"
                          height="60"
                          onClick={() => handleImageClick(comment.file)}
                          style={{ cursor: "pointer" }}
                        />
                      )}

                      {/* Show existing replies */}
                      {comment.replies?.map((reply) => (

                        <li key={comment._id} className="mb-2 d-flex border rounded" style={{ backgroundColor: "white" }}>
                          <div className="me-2 d-flex align-items-start">
                            <i className="bi bi-person-circle fs-1 text-success"></i>
                          </div>
                          <div className="flex-grow-1">
                            <div className="d-flex justify-content-start  align-items-center">
                              <span className="me-2 mt-2 text-dark">{reply.name}</span>
                            </div>
                            <p className='me-1' style={{ fontSize: "14px" }}>{reply.content}</p>

                          </div>
                        </li>

                      ))}

                      {/* Reply form for the selected comment */}
                      {replyToCommentId === comment.id && (
                        <Form
                          onSubmit={(e) => {
                            e.preventDefault();
                            handlePostReply(comment.id, comment.name);
                          }}
                          className="mt-2"
                        >
                          <Form.Group controlId="formReplyContent">
                            <Form.Control
                              type="text"
                              value={replyContent}
                              onChange={(e) => setReplyContent(e.target.value)}
                              placeholder="Write a reply..."
                            />
                          </Form.Group>
                          <Button type="submit" className="mt-1" size="sm">
                            Submit Reply
                          </Button>
                        </Form>
                      )}
                    </div>
                  </li>
                ))}

              </ul>
            ) : (
              <p>No comments yet.</p>
            )}
          </Offcanvas.Body>
          <Form onSubmit={handlePostComment} className='px-3 py-5'>
            <Form.Group controlId="formNewComment">
              <Form.Label className='px-1'>Add a Comment</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write your comment here..."
              />
            </Form.Group>
            {/* <FaPaperclip /> */}
            <Form.Group controlId="formFile" className="mt-2 d-flex justify-content-start align-items-center">
              {/* <Form.Label> Attach File (Optional)</Form.Label> */}
              <div className='col-md-4 col-sm-4 col-lg-10'>
                <Form.Control
                  type="file"
                  onChange={handleFileChange} // Capture the selected file and convert to base64
                />
              </div>
              <div className='col-md-4 col-sm-4 col-lg-2'>
                <Button variant="link" type="button" onClick={handlePostComment} className="mt-2 p-0">
                  <FaTelegramPlane className="text-success fs-4 mx-2" />
                </Button>
              </div>
            </Form.Group>


          </Form>
        </Offcanvas>

        <Modal show={showImageModal} onHide={handleCloseImageModal} centered size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Image Preview</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="text-center">
              <Image src={imageSrc} alt="Preview" fluid style={{ maxHeight: '80vh', maxWidth: '80%' }} />
            </div>
            <Button className="mt-3" onClick={handleDownloadImage}><FaDownload className="me-2" />Download</Button>
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
};

export default CommentModal;
