import React from 'react'

const useInfiniteScroll = (onScrollEnd: () => void, hasMore: boolean) => {
  const onScroll = React.useCallback(() => {
    if (hasMore && window.innerHeight + window.scrollY >= document.body.scrollHeight) {
      onScrollEnd()
    }
  }, [onScrollEnd, hasMore])

  React.useEffect(() => {
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [onScroll])
}

export default useInfiniteScroll
