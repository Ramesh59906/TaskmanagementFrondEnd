import Axios from '../Axios/Axios'
import React, { useEffect, useState } from 'react';
import { Container, Table, Row, Col, Button, Form, Modal, Offcanvas } from 'react-bootstrap';
import "../App.css"; // Your custom styles here
import EmployeeLog from "../EmployeeLog"
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert'; // Ensure you have imported sweetalert
import CommentModal from './CommentModal';

const AdminDashboard = () => {
  const [data, setData] = useState({
    projects: [],
    tasks: [],
    activity_logs: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);  // Control modal visibility
  const [selectedTask, setSelectedTask] = useState(null);
  const [status, setStatus] = useState('');
  const [newComment, setNewComment] = useState(''); // State for new comment
  const [comments, setComments] = useState([]); // State for task comments
  const navigate = useNavigate();


  const userId = localStorage.getItem('user_id');
  const userName=localStorage.getItem('username');

  useEffect(() => {
    Axios
      .get(`user/${userId}/details/`)
      .then((res) => {
        console.log(res.data);
        
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [userId]);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }



  const handleUpdateClick = (task) => {
    setSelectedTask(task);     // Set selected task
    setStatus(task.status);    // Set default status
    setModalVisible(true);     // Show modal
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);  // Update status state on dropdown change
  };

  // Handle form submission (update task)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make the API call to update the task status
      const response = await Axios.put(`tasks/update/${selectedTask.id}/`, { status });
      const { message } = response.data;
      swal({
        title: message,
        text: "successfully!",
        icon: "success"
      });
      // Close the modal and refresh the page after update
      setModalVisible(false);
      navigate('/')
      setTimeout(() => {
        navigate('/AdminDashboard')
      })
      // window.location.reload();  // Refresh the page to show updated tasks
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };



  const postComment = async (e) => {
    e.preventDefault();

    try {
      // Change 'comment' to 'content' as per the backend requirement
      const res = await Axios.post(`/task/${selectedTask.id}/comment/`, { content: newComment });
      console.log(userName);
      
      const { message } = res.data;
      // Show success alert using swal
      swal("Success!", message, "success");
      setOffcanvasVisible(false);
      fetchComments(selectedTask.id); // Re-fetch comments after posting a new comment
      setNewComment(''); // Clear the comment input
      // setCommentModalVisible(false); // Close the modal after posting
    } catch (err) {
      console.error('Error posting comment:', err);

      // Show error alert using swal
      swal("Error!", "Error posting comment.", "error");
    }
  };

  return (
    <div>
      <Container fluid>
        <Row>
          <Col>
            <EmployeeLog />

          </Col>
        </Row>
      </Container>
      <Container fluid className="dashboard-container  py-4 mt-2 rounded">
        <Row>
          <Col className="text">
            {/* <h1 className="section-title p-1" style={{backgroundColor:"lightblue"}}>Desiner Project details</h1> */}
            {/* <hr className="text-dark" /> */}
          </Col>
        </Row>
        {/* Projects Section */}
        {/* <Row>
          <Col className="text">
            <h1 style={{ backgroundColor: "#f3f3f3" }} className="section-title  h2 p-2">Project Details</h1>
            <hr className="text-dark" />
          </Col>
        </Row> */}
         {/* <Button style={{ backgroundColor: "#dcdcdc", color: "black" }}> */}
                       <CommentModal/>
                      {/* </Button> */}
        {/* <Row>
          <Col xs={12} className="bg-white p-3 rounded shadow-sm">
            <Table responsive="sm" className="table table-hover table-border table-hover p-3 mb-5 bg-white rounded">
              <thead>
                <tr>
                  <th>N/o</th>
                  <th>Project Name</th>
                  <th>Description</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Created By</th>
                  <th>Assigned Users</th>
                </tr>
              </thead>
              <tbody>
                {data.projects.map((project, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{project.name}</td>
                    <td>{project.description}</td>
                    <td>{project.start_date}</td>
                    <td>{project.end_date}</td>
                    <td>{project.created_by}</td>
                    <td>
                      {project.assigned_users.map((user) => (
                        <span key={user.id}>{user.username} </span>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row> */}

        {/* Tasks Section */}
        <Row className="mt-4">
          <Col className="text">
            <h1 style={{ backgroundColor: "#f3f3f3" }} className="section-title mark h2 p-2">Task Details</h1>
            <hr className="text-dark" />
          </Col>
        </Row>
        <Row>
          <Col xs={12} className="bg-white p-3 rounded shadow-sm">
            <Table hover responsive="sm" className="table table-hover table-border table-hover p-3 mb-5 bg-white rounded">
              <thead>
                <tr>
                  {/* <th>Task ID</th> */}
                  <th  className='text-muted' style={{fontSize:"14px",fontWeight:"100"}}>N/o</th>
                  <th className='text-muted' style={{fontSize:"14px",fontWeight:"100"}}>Task Name</th>
                  <th className='text-muted' style={{fontSize:"14px",fontWeight:"100"}}>description</th>
                  <th className='text-muted' style={{fontSize:"14px",fontWeight:"100"}}>created_at</th>
                  <th className='text-muted' style={{fontSize:"14px",fontWeight:"100"}}>due_date</th>
                  <th className='text-muted' style={{fontSize:"14px",fontWeight:"100"}}>priority</th>
                  <th className='text-muted' style={{fontSize:"14px",fontWeight:"100"}}>Status</th>
                  <th className='text-muted' style={{fontSize:"14px",fontWeight:"100"}}>completed_at</th>
                  <th className='text-muted' style={{fontSize:"14px",fontWeight:"100"}}>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.tasks.map((task, index) => (
                  <tr key={index} className=''>

                    <td>{index + 1}</td>
                    <td>{task.title}</td>
                    <td>{task.description}</td>
                    <td>{new Date(task.created_at).toLocaleDateString()}</td>
                    {/* <td>{task.created_at}</td> */}
                    <td>{task.due_date}</td>
                    <td>{task.priority}</td>
                    {/* <td>{task.title}</td> */}
                    <td>{task.status}</td>
                    <td>{task.completed_at ? new Date(task.completed_at).toLocaleDateString() : "N/A"}</td>
                    <td className='d-flex gap-1'>
                      <Button type='button' className='bg-success text-white border' style={{ backgroundColor: "", color: "black" }} onClick={() => handleUpdateClick(task)}>
                        Update
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>

            </Table>
          </Col>
        </Row>
        {/* Modal for Task Update */}
        <Modal show={isModalVisible} onHide={() => setModalVisible(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Update Status for {selectedTask?.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formTaskStatus">
                <Form.Label>Status</Form.Label>
                <Form.Control as="select" value={status} onChange={handleStatusChange}>
                  <option value="Open">Open</option>
                  <option value="in progress">In Progress</option>
                  <option value="Pending">Pending</option>
                  <option value="Rejected">Rejected</option>
                  <option value="done">Done</option>
                </Form.Control>
              </Form.Group>
              <Button variant="success" type="submit" className="mt-2">
                Save Changes
              </Button>
            </Form>
          </Modal.Body>
        </Modal>

        {/* Activity Logs Section */}
        <Row className="mt-4">
          <Col className="text">
            <h1 style={{ backgroundColor: "#f3f3f3" }} className="section-title mark h2 p-2">Activity Logs</h1>
            <hr className="text-dark" />
          </Col>
        </Row>
        <Row>
          <Col xs={12} className="bg-white p-3 rounded shadow-sm">
            <Table hover responsive="sm" className="table table-hover table-border table-hover p-3 mb-5 bg-white rounded">
              <thead>
                <tr>
                  <th className='text-muted' style={{fontSize:"14px",fontWeight:"100"}}>N/o</th>
                  <th className='text-muted' style={{fontSize:"14px",fontWeight:"100"}}>Task</th>
                  <th className='text-muted' style={{fontSize:"14px",fontWeight:"100"}}>User</th>
                  <th className='text-muted' style={{fontSize:"14px",fontWeight:"100"}}>Action</th>
                  <th className='text-muted' style={{fontSize:"14px",fontWeight:"100"}}>Description</th>
                  <th className='text-muted' style={{fontSize:"14px",fontWeight:"100"}}>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {data.activity_logs.map((log, index) => (
                  <tr key={log.id}>
                    <td>{index + 1}</td>
                    <td>{log.task}</td>
                    <td>{log.user}</td>
                    <td>{log.action}</td>
                    <td>{log.description}</td>
                    <td>{new Date(log.timestamp).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AdminDashboard;

// import Axios from '../Axios/Axios';
// import React, { useEffect, useState } from 'react';
// import { Container, Table, Row, Col, Button, Form, Modal, Offcanvas } from 'react-bootstrap';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
// import swal from 'sweetalert';

// const AdminDashboard = () => {
//   const [data, setData] = useState({
//     projects: [],
//     tasks: [],
//     activity_logs: [],
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isModalVisible, setModalVisible] = useState(false);  // Control modal visibility
//   const [selectedTask, setSelectedTask] = useState(null);
//   const [selectedProject, setSelectedProject] = useState(null);  // Project selected for comments
//   const [status, setStatus] = useState('');
//   const [newComment, setNewComment] = useState(''); // State for new comment
//   const [comments, setComments] = useState([]); // State for task comments
//   const [isOffcanvasVisible, setOffcanvasVisible] = useState(false); // Control offcanvas visibility
//   const navigate = useNavigate();

//   const userId = localStorage.getItem('user_id');

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

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   const handleUpdateClick = (task) => {
//     setSelectedTask(task);
//     setStatus(task.status);
//     setModalVisible(true);
//   };

//   const handleCommentClick = async (project) => {
//     setSelectedProject(project);
//     setOffcanvasVisible(true);
//     fetchComments(project.id);  // Fetch comments based on project ID
//   };

//   const fetchComments = async (projectId) => {
//     try {
//       const response = await Axios.get(`/task/${projectId}/comments/`);
//       setComments(response.data.comments);  // Assuming response.data contains the list of comments
//     } catch (err) {
//       console.error("Error fetching comments:", err);
//       swal("Error!", "Could not fetch comments.", "error");
//     }
//   };

//   const handlePostComment = async (e) => {
//     e.preventDefault();
//     if (!newComment) return;

//     try {
//       const res = await Axios.post(`/project/${selectedProject.id}/comment/`, { content: newComment });
//       const { message } = res.data;
//       swal("Success!", message, "success");
//       setNewComment(''); // Clear comment input
//       fetchComments(selectedProject.id); // Refresh comments
//     } catch (err) {
//       console.error("Error posting comment:", err);
//       swal("Error!", "Error posting comment.", "error");
//     }
//   };

//   return (
//     <div>
//       <Container className="dashboard-container py-4 mt-2 rounded">
//         {/* Projects Section */}
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
//                   <th>N/o</th>
//                   <th>Project Name</th>
//                   <th>Description</th>
//                   <th>Start Date</th>
//                   <th>End Date</th>
//                   <th>Assigned Users</th>
//                   <th>Action</th>
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
//                       <Button
//                         style={{ backgroundColor: "#dcdcdc", color: "black" }}
//                         onClick={() => handleCommentClick(project)}
//                       >
//                         Comment
//                       </Button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </Table>
//           </Col>
//         </Row>

//         {/* Offcanvas for Comments */}
//         <Offcanvas show={isOffcanvasVisible} onHide={() => setOffcanvasVisible(false)} placement="end">
//           <Offcanvas.Header closeButton>
//             <Offcanvas.Title>Comments for {selectedProject?.name}</Offcanvas.Title>
//           </Offcanvas.Header>
//           <Offcanvas.Body>
//             <Form onSubmit={handlePostComment}>
//               <Form.Group controlId="formNewComment">
//                 <Form.Label>Add a Comment</Form.Label>
//                 <Form.Control
//                   as="textarea"
//                   rows={3}
//                   value={newComment}
//                   onChange={(e) => setNewComment(e.target.value)}
//                   placeholder="Write your comment here..."
//                 />
//               </Form.Group>
//               <Button variant="primary" type="submit" className="mt-2">
//                 Post Comment
//               </Button>
//             </Form>
//             <hr />
//             <h5>Comments</h5>
//             {comments.length > 0 ? (
//               <ul className="list-unstyled">
//                 {comments.map((comment) => (
//                   <li key={comment.id} className="mb-2">
//                     <strong>{comment.user}</strong>: {comment.content}
//                     <br />
//                     <small className="text-muted">{new Date(comment.timestamp).toLocaleString()}</small>
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p>No comments available.</p>
//             )}
//           </Offcanvas.Body>
//         </Offcanvas>
//       </Container>
//     </div>
//   );
// };

// export default AdminDashboard;
