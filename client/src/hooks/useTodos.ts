import { useMemo } from 'react'
import { ITodo } from '../models/IUser'
import { Done } from '../components/SearchTodo'

export const useTodos = (todos: ITodo[], query: string, done: Done) => {
	const searchTodos = useMemo(() => {
		if (todos)
			return todos.filter(todo => {
				const titleMatch = todo.title
					.toLowerCase()
					.includes(query.toLowerCase())
				if (done === Done.None) {
					return titleMatch
				} else if (done === Done.Yes && todo.completed) {
					return titleMatch
				} else if (done === Done.No && !todo.completed) {
					return titleMatch
				}
			})
	}, [todos, query, done])

	return searchTodos
}
