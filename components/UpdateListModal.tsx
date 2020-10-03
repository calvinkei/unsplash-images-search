import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@material-ui/core'
import React from 'react'
import get from 'lodash/get'
import { FavList } from '../contexts/FavListsContext'

interface UpdateListModalProps {
  open: boolean
  onClose(): void
  onConfirm(list: Omit<FavList, 'id'>): void
  list?: FavList
}

const UpdateListModal: React.FC<UpdateListModalProps> = ({ open, onClose, onConfirm, list }) => {
  const [title, setTitle] = React.useState(get(list, 'title', ''))
  const [description, setDescription] = React.useState(get(list, 'description', ''))

  React.useEffect(() => {
    setTitle(get(list, 'title', ''))
    setDescription(get(list, 'description', ''))
  }, [list])
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>{list ? 'Update List' : 'Create List'}</DialogTitle>
      <DialogContent>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button
          color="primary"
          autoFocus
          onClick={() => {
            onConfirm({ title, description })
            setTitle('')
            setDescription('')
            onClose()
          }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default UpdateListModal
