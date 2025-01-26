import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Tooltip } from '@mui/material'
import { useState, isValidElement, cloneElement } from 'react'

const ConfirmationModal = ({
  label,
  content,
  dialogContentText,
  callbackFn,
  confirmButtonText = 'Proceed',
  children
}) => {
  const [open, setOpen] = useState(false)

  const handleConfirm = () => {
    setOpen(false)
    callbackFn()
  }

  const handleOpen = () => setOpen(true)

  const getButtonColor = text => {
    switch (text.toLowerCase()) {
      case 'delete':
        return 'error'
      case 'accept':
      case 'confirm':
      case 'proceed':
        return 'success'
      default:
        return 'primary'
    }
  }

  const renderChildrenWithProps = () => {
    if (isValidElement(children)) {
      return cloneElement(children, { onClick: handleOpen })
    }

    return children
  }

  return (
    <>
      <Tooltip title={label}>{renderChildrenWithProps()}</Tooltip>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{content ?? 'Are you sure?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {dialogContentText ?? 'This action cannot be undone.'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color='secondary' onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} color={getButtonColor(confirmButtonText)} autoFocus>
            {confirmButtonText}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ConfirmationModal
