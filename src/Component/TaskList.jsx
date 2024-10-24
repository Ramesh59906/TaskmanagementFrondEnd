import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import CommentModal from './CommentModal';

const TaskList = ({ tasks }) => {
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const handleCommentClick = (taskId) => {
    setSelectedTaskId(taskId);
    setShowCommentModal(true);
  };

  return (
    <div>
      {/* Task List Display */}
      {tasks.map((task) => (
        <div key={task.id}>
          <h5>{task.title}</h5>
          <Button onClick={() => handleCommentClick(task.id)}>Comment</Button>
        </div>
      ))}

      {/* Comment Modal */}
      <CommentModal
        show={showCommentModal}
        handleClose={() => setShowCommentModal(false)}
        taskId={selectedTaskId}
      />
    </div>
  );
};

export default TaskList;
