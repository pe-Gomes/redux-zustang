import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { useAppSelector } from '..'
import { api } from '@/lib/axios'

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
}

export const loadCourse = createAsyncThunk('player/load', async () => {
  const res = await api.get('/course/1')
  return res.data as Course
})

export const playerSlice = createSlice({
  name: 'player',
  initialState: {
    course: null,
    currentModuleIndex: 0,
    currentLessonIndex: 0,
    isLoading: true,
  } as PlayerState,
  reducers: {
    play: (
      state,
      action: PayloadAction<{ moduleIndex: number; lessonIndex: number }>
    ) => {
      state.currentModuleIndex = action.payload.moduleIndex
      state.currentLessonIndex = action.payload.lessonIndex
    },
    next: (state) => {
      const nextLessonIndex = state.currentLessonIndex + 1
      const nextLesson =
        state.course?.modules[state.currentModuleIndex].lessons[nextLessonIndex]

      if (nextLesson) {
        state.currentLessonIndex = nextLessonIndex
      }

      if (!nextLesson) {
        const nextModuleIndex = state.currentModuleIndex + 1
        const nextModule = state.course?.modules[nextModuleIndex]

        if (nextModule) {
          state.currentModuleIndex = nextModuleIndex
          state.currentLessonIndex = 0
        }
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(loadCourse.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(loadCourse.fulfilled, (state, action) => {
      state.course = action.payload
      state.isLoading = false
    })
  },
})

export const player = playerSlice.reducer
export const { play, next } = playerSlice.actions

export const useCurrentLesson = () => {
  return useAppSelector((state) => {
    const { currentLessonIndex, currentModuleIndex } = state.player

    const currentModule = state.player.course?.modules[currentModuleIndex]
    const currentLesson = currentModule?.lessons[currentLessonIndex]

    return { currentLesson, currentModule }
  })
}
