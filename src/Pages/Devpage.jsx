import React, { useState } from 'react'
import { Button, Col, Container, Row, Modal, Form } from 'react-bootstrap'
import Axios from '../Axios/Axios'
const Devpage = () => {
    const [showModal, setShowModal] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        start_date: '',
        end_date: '',
        created_by: '',
        assigned_users: ''
    })
    const [errors, setErrors] = useState({})

    const handleShow = () => setShowModal(true)
    const handleClose = () => setShowModal(false)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            // Validate form data here and set errors
            if (!formData.name) {
                setErrors((prev) => ({ ...prev, name: 'Name is required' }))
                return
            }
            // Add other validations as needed

            await Axios.post('projects/create/', formData)
            handleClose()
        } catch (error) {
            console.error('Error submitting form', error)
        }
    }

    return (
        <div>
            <Container className="dashboard-container py-4">
                <Row className="align-items-center">
                    <Col xs={9} md={10} className="text">
                        <h1 className="section-title p-1">Developer Project details</h1>
                    </Col>
                    <Col xs={3} md={2} className="text-end">
                        <Button className="w-100 w-md-50" onClick={handleShow}>
                            Add
                        </Button>
                    </Col>
                    <Col xs={12}>
                        <hr className="text-dark" />
                    </Col>
                </Row>
            </Container>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Project Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                isInvalid={!!errors.name}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.name}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                isInvalid={!!errors.description}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.description}
                            </Form.Control.Feedback>
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
                            <Form.Control.Feedback type="invalid">
                                {errors.start_date}
                            </Form.Control.Feedback>
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
                            <Form.Control.Feedback type="invalid">
                                {errors.end_date}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formCreatedBy">
                            <Form.Label>Created By</Form.Label>
                            <Form.Control
                                type="text"
                                name="created_by"
                                value={formData.created_by}
                                onChange={handleInputChange}
                                isInvalid={!!errors.created_by}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.created_by}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formAssignedUsers">
                            <Form.Label>Assigned Users</Form.Label>
                            <Form.Control
                                type="text"
                                name="assigned_users"
                                value={formData.assigned_users}
                                onChange={handleInputChange}
                                isInvalid={!!errors.assigned_users}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.assigned_users}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-3">
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Devpage
