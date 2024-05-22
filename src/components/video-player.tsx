import ReactPlayer from 'react-player'
import { Loader } from './loader'
import { useStore } from '@/zustand-store'

export function VideoPlayer() {
  const {
    getCurrentLesson,
    isLoading: isCourseLoading,
    next,
  } = useStore((store) => {
    return {
      getCurrentLesson: store.getCurrentLesson,
      isLoading: store.isLoading,
      next: store.next,
    }
  })
  const { currentLesson: lesson } = getCurrentLesson()

  function handleNextVideo() {
    next()
  }

  return (
    <div className="w-full bg-zinc-950 aspect-video max-h-screen">
      {isCourseLoading ? (
        <Loader />
      ) : (
        <ReactPlayer
          width="100%"
          height="100%"
          url={`https://www.youtube.com/watch?v=${lesson?.id}`}
          controls
          playing
          onEnded={handleNextVideo}
        />
      )}
    </div>
  )
}
