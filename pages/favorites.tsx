import React from 'react'
import { Box, Container, Icon, IconButton, makeStyles, Typography } from '@material-ui/core'
import groupBy from 'lodash/groupBy'
import ImageGridList from '../components/ImageGridList'
import { FavList, useFavListsContext } from '../contexts/FavListsContext'
import NavBar from '../components/NavBar'
import UpdateListModal from '../components/UpdateListModal'
import ConfirmDialog from '../components/ConfirmDialog'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(8),
  },
  gridList: {
    overflow: 'hidden',
  },
  icon: {
    color: theme.palette.common.white,
  },
  avatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    marginRight: theme.spacing(1),
  },
}))

const ImageSearchPage: React.FC = () => {
  const classes = useStyles()
  const [updatingList, setUpdatingList] = React.useState<FavList | undefined>(undefined)
  const [deletingList, setDeletingList] = React.useState<FavList | undefined>(undefined)
  const { favImages, favLists, removeFavImage, updateFavList, removeFavList } = useFavListsContext()
  const imagesByList = React.useMemo(
    () => groupBy(Object.values(favImages), (image) => image.listId),
    [favImages]
  )

  return (
    <Container className={classes.root} maxWidth="md">
      <NavBar activeTab="/favorites" />
      {favLists.map((list) => (
        <Box mt={4}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h4">{list.title}</Typography>
              <Typography color="textSecondary" gutterBottom>
                {list.description}
              </Typography>
            </Box>
            <Box display="flex">
              <IconButton color="primary" onClick={() => setUpdatingList(list)}>
                <Icon>edit</Icon>
              </IconButton>
              <IconButton color="secondary" onClick={() => setDeletingList(list)}>
                <Icon>delete</Icon>
              </IconButton>
            </Box>
          </Box>
          <ImageGridList
            images={imagesByList[list.id].map(({ image }) => ({ image, isFav: true }))}
            onFavClick={({ image }) => removeFavImage(image.id)}
          />
        </Box>
      ))}
      <UpdateListModal
        open={!!updatingList}
        onClose={() => setUpdatingList(undefined)}
        onConfirm={(list) => updateFavList({ id: updatingList!.id, ...list })}
        list={updatingList}
      />
      <ConfirmDialog
        title="Warning"
        message={deletingList ? `Are you sure to remove ${deletingList.title}` : ''}
        open={!!deletingList}
        onClose={() => setDeletingList(undefined)}
        onConfirm={() => removeFavList(deletingList!.id)}
      />
    </Container>
  )
}

export default ImageSearchPage
