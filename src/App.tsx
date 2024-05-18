import { Provider as ReduxProvider } from 'react-redux'
import { store } from './store'

import { AddTodo } from '@/components/AddTodo'
import { TodoList } from '@/components/TodoList'

export function App() {
  return (
    <ReduxProvider store={store}>
      <div className="flex flex-col w-full items-center p-24 space-y-4">
        <TodoList />
        <AddTodo />
      </div>
    </ReduxProvider>
  )
}
