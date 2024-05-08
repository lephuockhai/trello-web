import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

export const DeleteColumnConfirm = ({ open, handleClose, handleConfirm}) => {
    return (
        <Dialog
            open={open}
            keepMounted
            onClose={handleClose}
            aria-describedby='confirm-delete'    
        >
            <DialogTitle>{"Are you sure that you want to delete this Column"}</DialogTitle>
            <DialogContent>
                <DialogContentText id='confirm-delete'>
                    After confirm delete column. a lot of card in this column will be delete.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} >Disagree</Button>
                <Button onClick={handleConfirm} >Agree</Button>
            </DialogActions>
        </Dialog>
    )
}