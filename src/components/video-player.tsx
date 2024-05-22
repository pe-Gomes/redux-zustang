import ReactPlayer from 'react-player'
import { useAppDispatch, useAppSelector } from '@/store'
import { next, useCurrentLesson } from '@/store/slices/player'
import { Loader } from './loader'

export function VideoPlayer() {
  const { currentLesson: lesson } = useCurrentLesson()
  const isCourseLoading = useAppSelector((state) => state.player.isLoading)

  const dispatch = useAppDispatch()

  function handleNextVideo() {
    dispatch(next())
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
