import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  IconButton,
  Divider,
  Card,
  CardContent,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { format } from "date-fns";

function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // In a real app, this would fetch from an API
    const mockPost = {
      id: parseInt(id),
      title: "The Future of AI in Healthcare",
      content: "Exploring how AI is revolutionizing healthcare...",
      imageUrl: "https://example.com/ai-healthcare.jpg",
      upvotes: 42,
      createdAt: new Date("2024-03-15"),
    };
    setPost(mockPost);

    const mockComments = [
      {
        id: 1,
        content: "Great article! AI is indeed transforming healthcare.",
        createdAt: new Date("2024-03-15"),
      },
      {
        id: 2,
        content: "I would love to learn more about specific applications.",
        createdAt: new Date("2024-03-16"),
      },
    ];
    setComments(mockComments);
  }, [id]);

  const handleUpvote = () => {
    setPost((prev) => ({
      ...prev,
      upvotes: prev.upvotes + 1,
    }));
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    const newComment = {
      id: comments.length + 1,
      content: comment,
      createdAt: new Date(),
    };
    setComments([...comments, newComment]);
    setComment("");
  };

  const handleDelete = () => {
    // In a real app, this would send a delete request to an API
    navigate("/");
  };

  if (!post) return null;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Typography variant="h4" gutterBottom>
            {post.title}
          </Typography>
          <Box>
            <IconButton onClick={handleUpvote}>
              <ThumbUpIcon />
            </IconButton>
            <Typography variant="body2" component="span">
              {post.upvotes}
            </Typography>
          </Box>
        </Box>

        <Typography variant="body2" color="text.secondary" gutterBottom>
          Posted on {format(post.createdAt, "MMM d, yyyy")}
        </Typography>

        <Typography variant="body1" paragraph>
          {post.content}
        </Typography>

        {post.imageUrl && (
          <Box sx={{ my: 2 }}>
            <img
              src={post.imageUrl}
              alt={post.title}
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </Box>
        )}

        <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            onClick={() => navigate(`/edit/${id}`)}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h6" gutterBottom>
          Comments
        </Typography>

        <form onSubmit={handleCommentSubmit}>
          <TextField
            fullWidth
            multiline
            rows={3}
            placeholder="Write a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" type="submit" disabled={!comment.trim()}>
            Post Comment
          </Button>
        </form>

        <Box sx={{ mt: 4 }}>
          {comments.map((comment) => (
            <Card key={comment.id} sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="body1">{comment.content}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {format(comment.createdAt, "MMM d, yyyy")}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Paper>
    </Container>
  );
}

export default PostDetail;
