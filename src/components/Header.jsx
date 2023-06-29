import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import IconButton from "@mui/material/IconButton";

export default function Header() {
  return (
    <div className="header">
      <AppBar position="fixed" style={{marginBottom:'20px'}}>
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >

          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            What's your favourite recipe?
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
