
import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import Select from 'react-select'; // Make sure to install react-select
import Axios from '../Axios/Axios';
import { ScaleLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Importing icons
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
const Taskmanage = () => {

    const [tasks, setTasks] = useState([]);
    const [projects, setProjects] = useState([]);
    const [usernames, setUsernames] = useState([]); // New state for users
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        assigned_to: '',
        priority: 'medium',
        due_date: '',
        project: '',
    });

    const handleExport = async () => {
        try {
          // Fetch JSON data from the API
          const response = await Axios.post('generate_task_report/');
          const reportData = response.data.report;
      
          // Flatten the data into arrays for each task category
          const completedTasks = reportData.completed_tasks.map(task => ({
            ...task,
            status: 'Completed'
          }));
      
          const inProgressTasks = reportData.in_progress_tasks.map(task => ({
            ...task,
            status: 'In Progress'
          }));
      
          const overdueTasks = reportData.overdue_tasks.map(task => ({
            ...task,
            status: 'Overdue'
          }));
      
          const pendingTasks = reportData.pending_tasks.map(task => ({
            ...task,
            status: 'Pending'
          }));
      
          // Initialize a new workbook
          const workbook = XLSX.utils.book_new();
      
          // Create summary data
          const summaryData = [
            { metric: "Total Tasks", value: reportData.total_tasks },
            { metric: "Completed Tasks Count", value: reportData.completed_tasks_count },
            { metric: "In Progress Tasks Count", value: reportData.in_progress_tasks_count },
            { metric: "Overdue Tasks Count", value: reportData.overdue_tasks_count },
            { metric: "Pending Tasks Count", value: reportData.pending_tasks_count },
            { metric: "Completion Percentage", value: `${reportData.completion_percentage}%` }
          ];
      
          // Add summary sheet
          const summarySheet = XLSX.utils.json_to_sheet(summaryData);
          XLSX.utils.book_append_sheet(workbook, summarySheet, "Summary");
      
          // Add individual sheets for each task category
          const completedSheet = XLSX.utils.json_to_sheet(completedTasks);
          XLSX.utils.book_append_sheet(workbook, completedSheet, "Completed Tasks");
      
          const inProgressSheet = XLSX.utils.json_to_sheet(inProgressTasks);
          XLSX.utils.book_append_sheet(workbook, inProgressSheet, "In Progress Tasks");
      
          const overdueSheet = XLSX.utils.json_to_sheet(overdueTasks);
          XLSX.utils.book_append_sheet(workbook, overdueSheet, "Overdue Tasks");
      
          const pendingSheet = XLSX.utils.json_to_sheet(pendingTasks);
          XLSX.utils.book_append_sheet(workbook, pendingSheet, "Pending Tasks");
      
          // Optionally, add a sheet with all tasks combined
          const allTasks = [
            ...completedTasks,
            ...inProgressTasks,
            ...overdueTasks,
            ...pendingTasks
          ];
          const allTasksSheet = XLSX.utils.json_to_sheet(allTasks);
          XLSX.utils.book_append_sheet(workbook, allTasksSheet, "All Tasks");
      
          // Write the workbook to a file and trigger download
          XLSX.writeFile(workbook, 'Task_Report.xlsx');
        } catch (error) {
          console.error("Error exporting data:", error);
        }
      };
      
      
      
    useEffect(() => {
        const fetchTasksAndProjects = async () => {
            try {
                const [tasksResponse, projectsResponse, usersResponse] = await Promise.all([
                    Axios.get('tasks/'),
                    Axios.get('projects/'),
                    Axios.get('users/') // Fetch users for assignment
                ]);
                setTasks(tasksResponse.data.tasks);
                setProjects(projectsResponse.data.projects);
                setUsernames(usersResponse.data.users); // Set users in state
                setLoading(false);
            } catch (err) {
                setError('Error fetching data');
                setLoading(false);
            }
        };

        fetchTasksAndProjects();
    }, []);

    const handleInputChange = (e) => {
        setNewTask({
            ...newTask,
            [e.target.name]: e.target.value,
        });
    };

    const handleAssignedUsersChange = (selectedUserId) => {
        setNewTask({
            ...newTask,
            assigned_to: selectedUserId,
        });
    };

    const navigate=useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const sanitizedTask = {
                ...newTask,
                assigned_to: newTask.assigned_to, // Ensure this is a valid ObjectId
            };

            if (editMode) {
                // Update task
                const updateResponse = await Axios.put(`tasks/update/${taskToEdit.id}/`, sanitizedTask);

                if (updateResponse.data.error) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Oops...',
                        text: updateResponse.data.error,
                    });
                    return;
                }

                // Update the task in the list
                const updatedTasks = tasks.map(task => (task.id === taskToEdit.id ? updateResponse.data.task : task));
                setTasks(updatedTasks);
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Task updated successfully!',
                });
                navigate('/Dashbord')
                setTimeout(() => {
                navigate('/Dashbord/Taskmanage')
                    
                }, 100);
            } else {
                // Create new task
                const createResponse = await Axios.post('tasks/create/', sanitizedTask);
                if (createResponse.data.error) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Oops...',
                        text: createResponse.data.error,
                    });
                    return;
                }

                // Add new task to the list
                setTasks([...tasks, createResponse.data.task]);
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Task created successfully!',
                });
            }

            setShowModal(false); // Close modal after task creation/update
            resetForm();
        } catch (err) {
            // console.error('Error saving task:', err);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error saving task. Please try again.',
            });
        }
    };

    const handleEdit = (task) => {
        setTaskToEdit(task);
        setNewTask({
            title: task.title,
            description: task.description,
            assigned_to: task.assigned_to.id,
            priority: task.priority,
            due_date: task.due_date,
            project: task.project.id,
        });
        setEditMode(true);
        setShowModal(true);
    };

    const handleDelete = async (taskId) => {
        const confirmDelete = await Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });

        if (confirmDelete.isConfirmed) {
            try {
               const res= await Axios.delete(`tasks/delete/${taskId}/`);
                const {message}=res.data;
                setTasks(tasks.filter(task => task.id !== taskId)); // Remove the deleted task from the state
                Swal.fire('Deleted!',message, 'success');
            } catch (err) {
                console.error('Error deleting task:', err);
                Swal.fire('Error!',err, 'error');
            }
        }
    };

    const resetForm = () => {
        setNewTask({
            title: '',
            description: '',
            assigned_to: '',
            priority: 'medium',
            due_date: '',
            project: '',
        });
        setEditMode(false);
        setTaskToEdit(null);
    };

    if (loading) {
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <ScaleLoader color="#008287" loading={loading} size={200} />
            </div>
        );
    }

    return (
        <div className="container mt-4 bg-white p-md-4 mb-5 rounded">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                <h2>Task Details</h2>
                </div>
                <div>
                <Button variant="primary" onClick={() => setShowModal(true)}>Create Task</Button>
                <Button variant="secondary" onClick={handleExport} style={{ marginLeft: '10px' }}>
                    Export
                </Button>
                </div>

            

            </div>
            <hr className='text-black' />

            {error ? (
                <p>{error}</p>
            ) : (
                <Table bordered hover responsive className="mt-3 table table-hover table-border table-hover p-3 mb-5 bg-white rounded">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Assigned To</th>
                            <th>Priority</th>
                            <th>Status</th>
                            <th>Due Date</th>
                            <th>Created At</th>
                            <th>Updated At</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.length > 0 ? (
                            tasks.map((task) => (
                                <tr key={task.id}>
                                    <td>{task.title}</td>
                                    <td>{task.description}</td>
                                    <td>{task.assigned_to ? task.assigned_to.username : 'None'}</td>
                                    <td>{task.priority}</td>
                                    <td>{task.status}</td>
                                    <td>{task.due_date}</td>
                                    <td>{new Date(task.created_at).toLocaleString()}</td>
                                    <td>{new Date(task.updated_at).toLocaleString()}</td>
                                    <td className='d-flex justify-content-between mt-3'>
                                        {/* <Button variant="warning" > */}
                                            <FaEdit onClick={() => handleEdit(task)} className='text-warning' /> 
                                        {/* </Button> */}
                                        {/* <Button variant="danger" className="ms-2"> */}
                                            <FaTrash  onClick={() => handleDelete(task.id)} className='text-danger' /> 
                                        {/* </Button> */}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" className="text-center">No tasks available</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            )}

            {/* Modal for creating/updating a task */}
            <Modal show={showModal} onHide={() => { setShowModal(false); resetForm(); }}>
                <Modal.Header closeButton>
                    <Modal.Title>{editMode ? 'Edit Task' : 'Create New Task'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="taskTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={newTask.title}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="taskDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="description"
                                value={newTask.description}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="taskAssignedTo">
                            <Form.Label>Assigned To</Form.Label>
                            <Select
                                options={usernames.map(user => ({ value: user.id, label: user.username }))}
                                onChange={selected => handleAssignedUsersChange(selected.value)}
                                placeholder="Select user..."
                                isClearable
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="taskPriority">
                            <Form.Label>Priority</Form.Label>
                            <Form.Select
                                name="priority"
                                value={newTask.priority}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="taskDueDate">
                            <Form.Label>Due Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="due_date"
                                value={newTask.due_date}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="taskProject">
                            <Form.Label>Project</Form.Label>
                            <Form.Select
                                name="project"
                                value={newTask.project}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select project...</option>
                                {projects.map(project => (
                                    <option key={project.id} value={project.id}>{project.name}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            {editMode ? 'Update Task' : 'Create Task'}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Taskmanage;
