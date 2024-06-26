import { Lecture } from './lecture'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion'
import { useStore } from '@/zustand-store'

interface ModuleProps {
  moduleIndex: number
  title: string
  lecturesAmount: number
}

export function Module({ title, lecturesAmount, moduleIndex }: ModuleProps) {
  const { currentLessonIndex, currentModuleIndex, course, play } = useStore(
    (store) => {
      return {
        currentLessonIndex: store.currentLessonIndex,
        currentModuleIndex: store.currentModuleIndex,
        course: store.course,
        play: store.play,
      }
    }
  )

  const lessons = course?.modules[moduleIndex].lessons

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value={`${moduleIndex}`}>
        <AccordionTrigger className="group w-full flex items-center gap-3 bg-zinc-800 p-4">
          <div className="flex h-10 w-10 rounded-full items-center justify-center text-xs bg-background">
            {moduleIndex + 1}
          </div>
          <div className="flex flex-col gap-1 text-left">
            <strong className="text-sm group-hover:underline underline-offset-4 decoration-foreground/50">
              {title}
            </strong>
            <span className="text-sm text-slate-400">
              {lecturesAmount} lectures
            </span>
          </div>
          {/* <ChevronsUpDown className="w-4 h-4 ml-auto text-zinc-400" /> */}
        </AccordionTrigger>

        <AccordionContent>
          <nav className="relative flex flex-col gap-4 p-6">
            {lessons &&
              lessons.length > 0 &&
              lessons.map((lesson, lessonIndex) => (
                <Lecture
                  key={lesson.id}
                  title={lesson.title}
                  duration={lesson.duration}
                  isCurrent={
                    moduleIndex === currentModuleIndex &&
                    lessonIndex === currentLessonIndex
                  }
                  onPlay={() =>
                    play({
                      moduleIndex,
                      lessonIndex,
                    })
                  }
                />
              ))}
          </nav>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
