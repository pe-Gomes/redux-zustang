import { ChevronDown } from 'lucide-react'
import { Lecture } from './lecture'

interface ModuleProps {
  index: number
  title: string
  lecturesAmount: number
}

export function Module({ title, lecturesAmount, index }: ModuleProps) {
  return (
    <div>
      <button className="w-full flex items-center gap-3 bg-zinc-800 p-4">
        <div className="flex h-10 w-10 rounded-full items-center justify-center text-xs bg-background">
          {index + 1}
        </div>
        <div className="flex flex-col gap-1 text-left">
          <strong className="text-sm">{title}</strong>
          <span className="text-sm text-slate-400">
            {lecturesAmount} lectures
          </span>
        </div>
        <ChevronDown className="w-5 h-5 ml-auto text-zinc-400" />
      </button>

      <nav className="relative flex flex-col gap-4 p-6">
        <Lecture title="redux fundamentals" duration="10:32" />
      </nav>
    </div>
  )
}
