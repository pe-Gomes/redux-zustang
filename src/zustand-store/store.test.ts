import { describe, it, expect } from 'vitest'
import { useStore } from '.'

const initialState = {
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
    const { play } = useStore.getState()

    play({
      moduleIndex: 1,
      lessonIndex: 2,
    })

    const { currentLessonIndex, currentModuleIndex } = useStore.getState()

    expect(currentModuleIndex).toBe(1)
    expect(currentLessonIndex).toBe(2)
  })

  it('should be able to play next video automatically', () => {
    useStore.setState(initialState)

    const { play, next } = useStore.getState()
    play({
      moduleIndex: 0,
      lessonIndex: 0,
    })

    next()

    const { currentLessonIndex, currentModuleIndex } = useStore.getState()

    expect(currentModuleIndex).toBe(0)
    expect(currentLessonIndex).toBe(1)
  })

  it('should be able to play next video automatically when module ends', () => {
    useStore.setState(initialState)
    const numberOfLessons = initialState.course!.modules[0].lessons.length

    const { play, next } = useStore.getState()

    play({
      moduleIndex: 0,
      lessonIndex: numberOfLessons,
    })

    next()
    const { currentLessonIndex, currentModuleIndex } = useStore.getState()

    expect(currentModuleIndex).toBe(1)
    expect(currentLessonIndex).toBe(0)
  })

  it('should be able to stop when both modules and lessons ends', () => {
    useStore.setState(initialState)

    const numberOfModules = initialState.course!.modules.length
    const numberOfLessons =
      initialState.course!.modules[numberOfModules - 1].lessons.length

    const { play, next, currentLessonIndex, currentModuleIndex } =
      useStore.getState()

    play({
      moduleIndex: numberOfModules - 1,
      lessonIndex: numberOfLessons - 1,
    })

    next()

    expect(currentModuleIndex).toBe(currentModuleIndex)
    expect(currentLessonIndex).toBe(currentLessonIndex)
  })
})
