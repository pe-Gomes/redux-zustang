import { useAppSelector } from '@/store'
import { useCurrentLesson } from '@/store/slices/player'
import { Skeleton } from './ui/skeleton'

export function Header() {
  const { currentLesson, currentModule } = useCurrentLesson()
  const isCourseLoading = useAppSelector((state) => state.player.isLoading)

  return (
    <header className="flex flex-col gap-1">
      {isCourseLoading ? (
        <div className="space-y-2">
          <Skeleton className="w-80 h-12" />
          <Skeleton className="w-44 h-6" />
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-bold">{currentLesson?.title}</h1>
          <span className="text-sm text-zinc-400">
            Module: {currentModule?.title}
          </span>
        </>
      )}
    </header>
  )
}
