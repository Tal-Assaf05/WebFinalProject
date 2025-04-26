import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  TextField,
  Box,
  InputAdornment,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";

function Navbar({ onSearch }) {
  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "#1976d2",
        boxShadow: "none",
        borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
        width: "100%",
      }}
    >
      <Toolbar sx={{ px: 3, minHeight: 64, width: "100%" }}>
        <Typography
          variant="h5"
          component={RouterLink}
          to="/"
          sx={{
            textDecoration: "none",
            color: "inherit",
            fontWeight: "bold",
            flexShrink: 0,
            mr: 4,
          }}
        >
          HobbyHub
        </Typography>
        <TextField
          size="small"
          placeholder="Search posts..."
          onChange={(e) => onSearch(e.target.value)}
          sx={{
            flexGrow: 1,
            maxWidth: 600,
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            borderRadius: 1,
            "& .MuiOutlinedInput-root": {
              color: "white",
              "& fieldset": {
                borderColor: "rgba(255, 255, 255, 0.3)",
              },
              "&:hover fieldset": {
                borderColor: "rgba(255, 255, 255, 0.5)",
              },
              "&.Mui-focused fieldset": {
                borderColor: "white",
              },
            },
            "& .MuiInputBase-input::placeholder": {
              color: "rgba(255, 255, 255, 0.7)",
              opacity: 1,
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "rgba(255, 255, 255, 0.7)" }} />
              </InputAdornment>
            ),
          }}
        />
        <Button
          component={RouterLink}
          to="/create"
          variant="contained"
          color="secondary"
          startIcon={<AddIcon />}
          sx={{
            fontWeight: "bold",
            flexShrink: 0,
            backgroundColor: "#f50057",
            ml: 2,
            "&:hover": {
              backgroundColor: "#ff1744",
            },
          }}
        >
          New Post
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
