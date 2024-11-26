import React, { useEffect, useState } from 'react';
import Axios from '../Axios/Axios';
import { Container, Row, Col, Card, Button, Modal, Form, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import "../App.css";
import { ScaleLoader } from 'react-spinners';
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for styling
import { faCalendarAlt, faUser, faEllipsisV, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showData, setShowData] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    start_date: '',
    end_date: '',
    created_by: localStorage.getItem('user_id'),
    assigned_users: []
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usernames, setUsernames] = useState([]);
  const [editingProject, setEditingProject] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await Axios.get('projects/');
        setProjects(response.data.projects);
        console.log(response.message);
        setShowData(true);
        setTimeout(() => {
          setLoading(false); // Show data after the spinner has been shown twice
        }, 1000); // 5s * 2 = 10s
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const fetchUsernames = async () => {
    try {
      const response = await Axios.get('users/');
      setUsernames(response.data.users);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleShowAddModal = async () => {
    await fetchUsernames(); // Fetch usernames when opening Add modal
    setShowAddModal(true);
  };

  const handleEditClick = async (project) => {
    if (project && project.id) {
      await fetchUsernames(); // Fetch usernames when editing
      setFormData({
        name: project.name,
        description: project.description,
        start_date: project.start_date,
        end_date: project.end_date,
        assigned_users: project.assigned_users.map(user => user.id),
      });
      setEditingProject(project);
      setShowEditModal(true);
    }
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
    setFormData({
      name: '',
      description: '',
      start_date: '',
      end_date: '',
      created_by: localStorage.getItem('user_id'),
      assigned_users: []
    });
    setErrors({});
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditingProject(null);
    setFormData({
      name: '',
      description: '',
      start_date: '',
      end_date: '',
      created_by: localStorage.getItem('user_id'),
      assigned_users: [],
    });
    setErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddProjectSubmit = async (e) => {
    e.preventDefault();
    try {
      const validationErrors = {};
      if (!formData.name) validationErrors.name = 'Name is required';
      if (!formData.description) validationErrors.description = 'Description is required';
      if (!formData.start_date) validationErrors.start_date = 'Start date is required';
      if (!formData.end_date) validationErrors.end_date = 'End date is required';
      if (formData.assigned_users.length === 0) validationErrors.assigned_users = 'At least one user must be assigned';

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      const res = await Axios.post('projects/create/', formData);
      const { message } = res.data;
      toast.success(message);
      handleCloseAddModal();
      const response = await Axios.get('projects/');
      setProjects(response.data.projects);
      // toast.success(message);

      // console.log(response.data.message);

      // toast.success(response.data.projects.message,"Added successfully!");
    } catch (err) {
      // swal("Got Error!", "You clicked the button!", "warning");
      toast.warn(err);

      setError(err.message)
    }
  };

  // const handleEditProjectSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!editingProject) {
  //     return;
  //   }

  //   // Reset previous errors
  //   setErrors({});
  //   setError(null);

  //   try {
  //     const validationErrors = {};

  //     if (!formData.name) validationErrors.name = 'Name is required';
  //     if (!formData.description) validationErrors.description = 'Description is required';
  //     if (!formData.start_date) validationErrors.start_date = 'Start date is required';
  //     if (!formData.end_date) validationErrors.end_date = 'End date is required';
  //     if (formData.assigned_users.length === 0) validationErrors.assigned_users = 'At least one user must be assigned';

  //     if (Object.keys(validationErrors).length > 0) {
  //       setErrors(validationErrors);
  //       return;
  //     }

  //     // Perform the update
  //     await Axios.put(`projects/update/${editingProject.id}/`, formData);

  //     // Optionally: Show a success message
  //     // setSuccess("Project updated successfully!");
  //     swal("updated successfully!", "You clicked the button!", "success");
  //     toast.success("updated successfully!");

  //     handleCloseEditModal();

  //     // Refresh the project list
  //     const response = await Axios.get('projects/');
  //     setProjects(response.data.projects);

  //   } catch (err) {
  //     swal("Register successfully!", "You clicked the button!", "success");
  //     // Check for specific error response and set error message
  //     if (err.response) {
  //       setError(err.response.data.message || "An error occurred while updating the project.");

  //     } else {

  //       setError(err.message);
  //     }
  //   }
  // };


  const handleEditProjectSubmit = async (e) => {
    e.preventDefault();

    if (!editingProject) {
      return;
    }

    // Reset previous errors
    setErrors({});
    setError(null);

    try {
      const validationErrors = {};

      // Validation
      if (!formData.name) validationErrors.name = 'Name is required';
      if (!formData.description) validationErrors.description = 'Description is required';
      if (!formData.start_date) validationErrors.start_date = 'Start date is required';
      if (!formData.end_date) validationErrors.end_date = 'End date is required';
      if (formData.assigned_users.length === 0) validationErrors.assigned_users = 'At least one user must be assigned';

      // If validation errors exist, set them and return early
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }


      // Perform the update API call
      const response = await Axios.put(`projects/update/${editingProject.id}/`, formData);

      // Extract message and project details from response
      const { message } = response.data;

      // Show success message with project details
      // swal({
      //   title: message, 
      //   text: `Project Name: ${project.name}\nAssigned User: ${project.assigned_users.join(', ')}`, 
      //   icon: "success"
      // });

      toast.success(message);

      // Close the modal
      handleCloseEditModal();

      // Refresh the project list
      const projectListResponse = await Axios.get('projects/');
      setProjects(projectListResponse.data.projects);

    } catch (err) {
      // Handle error response
      if (err.response) {
        const errorMsg = err.response.data.message || "An error occurred while updating the project.";
        setError(errorMsg);
        // swal("Error!", errorMsg, "error");
        toast.error(errorMsg);
      } else {
        // Handle generic errors
        const errorMsg = err.message || "Something went wrong!";
        setError(errorMsg);
        // swal("Error!", errorMsg, "error");
        toast.error(errorMsg);
      }
    }
  };


  const handleDelete = (projectId) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      Axios.delete(`projects/delete/${projectId}/`)
        .then((res) => {
          const { message } = res.data
          setProjects(prevProjects => prevProjects.filter(project => project.id !== projectId));
          toast.success(message);

        })
        .catch(err => {
          toast.warn(setError(err.message));

        });
    }
  };

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
      }}>
        <ScaleLoader color="#008287" loading={loading} size={200} />
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
        <br /><span className='fs-5'>Error:"Looks like you're not connected to the internet"</span>
      </div>
      </div >
    );
  }

  return (
    <Container fluid className="my-4 p-0">
      <Row className="align-items-center">
        <Col xs={11}>
          <h1 className="section-title h2">Project details</h1>
        </Col>
        <Col xs={1} className=''>
          <Button className="w-100" onClick={handleShowAddModal}>
            Add
          </Button>
        </Col>
        <Col xs={12}>
          <hr className="text-dark" />
        </Col>
      </Row>

      <ToastContainer
        position="top-right" // Adjust the position as needed
        autoClose={5000} // Duration in milliseconds
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss
        theme="light" // or "dark", based on your preference
      />
      {/* <Row>
        {projects.map((project) => (
          <Col key={project.id} xs={12} sm={6} md={4} lg={4} className="mb-4">
            <Card className="project-card shadow border h-100">
              <Card.Body>
                <Card.Title className='fs-5 text-info'>{project.name}</Card.Title>
                <Card.Text style={{fontSize:"15px",color:"gray"}}>{project.description}</Card.Text>
                <hr />
                <p  style={{fontSize:"15px",lineHeight:"30px"}}>
                  <FontAwesomeIcon icon={faCalendarAlt} className="me-2" />
                  Start: {new Date(project.start_date).toLocaleDateString()}
                </p>
                <p  style={{fontSize:"15px",lineHeight:"35px"}}>
                  <FontAwesomeIcon icon={faCalendarAlt} className="me-2" />
                  End: {new Date(project.end_date).toLocaleDateString()}
                </p>
                <p  style={{fontSize:"15px",lineHeight:"35px"}}>
                  <FontAwesomeIcon icon={faUser} className="me-2" />
                  Assigned Users: {project.assigned_users.length ? project.assigned_users.map(user => user.username).join(', ') : 'None'}
                </p>
                <i onClick={() => handleEditClick(project)} style={{ cursor: "pointer" }} className="me-2 bi bi-pencil text-warning fs-5"></i>
                <i style={{ float: "right", cursor: "pointer" }} onClick={() => handleDelete(project.id)} className="bi bi-trash3-fill text-danger fs-5"></i>

              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row> */}
 <Row>
      {projects.map((project) => (
        <Col key={project.id} xs={12} sm={6} md={4} lg={4} className="mb-4">
          <div className="project-section shadow-sm p-4 bg-white position-relative h-100">
            {/* Three-dot menu */}
            <Dropdown className="position-absolute top-0 end-0 m-3">
              <Dropdown.Toggle variant="light" className="text-muted border-0 p-1">
                <FontAwesomeIcon icon={faEllipsisV} />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleEditClick(project)}>
                  <FontAwesomeIcon icon={faPencilAlt} className="text-warning me-2" />
                  Edit
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleDelete(project.id)}>
                  <FontAwesomeIcon icon={faTrash} className="text-danger me-2" />
                  Delete
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            {/* Project Information */}
            <h5 className="text-info">{project.name}</h5>
            <p style={{ fontSize: "15px", color: "gray" }}>{project.description}</p>
            <hr />
            <p style={{ fontSize: "15px", lineHeight: "30px" }}>
              <FontAwesomeIcon icon={faCalendarAlt} className="me-2" />
              Start: {new Date(project.start_date).toLocaleDateString()}
            </p>
            <p style={{ fontSize: "15px", lineHeight: "30px" }}>
              <FontAwesomeIcon icon={faCalendarAlt} className="me-2" />
              End: {new Date(project.end_date).toLocaleDateString()}
            </p>
            <p style={{ fontSize: "15px", lineHeight: "30px" }}>
              <FontAwesomeIcon icon={faUser} className="me-2" />
              Assigned Users: {project.assigned_users.length ? project.assigned_users.map(user => user.username).join(', ') : 'None'}
            </p>
          </div>
        </Col>
      ))}
    </Row>
      {/* Modal for adding a project */}
      <Modal show={showAddModal} onHide={handleCloseAddModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddProjectSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                isInvalid={!!errors.description}
              />
              <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formStartDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={handleInputChange}
                isInvalid={!!errors.start_date}
              />
              <Form.Control.Feedback type="invalid">{errors.start_date}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formEndDate">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                name="end_date"
                value={formData.end_date}
                onChange={handleInputChange}
                isInvalid={!!errors.end_date}
              />
              <Form.Control.Feedback type="invalid">{errors.end_date}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formAssignedUsers">
              <Form.Label>Assign Users</Form.Label>
              <Select
                isMulti
                options={usernames.map(user => ({ value: user.id, label: user.username }))}
                value={formData.assigned_users.map(id => usernames.find(user => user.id === id)).map(user => ({ value: user.id, label: user.username }))}
                onChange={selectedOptions => setFormData({ ...formData, assigned_users: selectedOptions.map(option => option.value) })}
                isInvalid={!!errors.assigned_users}
              />
              <Form.Control.Feedback type="invalid">{errors.assigned_users}</Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit">
              Add Project
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal for editing a project */}
      <Modal show={showEditModal} onHide={handleCloseEditModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditProjectSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                isInvalid={!!errors.description}
              />
              <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formStartDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={handleInputChange}
                isInvalid={!!errors.start_date}
              />
              <Form.Control.Feedback type="invalid">{errors.start_date}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formEndDate">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                name="end_date"
                value={formData.end_date}
                onChange={handleInputChange}
                isInvalid={!!errors.end_date}
              />
              <Form.Control.Feedback type="invalid">{errors.end_date}</Form.Control.Feedback>
            </Form.Group>
            <Form>
              <Form>
                <Form.Group controlId="formAssignedUsers">
                  <Form.Label>Assign Users</Form.Label>
                  <Select
                    isMulti
                    options={usernames.map(user => ({ value: user.id, label: user.username }))}
                    value={formData.assigned_users.map(id => {
                      const user = usernames.find(user => user.id === id);
                      return user ? { value: user.id, label: user.username } : null;
                    })}
                    onChange={selectedOptions =>
                      setFormData({
                        ...formData,
                        assigned_users: selectedOptions ? selectedOptions.map(option => option.value) : []
                      })
                    }
                    isInvalid={!!errors.assigned_users}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.assigned_users}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Display assigned usernames dynamically */}
                {/* <div className="assigned-users-list mt-3">
        <strong>Assigned Users:</strong>
        {assignedUsernames.length > 0 ? (
          <ul>
            {assignedUsernames.map((username, index) => (
              <li key={index}>{username}</li>
            ))}
          </ul>
        ) : (
          <p>No users assigned yet.</p>
        )}
      </div> */}
              </Form>
            </Form>
            <Button variant="primary" type="submit">
              Update Project
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default Projects;
