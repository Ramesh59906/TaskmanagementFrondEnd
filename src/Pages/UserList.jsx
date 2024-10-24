import axios from 'axios';
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const CreateStudent = () => {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gender: '',
        street: '',
        city: '',
        zip: '',
        country: '',
        email: '',
        phone: '',
        gpa: '',
        // image: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const studentData = {
            name: formData.name,
            age: parseInt(formData.age),
            gender: formData.gender,
            address: {
                street: formData.street,
                city: formData.city,
                zip: formData.zip,
                country: formData.country
            },
            email: formData.email,
            phone: formData.phone,
            gpa: parseFloat(formData.gpa),
            // image: formData.image
        };

        axios.post("https://freetestapi.com/api/v1/students", studentData)
            .then(res => {
                console.log("Student created successfully:", res.data);
                // You can clear the form or show a success message
            })
            .catch(err => console.log(err));
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>Age</Form.Label>
                <Form.Control
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>Gender</Form.Label>
                <Form.Control
                    as="select"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label>Street</Form.Label>
                <Form.Control
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>City</Form.Label>
                <Form.Control
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>ZIP Code</Form.Label>
                <Form.Control
                    type="text"
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>Country</Form.Label>
                <Form.Control
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>Phone</Form.Label>
                <Form.Control
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>GPA</Form.Label>
                <Form.Control
                    type="number"
                    step="0.01"
                    name="gpa"
                    value={formData.gpa}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            {/* <Form.Group>
                <Form.Label>Image URL</Form.Label>
                <Form.Control
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    required
                />
            </Form.Group> */}

            <Button variant="primary" type="submit">
                Create Student
            </Button>
        </Form>
    );
};

export default CreateStudent;
