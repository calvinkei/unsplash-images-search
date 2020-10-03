import {
  Avatar,
  Dialog,
  DialogTitle,
  Icon,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@material-ui/core'
import React from 'react'
import { FavList } from '../contexts/FavListsContext'

interface SelectListModalProps {
  open: boolean
  onClose(): void
  lists: FavList[]
  onSelect(list: FavList): void
  onAddListClick(): void
}

const SelectListModal: React.FC<SelectListModalProps> = ({
  open,
  onClose,
  lists,
  onSelect,
  onAddListClick,
}) => {
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Select a List</DialogTitle>
      <List>
        {lists.map((list) => (
          <ListItem button onClick={() => onSelect(list)} key={list.id}>
            <ListItemText primary={list.title} secondary={list.description} />
            <Icon>keyboard_arrow_right</Icon>
          </ListItem>
        ))}
        <ListItem button onClick={onAddListClick}>
          <ListItemAvatar>
            <Avatar>
              <Icon>add</Icon>
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Add a New List" />
        </ListItem>
      </List>
    </Dialog>
  )
}

export default SelectListModal
