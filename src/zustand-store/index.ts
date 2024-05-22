import { api } from '@/lib/axios'
import { create } from 'zustand'

interface Lesson {
  id: string
  title: string
  duration: string
}

interface Course {
  id: number
  title: string
  modules: Array<{
    id: number
    title: string
    lessons: Lesson[]
  }>
}

export interface PlayerState {
  course: Course | null
  currentLessonIndex: number
  currentModuleIndex: number
  isLoading: boolean

  load: () => Promise<void>
  play: ({ moduleIndex, lessonIndex }: PlayIndexes) => void
  next: () => void
  getCurrentLesson: () => {
    currentLesson: Lesson | undefined
    currentModule: { id: number; title: string } | undefined
  }
}

interface PlayIndexes {
  moduleIndex: number
  lessonIndex: number
}

export const useStore = create<PlayerState>((set, get) => {
  return {
    course: null,
    currentLessonIndex: 0,
    currentModuleIndex: 0,
    isLoading: true,

    load: async () => {
      set({ isLoading: true })

      const res = await api.get('/course/1')

      set({ course: res.data, isLoading: false })
    },
    play: ({ moduleIndex, lessonIndex }: PlayIndexes) => {
      set({
        currentModuleIndex: moduleIndex,
        currentLessonIndex: lessonIndex,
      })
    },
    next: () => {
      const { currentLessonIndex, currentModuleIndex, course } = get()

      const nextLessonIndex = currentLessonIndex + 1
      const nextLesson =
        course?.modules[currentModuleIndex].lessons[nextLessonIndex]

      if (nextLesson) {
        set({ currentLessonIndex: nextLessonIndex })
      }

      if (!nextLesson) {
        const nextModuleIndex = currentModuleIndex + 1
        const nextModule = course?.modules[nextModuleIndex]

        if (nextModule) {
          set({ currentModuleIndex: nextModuleIndex, currentLessonIndex: 0 })
        }
      }
    },
    getCurrentLesson: () => {
      const { currentLessonIndex, currentModuleIndex, course } = get()

      const currentModule = course?.modules[currentModuleIndex]
      const currentLesson = currentModule?.lessons[currentLessonIndex]

      return { currentLesson, currentModule }
    },
  }
})
