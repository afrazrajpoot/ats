// src/App.js
import React, { useState } from "react";

// Comment Component
const Comment = ({ comment, addReply }) => {
  const [showReplies, setShowReplies] = useState(false);
  const [newReply, setNewReply] = useState("");

  const handleAddReply = () => {
    addReply(comment.id, newReply);
    setNewReply("");
  };

  return (
    <div
      style={{
        marginLeft: `${comment.level * 20}px`,
        border: "1px solid #ddd",
        padding: "10px",
        marginBottom: "10px",
      }}
    >
      <div>{comment.text}</div>
      <button onClick={() => setShowReplies(!showReplies)}>
        {showReplies ? "Hide Replies" : "Show Replies"}
      </button>
      <div>
        <textarea
          value={newReply}
          onChange={(e) => setNewReply(e.target.value)}
          placeholder="Add a reply..."
        />
        <button onClick={handleAddReply}>Reply</button>
      </div>
      {showReplies &&
        comment.replies.map((reply) => (
          <Comment key={reply.id} comment={reply} addReply={addReply} />
        ))}
    </div>
  );
};

// App Component
const Comments = () => {
  const [comments, setComments] = useState([
    {
      id: 1,
      text: "This is the first comment",
      replies: [],
      level: 0,
    },
    {
      id: 2,
      text: "This is the second comment",
      replies: [],
      level: 0,
    },
  ]);

  const addReply = (parentId, replyText) => {
    const addReplyRecursive = (comments) => {
      return comments.map((comment) => {
        if (comment.id === parentId) {
          return {
            ...comment,
            replies: [
              ...comment.replies,
              {
                id: Date.now(), // Simple ID generator
                text: replyText,
                replies: [],
                level: comment.level + 1,
              },
            ],
          };
        }
        return {
          ...comment,
          replies: addReplyRecursive(comment.replies),
        };
      });
    };

    setComments(addReplyRecursive(comments));
  };

  return (
    <div>
      <h1>Comments</h1>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} addReply={addReply} />
      ))}
    </div>
  );
};

export default Comments;
