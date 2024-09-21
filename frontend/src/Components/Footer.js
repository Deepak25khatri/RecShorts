import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const Footer = () => {
  return (
    <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
      <Container maxWidth="md">
        <Toolbar>
          <Typography variant="body2" color="inherit" align="center" sx={{ flexGrow: 1 }}>
            {/* © 2024 Project by - (Deepak Khatri, Nirmal Shah) <br/> */}
            Credits to @<a target='_blank' href='https://www.thehindu.com/' className=' text-blue-800 font-semibold'>The Hindu News</a> For News Data
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Footer;
