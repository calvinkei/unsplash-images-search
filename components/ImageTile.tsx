import React from 'react'
import {
  Avatar,
  Box,
  GridListTileBar,
  Icon,
  IconButton,
  Link,
  makeStyles,
  Typography,
} from '@material-ui/core'
import LazyLoad from 'react-lazyload'
import { GRID_CELL_HEIGHT } from './ImageGridList'
import { UnsplashImage } from '../contexts/FavListsContext'

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.common.white,
  },
  activeIcon: {
    color: theme.palette.secondary.main,
  },
  avatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    marginRight: theme.spacing(1),
  },
}))

interface ImageTileProps {
  image: UnsplashImage
  isFav: boolean
  onFavClick(): void
}

const ImageTile: React.FC<ImageTileProps> = ({ image, isFav, onFavClick }) => {
  const classes = useStyles()
  const [isHovering, setIsHovering] = React.useState(false)
  return (
    <Box onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
      <LazyLoad height={GRID_CELL_HEIGHT}>
        <img src={image.urls.small} alt={image.alt_description} />
        {isHovering ? (
          <GridListTileBar
            title={image.description}
            subtitle={
              <Box display="flex" justifyContent="flex-start">
                <Link href={image.user.links.html} target="_blank" color="inherit" underline="none">
                  <Box display="flex" alignItems="center">
                    <Avatar className={classes.avatar} src={image.user.profile_image.small} />
                    <Typography>{image.user.username}</Typography>
                  </Box>
                </Link>
              </Box>
            }
            actionIcon={
              <Box width={100}>
                <IconButton
                  aria-label="download image"
                  href={image.links.download}
                  download
                  target="_blank"
                >
                  <Icon className={classes.icon}>get_app</Icon>
                </IconButton>
                <IconButton aria-label="save to favorite" onClick={onFavClick}>
                  <Icon className={isFav ? classes.activeIcon : classes.icon}>
                    {isFav ? 'favorite' : 'favorite_outline'}
                  </Icon>
                </IconButton>
              </Box>
            }
          />
        ) : null}
      </LazyLoad>
    </Box>
  )
}

export default ImageTile
