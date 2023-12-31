import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

export default function Header() {
  return (
    <div className="header">
      <AppBar position="sticky" style={{ marginBottom: '10px' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}></IconButton>
          <Typography variant="h6" component="div">
            What's your favourite recipe?
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
