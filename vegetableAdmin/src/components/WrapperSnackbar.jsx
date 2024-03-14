import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';

export default function WrapperSnackbar(props) {
  const [state, setState] = React.useState({
    // open: props.data.state,
    // open: true,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = state;

  const handleClick = (newState) => () => {
    setState({ ...newState, open: true });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };
  // console.log(props.children);
  // console.log(props.data.state);

  return (
    <>
    {/* {console.log(`rendered=>${state.open}`)} */}
    {props.children}
      <Box sx={{ width: 500 }}>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={handleClose}
          // message={props.data.message}
          key={vertical + horizontal}
          autoHideDuration={1000}
        />
      </Box>
    </>
  );
}