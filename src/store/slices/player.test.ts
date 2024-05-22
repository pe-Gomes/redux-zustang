import { describe, it, expect } from 'vitest'
import {
  player as reducer,
  playerSlice,
  play,
  next,
} from '@/store/slices/player'
describe('player slice', () => {
  it('should be able to play', () => {
    const initialState = playerSlice.getInitialState()

    const state = reducer(
      initialState,
      play({
        moduleIndex: 1,
        lessonIndex: 2,
      })
    )

    expect(state.currentModuleIndex).toBe(1)
    expect(state.currentLessonIndex).toBe(2)
  })

  it('should be able to play next video automatically', () => {
    const initialState = playerSlice.getInitialState()

    const state = reducer(
      initialState,
      play({
        moduleIndex: 0,
        lessonIndex: 0,
      })
    )

    const newState = reducer(state, next())

    expect(newState.currentModuleIndex).toBe(0)
    expect(newState.currentLessonIndex).toBe(1)
  })

  it('should be able to play next video automatically when module ends', () => {
    const initialState = playerSlice.getInitialState()

    const numberOfLessons = initialState.course.modules[0].lessons.length

    const state = reducer(
      initialState,
      play({
        moduleIndex: 0,
        lessonIndex: numberOfLessons,
      })
    )

    const nextState = reducer(state, next())

    expect(nextState.currentModuleIndex).toBe(1)
    expect(nextState.currentLessonIndex).toBe(0)
  })

  it('should be able to stop when both modules and lessons ends', () => {
    const initialState = playerSlice.getInitialState()

    const numberOfModules = initialState.course.modules.length
    const numberOfLessons =
      initialState.course.modules[numberOfModules - 1].lessons.length

    const state = reducer(
      initialState,
      play({
        moduleIndex: numberOfModules - 1,
        lessonIndex: numberOfLessons - 1,
      })
    )

    const nextState = reducer(state, next())

    expect(nextState.currentModuleIndex).toBe(state.currentModuleIndex)
    expect(nextState.currentLessonIndex).toBe(state.currentLessonIndex)
  })
})
