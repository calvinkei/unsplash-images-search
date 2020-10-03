import React from 'react'
import { Box, CircularProgress, Container, makeStyles } from '@material-ui/core'
import SearchTextField from '../components/SearchTextField'
import ImageGridList from '../components/ImageGridList'
import { UnsplashImage, useFavListsContext } from '../contexts/FavListsContext'
import SelectListModal from '../components/SelectListModal'
import NavBar from '../components/NavBar'
import UpdateListModal from '../components/UpdateListModal'
import useInfiniteScroll from '../hooks/useInfiniteScroll'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(8),
  },
}))

const ImageSearchPage: React.FC = () => {
  const classes = useStyles()
  const [images, setImages] = React.useState<UnsplashImage[]>([])
  const [page, setPage] = React.useState(1)
  const [keyword, setKeyword] = React.useState('')
  const [totalPages, setTotalPages] = React.useState(0)
  const [loading, setLoading] = React.useState(false)
  const [selectedImage, setSelectedImage] = React.useState(null)
  const [isAddListModalOpen, setIsAddListModalOpen] = React.useState(false)
  const { favImages, favLists, addFavList, addFavImage, removeFavImage } = useFavListsContext()

  const imagesWithFavStatus = React.useMemo(
    () => images.map((image) => ({ image, isFav: !!favImages[image.id] })),
    [images, favImages]
  )

  const search = React.useCallback(async (text) => {
    try {
      setKeyword(text)
      setLoading(true)
      const result = await fetch(`/api/images?keyword=${text}&page=${1}`).then((res) => res.json())
      setPage(1)
      setImages(result.results)
      setTotalPages(result.total_pages)
      setLoading(false)
    } catch (err) {
      setLoading(false)
      console.log(err)
    }
  }, [])

  const nextPage = React.useCallback(async () => {
    try {
      setLoading(true)
      const result = await fetch(`/api/images?keyword=${keyword}&page=${page + 1}`).then((res) =>
        res.json()
      )
      setPage((p) => p + 1)
      setImages((imgs) => [...imgs, ...result.results])
      setTotalPages(result.total_pages)
      setLoading(false)
    } catch (err) {
      setLoading(false)
      console.log(err)
    }
  }, [page, totalPages, loading, keyword])

  useInfiniteScroll(nextPage, !loading && totalPages > page)

  return (
    <Container className={classes.root} maxWidth="md">
      <NavBar activeTab="/" />
      <SearchTextField onChangeText={search} />
      <ImageGridList
        images={imagesWithFavStatus}
        onFavClick={({ image, isFav }) =>
          isFav ? removeFavImage(image.id) : setSelectedImage(image)
        }
      />
      {loading ? (
        <Box display="flex" justifyContent="center" m={4}>
          <CircularProgress />
        </Box>
      ) : null}
      <SelectListModal
        open={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        lists={favLists}
        onSelect={(list) => {
          addFavImage(selectedImage, list.id)
          setSelectedImage(null)
        }}
        onAddListClick={() => setIsAddListModalOpen(true)}
      />
      <UpdateListModal
        open={isAddListModalOpen}
        onClose={() => setIsAddListModalOpen(false)}
        onConfirm={addFavList}
      />
    </Container>
  )
}

export default ImageSearchPage
