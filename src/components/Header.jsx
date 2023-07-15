import { AppBar, Toolbar, Typography, IconButton, Box } from "@mui/material";

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="relative" sx={{ marginBottom: "20px" }}>
          <Typography variant="h6" color="inherit" component="div">
            What's your favorite recipe?
          </Typography>
      </AppBar>
    </Box>
  );
}
