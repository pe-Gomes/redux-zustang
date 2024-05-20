import { Module } from '@/components/module'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { VideoPlayer } from '@/components/video-player'
import { MessageCircle } from 'lucide-react'
import { useAppSelector } from '@/store'
import { useCurrentLesson } from '@/store/slices/player'
import { useEffect } from 'react'

export function Player() {
  const modules = useAppSelector((state) => state.player.course.modules)

  const { currentLesson } = useCurrentLesson()

  useEffect(() => {
    document.title = `${currentLesson.title}`
  })

  return (
    <div className="min-h-screen flex justify-center items-center px-4">
      <div className="flex w-full flex-col gap-6">
        <div className="flex items-center justify-between px-4">
          <Header />

          <Button className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4" /> Leave a comment
          </Button>
        </div>

        <main className="relative flex overflow-hidden rounded-lg shadow bg-zinc-900 pr-80">
          <div className="flex-1">
            <VideoPlayer />
          </div>

          <aside className="w-80 absolute top-0 bottom-0 divide-y-2 divide-zinc-900 right-0 border-l border-zinc-800 bg-zinc-900 overflow-y-auto scrollbar-thin scrollbar-track-zinc-950 scrollbar-thumb-zinc-800">
            {modules.length > 0 &&
              modules.map((module, index) => (
                <Module
                  key={module.id}
                  moduleIndex={index}
                  title={module.title}
                  lecturesAmount={module.lessons.length}
                />
              ))}
          </aside>
        </main>
      </div>
    </div>
  )
}
