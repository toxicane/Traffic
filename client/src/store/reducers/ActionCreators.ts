// import axios from 'axios'
// import { ITodo } from '../../models/ITodo'
// import { createAsyncThunk } from '@reduxjs/toolkit'

// export const fetchTodos = createAsyncThunk<
// 	ITodo[],
// 	void,
// 	{ rejectValue: string }
// >('todo/fetchAll', async (_, { rejectWithValue }) => {
// 	try {
// 		const response = await axios.get<ITodo[]>(
// 			'https://jsonplaceholder.typicode.com/todos?_limit=10'
// 		)
// 		return response.data
// 	} catch (e) {
// 		return rejectWithValue('Не удалось загрузить список задач')
// 	}
// })
