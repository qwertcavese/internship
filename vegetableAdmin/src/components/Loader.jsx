import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import ResponsiveAppBar from './Navbar';

export default function Loader() {
  return (
    <>
    <ResponsiveAppBar/>
    <Box className="loader">
      <CircularProgress />
    </Box>
    </>
  );
}