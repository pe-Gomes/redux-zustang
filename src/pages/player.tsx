import { Module } from '@/components/module'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { VideoPlayer } from '@/components/video-player'
import { MessageCircle } from 'lucide-react'

export function Player() {
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
            <Module index={0} title="Discovering Redux" lecturesAmount={3} />
          </aside>
        </main>
      </div>
    </div>
  )
}
