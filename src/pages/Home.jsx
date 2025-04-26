import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Box,
  ToggleButtonGroup,
  ToggleButton,
  IconButton,
  Paper,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { format } from "date-fns";

function Home({ searchQuery }) {
  const [posts, setPosts] = useState([]);
  const [sortBy, setSortBy] = useState("time");
  const navigate = useNavigate();

  useEffect(() => {
    // In a real app, this would fetch from an API
    const mockPosts = [
      {
        id: 1,
        title: "The Future of AI in Healthcare",
        content:
          "Exploring how AI is revolutionizing healthcare with predictive diagnostics, personalized treatment plans, and automated image analysis...",
        upvotes: 142,
        createdAt: new Date("2024-03-15"),
      },
      {
        id: 2,
        title: "Machine Learning Basics: A Comprehensive Guide",
        content:
          "Understanding fundamental ML concepts, algorithms, and practical applications for beginners...",
        upvotes: 98,
        createdAt: new Date("2024-03-14"),
      },
      {
        id: 3,
        title: "GPT-4's Impact on Natural Language Processing",
        content:
          "Analyzing the breakthroughs and potential applications of OpenAI's latest language model...",
        upvotes: 256,
        createdAt: new Date("2024-03-16"),
      },
      {
        id: 4,
        title: "Ethics in Artificial Intelligence: Key Considerations",
        content:
          "Discussing the ethical implications of AI development and deployment in society...",
        upvotes: 189,
        createdAt: new Date("2024-03-13"),
      },
      {
        id: 5,
        title: "Deep Learning vs Traditional Machine Learning",
        content:
          "Comparing the approaches, use cases, and performance of different ML paradigms...",
        upvotes: 167,
        createdAt: new Date("2024-03-12"),
      },
      {
        id: 6,
        title: "Building Your First Neural Network with PyTorch",
        content:
          "Step-by-step tutorial on creating and training a basic neural network...",
        upvotes: 145,
        createdAt: new Date("2024-03-11"),
      },
      {
        id: 7,
        title: "AI in Climate Change: Solutions and Challenges",
        content:
          "How artificial intelligence is helping combat environmental challenges...",
        upvotes: 203,
        createdAt: new Date("2024-03-15"),
      },
      {
        id: 8,
        title: "The Rise of Computer Vision Applications",
        content:
          "Exploring real-world implementations of CV technology across industries...",
        upvotes: 132,
        createdAt: new Date("2024-03-14"),
      },
      {
        id: 9,
        title: "Reinforcement Learning in Game Development",
        content: "How RL is revolutionizing NPC behavior and game testing...",
        upvotes: 178,
        createdAt: new Date("2024-03-13"),
      },
      {
        id: 10,
        title: "AI-Powered Recommendation Systems",
        content: "Deep dive into how modern recommendation engines work...",
        upvotes: 156,
        createdAt: new Date("2024-03-12"),
      },
    ];
    setPosts(mockPosts);
  }, []);

  const handleSortChange = (event, newSortBy) => {
    if (newSortBy !== null) {
      setSortBy(newSortBy);
    }
  };

  const handleUpvote = (postId) => {
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, upvotes: post.upvotes + 1 } : post
      )
    );
  };

  const filteredPosts = posts
    .filter((post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "time") {
        return b.createdAt - a.createdAt;
      }
      return b.upvotes - a.upvotes;
    });

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "100%",
        p: { xs: 2, sm: 3 },
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          maxWidth: 1200,
          mx: "auto",
          width: "100%",
        }}
      >
        <Box
          sx={{
            mb: 4,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "#1976d2" }}
          >
            Latest Discussions
          </Typography>
          <Paper
            elevation={0}
            sx={{ backgroundColor: "#f5f5f5", p: 0.5, borderRadius: 2 }}
          >
            <ToggleButtonGroup
              value={sortBy}
              exclusive
              onChange={handleSortChange}
              sx={{
                "& .MuiToggleButton-root": {
                  border: "none",
                  borderRadius: 1.5,
                  px: 3,
                  "&.Mui-selected": {
                    backgroundColor: "white",
                    color: "#1976d2",
                    "&:hover": {
                      backgroundColor: "white",
                    },
                  },
                },
              }}
            >
              <ToggleButton value="time">Latest</ToggleButton>
              <ToggleButton value="upvotes">Most Upvoted</ToggleButton>
            </ToggleButtonGroup>
          </Paper>
        </Box>

        {filteredPosts.map((post) => (
          <Card
            key={post.id}
            sx={{
              mb: 2,
              cursor: "pointer",
              transition: "transform 0.2s, box-shadow 0.2s",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: 3,
              },
            }}
            onClick={() => navigate(`/post/${post.id}`)}
          >
            <CardContent sx={{ p: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: 2,
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      fontWeight: "500",
                      color: "#2c3e50",
                      mb: 1,
                    }}
                  >
                    {post.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {post.content.length > 150
                      ? `${post.content.substring(0, 150)}...`
                      : post.content}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      {format(post.createdAt, "MMM d, yyyy")}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#f5f5f5",
                    borderRadius: 2,
                    p: 0.5,
                    height: "fit-content",
                  }}
                >
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUpvote(post.id);
                    }}
                    sx={{
                      color: "#1976d2",
                      "&:hover": {
                        backgroundColor: "rgba(25, 118, 210, 0.1)",
                      },
                    }}
                  >
                    <ThumbUpIcon />
                  </IconButton>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: "bold",
                      color: "#1976d2",
                      minWidth: "2rem",
                      textAlign: "center",
                    }}
                  >
                    {post.upvotes}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

export default Home;
