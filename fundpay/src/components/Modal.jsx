import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { PutNewPwd } from './ApiServices';
import SignIn from './SignIn';
import { useNavigate } from 'react-router-dom';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  padding: '50px',
  display: 'grid',
  gap: '15px',
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(true);
  const handleClose = () => setOpen(false);

  const [newPwd, setNewPwd] = React.useState("")
  const [confirmNewPwd, setConfirmNewPwd] = React.useState("")
  const navigate=useNavigate();

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Enter New Password
          </Typography>
          <TextField id="new-pwd" placeholder='Enter New Password ' variant="outlined"
            value={newPwd} onChange={(e) => setNewPwd(e.target.value)} />
          <TextField id="confirm-new-pwd" placeholder='Confirm New Password ' variant="outlined"
            value={confirmNewPwd} onChange={(e) => setConfirmNewPwd(e.target.value)} />
          <Button variant="contained" style={{ background: "rgba(207, 167, 103, 1)" }}
            onClick={async() => {
              if (document.getElementById("new-pwd").value != document.getElementById("confirm-new-pwd").value) {
                alert("Confirm Password Does't Match")
                document.getElementById("new-pwd").value="";
                document.getElementById("confirm-new-pwd").value="";
              }
              else {

                try {
                  var newPwdRes=await PutNewPwd({ newPwd: newPwd })
                  console.log(newPwdRes.message);
                  sessionStorage.removeItem("forgotPwdToken")
                  handleClose();
                  navigate("/")
                } catch (error) {
                  console.log(error);
                }
              }
            }}
          >Reset</Button>
        </Box>
      </Modal>
    </div>
  );
}