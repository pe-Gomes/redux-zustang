import ReactPlayer from 'react-player'

export function VideoPlayer() {
  return (
    <div className="w-full bg-zinc-950 aspect-video max-h-screen">
      <ReactPlayer
        width="100%"
        height="100%"
        url="https://www.youtube.com/watch?v=WZIGwN-5Ioo"
        controls
      />
    </div>
  )
}
