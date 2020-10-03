import React from 'react'
import { GridList, GridListTile, makeStyles } from '@material-ui/core'
import ImageTile from '../components/ImageTile'
import { UnsplashImage } from '../contexts/FavListsContext'

export const GRID_COLS = 3
export const GRID_CELL_HEIGHT = 240

const useStyles = makeStyles(() => ({
  gridList: {
    overflow: 'hidden',
  },
}))

interface ImageWithFavStatus {
  image: UnsplashImage
  isFav: boolean
}

interface ImageGridListProps {
  images: ImageWithFavStatus[]
  onFavClick(image: ImageWithFavStatus): void
}

const ImageGridList: React.FC<ImageGridListProps> = ({ images, onFavClick }) => {
  const classes = useStyles()
  return (
    <GridList className={classes.gridList} cellHeight={GRID_CELL_HEIGHT} cols={GRID_COLS}>
      {images.map(({ image, isFav }) => (
        <GridListTile key={image.id} cols={1}>
          <ImageTile image={image} isFav={isFav} onFavClick={() => onFavClick({ image, isFav })} />
        </GridListTile>
      ))}
    </GridList>
  )
}

export default ImageGridList
