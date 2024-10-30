import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import Axios from '../Axios/Axios';

const CommentModal = ({ show, handleClose, taskId }) => {
  const [newComment, setNewComment] = useState('');

  // Handle posting a new comment
  const postComment = async () => {
    try {
      await Axios.post(`/task/${taskId}/comment/`, {
        comment: newComment,
      });
      setNewComment(''); // Clear the comment input
      handleClose(); // Close the modal after posting
    } catch (err) {
      console.error('Error posting comment:', err);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add a Comment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="newComment">
          <Form.Label>Type your comment</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Type your comment..."
          />
        </Form.Group>
        <Button variant="primary" onClick={postComment} className="mt-2">
          Post Comment
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default CommentModal;
