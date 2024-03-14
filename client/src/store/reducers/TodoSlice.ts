// import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// import { ITodo } from '../../models/ITodo'
// import { fetchTodos } from './ActionCreators'

// interface TodoState {
// 	todos: ITodo[]
// 	isLoading: boolean
// 	error: string | undefined
// }

// const initialState: TodoState = {
// 	todos: [],
// 	isLoading: false,
// 	error: '',
// }

// export const todoSlice = createSlice({
// 	name: 'todo',
// 	initialState,
// 	reducers: {
// 		addTodo(state, action: PayloadAction<string>) {
// 			state.todos.push({
// 				userId: 1,
// 				id: Date.now(),
// 				title: action.payload,
// 				completed: false,
// 			})
// 		},
// 		toggleTodo(state, action: PayloadAction<number>) {
// 			const toggleTodo = state.todos.find(todo => todo.id === action.payload)
// 			if (toggleTodo) {
// 				toggleTodo.completed = !toggleTodo.completed
// 			}
// 		},
// 		editTodo(state, action: PayloadAction<{ id: number; title: string }>) {
// 			const toggleTodo = state.todos.find(todo => todo.id === action.payload.id)
// 			if (toggleTodo) {
// 				toggleTodo.title = action.payload.title
// 			}
// 		},
// 		deleteTodo(state, action: PayloadAction<number>) {
// 			const index = state.todos.findIndex(todo => todo.id === action.payload)
// 			if (index !== -1) {
// 				state.todos.splice(index, 1)
// 			}
// 		},
// 	},
// 	extraReducers: builder => {
// 		builder
// 			.addCase(fetchTodos.pending, state => {
// 				state.isLoading = true
// 			})
// 			.addCase(fetchTodos.fulfilled, (state, action) => {
// 				state.isLoading = false
// 				state.todos = action.payload
// 			})
// 			.addCase(fetchTodos.rejected, (state, action) => {
// 				state.isLoading = false
// 				state.error = action.payload
// 			})
// 	},
// })

// export const { addTodo, toggleTodo, editTodo, deleteTodo } = todoSlice.actions
// export default todoSlice.reducer
