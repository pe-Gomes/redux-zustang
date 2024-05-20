import ReactPlayer from 'react-player'
import { useDispatch } from 'react-redux'
import { next, useCurrentLesson } from '@/store/slices/player'

export function VideoPlayer() {
  const { currentLesson: lesson } = useCurrentLesson()

  const dispatch = useDispatch()

  function handleNextVideo() {
    dispatch(next())
  }

  return (
    <div className="w-full bg-zinc-950 aspect-video max-h-screen">
      <ReactPlayer
        width="100%"
        height="100%"
        url={`https://www.youtube.com/watch?v=${lesson.id}`}
        controls
        playing
        onEnded={handleNextVideo}
      />
    </div>
  )
}
