import React from 'react'
import { FavList, UnsplashImage } from '../types'

interface GlobalState {
  favLists: FavList[]
  favImages: { [id: string]: { image: UnsplashImage; listId: string } }
  addFavList(list: Omit<FavList, 'id'>): void
  updateFavList(list: FavList): void
  removeFavList(id: string): void
  addFavImage(image: UnsplashImage, listId: string): void
  removeFavImage(id: string): void
}

const initialValue: GlobalState = {
  favLists: [],
  favImages: {},
  addFavList: () => {},
  updateFavList: () => {},
  removeFavList: () => {},
  addFavImage: () => {},
  removeFavImage: () => {},
}
try {
  const savedFavLists = JSON.parse(localStorage.getItem('fav-lists') || '')
  initialValue.favLists = savedFavLists
} catch (err) {}
try {
  const savedFavImages = JSON.parse(localStorage.getItem('fav-images') || '')
  initialValue.favImages = savedFavImages
} catch (err) {}

const GlobalStateContext = React.createContext<GlobalState>(initialValue)

const GlobalStateProvider: React.FC = ({ children }) => {
  const [favLists, setFavLists] = React.useState(initialValue.favLists)
  const [favImages, setFavImages] = React.useState(initialValue.favImages)

  React.useEffect(() => {
    localStorage.setItem('fav-lists', JSON.stringify(favLists))
  }, [favLists])

  React.useEffect(() => {
    localStorage.setItem('fav-images', JSON.stringify(favImages))
  }, [favImages])
  return (
    <GlobalStateContext.Provider
      value={{
        favLists,
        favImages,
        addFavList: (list) =>
          setFavLists((lists) => [...lists, { ...list, id: Date.now().toString() }]),
        updateFavList: (list) =>
          setFavLists((lists) => lists.map((l) => (l.id === list.id ? list : l))),
        removeFavList: (id) => setFavLists((lists) => lists.filter((l) => l.id !== id)),
        addFavImage: (image, listId) =>
          setFavImages((images) => ({ ...images, [image.id]: { image, listId } })),
        removeFavImage: (id) => setFavImages(({ [id]: removedImage, ...images }) => images),
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  )
}

const useGlobalStateContext = () => React.useContext(GlobalStateContext)

export { GlobalStateProvider, useGlobalStateContext }
