import { createAsyncThunk } from '@reduxjs/toolkit'
import { showSuccess } from 'middleware/notification/store/notification.actions'
import axios from '../../../axios'

const endPoint = 'Employee'

export const fetchEmployee = createAsyncThunk(
    'Employee/fetchEmployee',
    async () => {
        const response = await axios.get(`/${endPoint}`)
        const Employee = await response.data
        return Employee
    }
)

export const addEmployee = createAsyncThunk(
    'Employee/addEmployee',
    async (data, thunkAPI) => {
        const response = await axios.post(`/${endPoint}`, data)
        const Employee = await response.data
        thunkAPI.dispatch(showSuccess('Employee added successfully'))
        return Employee
    }
)

export const editEmployee = createAsyncThunk(
    'Employee/editEmployee',
    async (data, thunkAPI) => {
        let body = {
            ...data,
        }

        delete body['id']

        const response = await axios.put(`/${endPoint}/${data.id}`, body)
        const Employee = await response.data
        thunkAPI.dispatch(showSuccess('Employee updated successfully'))
        return Employee
    }
)

export const deleteEmployee = createAsyncThunk(
    'Employee/deleteEmployee',
    async (data, thunkAPI) => {
        const response = await axios.delete(`/${endPoint}/${data.id}`)
        const status = await response.status
        if (status === 200) {
            thunkAPI.dispatch(
                showSuccess('Selected Employee deleted successfully.')
            )
            return data.id
        }
    }
)
