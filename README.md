# Unsplash Images Searching App

## Technologies

1. Language - TypeScript
2. Frontend Framework - NextJS: A popular SSR React framework with build in route handling
3. UI Kit - Material UI: A comprehensive and highly customizable UI Kit following Google's Material Design guideline
4. Global State Management - React Context API: Managing React app's state without relying on other dependencies like redux, mobx, etc. Suitable for handling small projects.
5. Data Persistance - Local Storage

## Architecture Design

1. Global State

```javascript
interface GlobalState {
  favLists: FavList[]
  favImages: { [id: string]: { image: UnsplashImage; listId: string } }
  addFavList(list: Omit<FavList, 'id'>): void
  updateFavList(list: FavList): void
  removeFavList(id: string): void
  addFavImage(image: UnsplashImage, listId: string): void
  removeFavImage(id: string): void
}
```

- `favLists` is an array because it is easier to render lists on `/favorites` page by simply `favLists.map(...)`
- `favImages` is an object with image id as the key because it's easier to check whether the image is favorited by checking `!!favImages[id]`

2. Folder Structure

- `components` stores all reusable components without accessing the global state for easy testing
- `contexts` stores the contexts for managing global states
- `hooks` stores reusable React hooks
- `pages` stores all NextJS pages

3. Development

- Create `.env.local` on project root and add the following env variables

```
UNSPLASH_API_KEY=***
```

- Run `yarn dev`

4. Deployment

- Project is deployed on Vercel [https://unsplash-images-search.vercel.app/](https://unsplash-images-search.vercel.app/)
- Commit to `master` branch to deploy

## TODO list if I have more time

1. Unit Tests - Jest and React Testing Libraries
2. E2E Tests - Cypress
3. More strict typings. eg, `UnsplachImage`
4. Wrap all components' functions in `React.useCallback`
5. Error handling
6. Test on more browsers (legacy browsers included)
7. Improve accessibilities
8. Add storybook for better design system
9. Add empty states
10. Persist `home`'s state and scroll position on page change
