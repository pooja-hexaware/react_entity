import { createSlice } from '@reduxjs/toolkit'
import { fetchEmployee } from './Employee.action'
import { addEmployee } from './Employee.action'
import { editEmployee } from './Employee.action'
import { deleteEmployee } from './Employee.action'

const fetchEmployeeExtraReducer = {
    [fetchEmployee.pending]: (state, action) => {
        state.loading = true
    },
    [fetchEmployee.fulfilled]: (state, action) => {
        state.entities = [...action.payload]
        state.loading = false
    },
    [fetchEmployee.rejected]: (state, action) => {
        state.loading = false
    },
}

const addEmployeeExtraReducer = {
    [addEmployee.pending]: (state, action) => {
        state.loading = true
    },
    [addEmployee.fulfilled]: (state, action) => {
        state.entities.push(action.payload)
        state.loading = false
    },
    [addEmployee.rejected]: (state, action) => {
        state.loading = false
    },
}

const editEmployeeExtraReducer = {
    [editEmployee.pending]: (state, action) => {
        state.loading = true
    },
    [editEmployee.fulfilled]: (state, action) => {
        const { id, name, phone, address, vertical, team, aa, bb, cc } =
            action.payload
        const existingEmployee = state.entities.find(
            (Employee) => Employee?.id?.toString() === id?.toString()
        )
        if (existingEmployee) {
            existingEmployee.name = name
            existingEmployee.phone = phone
            existingEmployee.address = address
            existingEmployee.vertical = vertical
            existingEmployee.team = team
            existingEmployee.aa = aa
            existingEmployee.bb = bb
            existingEmployee.cc = cc
        }
        state.loading = false
    },
    [editEmployee.rejected]: (state, action) => {
        state.loading = false
    },
}

const deleteEmployeeExtraReducer = {
    [deleteEmployee.pending]: (state, action) => {
        state.loading = true
    },
    [deleteEmployee.fulfilled]: (state, action) => {
        const id = action.payload
        const existingEmployee = state.entities.find(
            (Employee) => Employee.id.toString() === id.toString()
        )
        if (existingEmployee) {
            state.entities = state.entities.filter(
                (Employee) => Employee.id !== id
            )
        }
        state.loading = false
    },
    [deleteEmployee.rejected]: (state, action) => {
        state.loading = false
    },
}
const EmployeeSlice = createSlice({
    name: 'Employee',
    initialState: {
        entities: [],
        loading: false,
    },
    reducers: {
        EmployeeAdded(state, action) {
            state.entities.push(action.payload)
        },
        EmployeeUpdated(state, action) {
            const { id, name, phone, address, vertical, team, aa, bb, cc } =
                action.payload
            const existingEmployee = state.entities.find(
                (Employee) => Employee.id.toString() === id.toString()
            )
            if (existingEmployee) {
                existingEmployee.name = name
                existingEmployee.phone = phone
                existingEmployee.address = address
                existingEmployee.vertical = vertical
                existingEmployee.team = team
                existingEmployee.aa = aa
                existingEmployee.bb = bb
                existingEmployee.cc = cc
            }
        },
        EmployeeDeleted(state, action) {
            const { id } = action.payload
            const existingEmployee = state.entities.find(
                (Employee) => Employee.id.toString() === id.toString()
            )
            if (existingEmployee) {
                state.entities = state.entities.filter(
                    (Employee) => Employee.id !== id
                )
            }
        },
    },
    extraReducers: {
        ...fetchEmployeeExtraReducer,
        ...addEmployeeExtraReducer,
        ...editEmployeeExtraReducer,
        ...deleteEmployeeExtraReducer,
    },
})

export const { EmployeeAdded, EmployeeUpdated, EmployeeDeleted } =
    EmployeeSlice.actions

export default EmployeeSlice.reducer
