import { Video } from 'lucide-react'

interface LectureProps {
  title: string
  duration: string
  isCurrent?: boolean
  onPlay: () => void
}

export function Lecture({
  title,
  duration,
  onPlay,
  isCurrent = false,
}: LectureProps) {
  return (
    <button
      onClick={onPlay}
      data-active={isCurrent}
      disabled={isCurrent}
      className="group flex items-center gap-3 text-sm text-zinc-400 data-[active=true]:text-emerald-400 enabled:hover:text-zinc-100"
    >
      <Video className="w-4 h-4 text-zinc-500 group-data-[active=true]:text-emerald-400" />

      <span>{title}</span>
      <span className="ml-auto font-mono text-xs text-zinc-500">
        {duration}
      </span>
    </button>
  )
}
