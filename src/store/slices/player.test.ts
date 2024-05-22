import { describe, it, expect } from 'vitest'
import {
  player as reducer,
  play,
  next,
  PlayerState,
} from '@/store/slices/player'

const initialState: PlayerState = {
  course: {
    id: 1,
    title: 'React',
    modules: [
      {
        id: 1,
        title: 'Iniciando com React',
        lessons: [
          {
            id: 'Jai8w6K_GnY',
            title: 'CSS Modules',
            duration: '13:45',
          },
          {
            id: 'w-DW4DhDfcw',
            title: 'Estilização do Post',
            duration: '10:05',
          },
          {
            id: 'D83-55LUdKE',
            title: 'Componente: Header',
            duration: '06:33',
          },
          {
            id: 'W_ATsETujaY',
            title: 'Componente: Sidebar',
            duration: '09:12',
          },
          {
            id: 'Pj8dPeameYo',
            title: 'CSS Global',
            duration: '03:23',
          },
          {
            id: '8KBq2vhwbac',
            title: 'Form de comentários',
            duration: '11:34',
          },
        ],
      },
      {
        id: 2,
        title: 'Estrutura da aplicação',
        lessons: [
          {
            id: 'gE48FQXRZ_o',
            title: 'Componente: Comment',
            duration: '13:45',
          },
          {
            id: 'Ng_Vk4tBl0g',
            title: 'Responsividade',
            duration: '10:05',
          },
          {
            id: 'h5JA3wfuW1k',
            title: 'Interações no JSX',
            duration: '06:33',
          },
          {
            id: '1G0vSTqWELg',
            title: 'Utilizando estado',
            duration: '09:12',
          },
        ],
      },
    ],
  },
  currentModuleIndex: 0,
  currentLessonIndex: 0,
  isLoading: false,
}

describe('player slice', () => {
  it('should be able to play', () => {
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
    const numberOfLessons = initialState.course!.modules[0].lessons.length

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
    const numberOfModules = initialState.course!.modules.length
    const numberOfLessons =
      initialState.course!.modules[numberOfModules - 1].lessons.length

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
