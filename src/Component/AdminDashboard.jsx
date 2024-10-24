import Axios from '../Axios/Axios'
import React, { useEffect, useState } from 'react';
import { Container, Table, Row, Col, Button, Form, Modal, Offcanvas } from 'react-bootstrap';
import "../App.css"; // Your custom styles here
import EmployeeLog from "../EmployeeLog"
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert'; // Ensure you have imported sweetalert

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
  const [isOffcanvasVisible, setOffcanvasVisible] = useState(false);  // Control offcanvas visibility
  const [newComment, setNewComment] = useState(''); // State for new comment
  const [comments, setComments] = useState([]); // State for task comments
  const navigate = useNavigate();


  const userId = localStorage.getItem('user_id');

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const getStatusClass = (status) => {
    switch (status) {
      case 'complete':
        return 'bg-success text-white';
      case 'in_progress':
        return 'bg-warning text-dark';
      case 'pending':
        return 'bg-secondary text-white';
      default:
        return '';
    }
  };

  const handleCommentClick = (task) => {
    setSelectedTask(task);     // Set selected task for commenting
    fetchComments(task.id); // Fetch comments for the selected task
    setOffcanvasVisible(true);  // Show offcanvas
  };
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

  // // Handle posting a new comment
  // const postComment = async (e) => {
  //   e.preventDefault();

  //   try {
  //     // Change 'comment' to 'content' as per the backend requirement
  //     await Axios.post(`/task/${selectedTask.id}/comment/`, { content: newComment });
  //     toast.success("Comment posted successfully!"); // Display success message
  //     setNewComment(''); // Clear the comment input
  //     setCommentModalVisible(false); // Close the modal after posting
  //   } catch (err) {
  //     console.error('Error posting comment:', err);
  //     toast.error("Error posting comment."); // Display error message
  //   }
  // };


  const fetchComments = async (taskId) => {
    try {
      const res = await Axios.get(`/task/${taskId}/comments/`); // Fetch comments for the selected task
      setComments(res.data.comments); // Set the fetched comments in state
      console.log(res.data);

    } catch (err) {
      console.error('Error fetching comments:', err);
      toast.error("Error fetching comments.");
    }
  };

  const postComment = async (e) => {
    e.preventDefault();

    try {
      // Change 'comment' to 'content' as per the backend requirement
      const res = await Axios.post(`/task/${selectedTask.id}/comment/`, { content: newComment });
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
      <Container>
        <Row>
          <Col>
            <EmployeeLog />

          </Col>
        </Row>
      </Container>
      <Container className="dashboard-container  py-4 mt-2 rounded">
        <Row>
          <Col className="text">
            {/* <h1 className="section-title p-1" style={{backgroundColor:"lightblue"}}>Desiner Project details</h1> */}
            {/* <hr className="text-dark" /> */}
          </Col>
        </Row>
        {/* Projects Section */}
        <Row>
          <Col className="text">
            <h1 style={{ backgroundColor: "#f3f3f3" }} className="section-title  h2 p-2">Project Details</h1>
            <hr className="text-dark" />
          </Col>
        </Row>
        <Row>
          <Col xs={12} className="bg-white p-3 rounded shadow-sm">
            <Table responsive="sm" className="table table-hover table-border table-hover p-3 mb-5 bg-white rounded">
              <thead>
                <tr>
                  <th>N/o</th>
                  <th>Project Name</th>
                  <th>Description</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  {/* <th>Created By</th> */}
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
                    {/* <td>{project.created_by}</td> */}
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
        </Row>

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
                  <th>N/o</th>
                  <th>Task Name</th>
                  <th>description</th>
                  <th>created_at</th>
                  <th>due_date</th>
                  <th>priority</th>
                  <th>Status</th>
                  <th>completed_at</th>
                  <th>Action</th>
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
                      <Button style={{ backgroundColor: "lightblue", color: "black" }} onClick={() => handleUpdateClick(task)}>
                        Update
                      </Button>
                      <Button style={{ backgroundColor: "#dcdcdc", color: "black" }} onClick={() => handleCommentClick(task)}>
                        Comment
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
                  <th>N/o</th>
                  <th>Task</th>
                  <th>User</th>
                  <th>Action</th>
                  <th>Description</th>
                  <th>Timestamp</th>
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
        {/* Modal for Posting Comment */}
        {/* <Offcanvas show={isOffcanvasVisible} onHide={() => setOffcanvasVisible(false)} placement="end">
          <Offcanvas.Header closeButton>
            <Modal.Title>Comment on {selectedTask?.title}</Modal.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
            <Form onSubmit={postComment}>
              <Form.Group controlId="formNewComment">
                <Form.Label>New Comment</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Type your comment..."
                />
              </Form.Group>
              <Button variant="success" type="submit" className="mt-2">
                Post Comment
              </Button>
            </Form>
            </Offcanvas.Body>
            </Offcanvas> */}
        {/* Offcanvas for Comments */}
        <Offcanvas show={isOffcanvasVisible} onHide={() => setOffcanvasVisible(false)} placement="end">
          <Offcanvas.Header closeButton>
            <Modal.Title>Comments for {selectedTask?.title}</Modal.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Form onSubmit={postComment}>
              <Form.Group controlId="formNewComment">
                <Form.Label>New Comment</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Type your comment..."
                />
              </Form.Group>
              <Button variant="success" type="submit" className="mt-2">
                Post Comment
              </Button>
            </Form>

            {/* Display Comments */}
            {/* <div className="mt-4">
            <h5>Comments</h5>
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <div key={index} className="comment mt-3">
                  <strong>{comment.user.username}</strong>: {comment.content}
                  <div className="text-muted" style={{ fontSize: '0.85em' }}>
                    {new Date(comment.timestamp).toLocaleString()}
                  </div>
                </div>
              ))
            ) : (
              <p>No comments yet.</p>
            )}
          </div> */}
          <div className="mt-4">
  <h5>Comments</h5>
  {/* <hr className='text-info' /> */}
  {comments.length > 0 ? ( comments.map((item, index) => {
    return (
      <div key={index} className="comment mt-3  p-2 rounded" style={{backgroundColor:"#e7f9ff"}}>
           <div className="text-muted py-2 px-1" style={{ fontSize: '0.85em' }}>
           <h6 className='text-success'>{item.content}</h6>
        </div>
        <div className="text-muted text-end" style={{ fontSize: '0.85em' }}>
          {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} {/* Display the current date */}
        </div>
      </div>
    );
  })
):(
  <p>No comments yet.</p>
)
}
</div>

          </Offcanvas.Body>
        </Offcanvas>
      </Container>
    </div>
  );
};

export default AdminDashboard;
