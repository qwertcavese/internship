import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';


const style = {
    position: 'absolute',
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    height: 200,
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    background: "black",
    display: "grid",
    placeItems: "center",
};

export default function BasicModal(props) {
    const [open, setOpen] = React.useState(false);
      const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    if (props.data == "voiceRecognition") {
        return (
            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <div id="modal-modal-description" style={{ color: "white"}}>
                           <MicIcon style={{fontSize:"50px"}}/>
                        </div>
                    </Box>
                </Modal>
            </div>
        );
    }
    else{
        return (
            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <div id="modal-modal-description" style={{ color: "white",background:"red"}}>
                           hello
                        </div>
                    </Box>
                </Modal>
            </div>
        );

    }
}