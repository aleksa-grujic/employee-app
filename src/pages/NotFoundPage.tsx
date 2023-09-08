// src/pages/NotFoundPage.tsx
import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  return (
    <Container
      maxWidth="sm"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center",
      }}
    >
      <Box mb={4}>
        <Typography variant="h1" gutterBottom>
          404
        </Typography>
        <Typography variant="h4">Page Not Found</Typography>
      </Box>
      <Box>
        <Typography variant="body1" paragraph>
          The page you are looking for doesn’t exist or another error occurred.
        </Typography>
        <Button variant="contained" color="primary" component={Link} to="/">
          Go Home
        </Button>
      </Box>
    </Container>
  );
};

export default NotFoundPage;
