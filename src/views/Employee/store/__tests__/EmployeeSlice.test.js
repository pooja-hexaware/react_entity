import store from 'store/store'
import {
    employeeAdded,
    employeeDeleted,
    employeeUpdated,
} from '../employeeSlice'

describe('testing employee redux store reducers', () => {
    test('add employee to store test', () => {
        let state = store.getState().employee
        expect(state.entities).toHaveLength(0)
        const initialInput = {
            id: 1,
            name: 'name',
            phone: 18,
            address: 79.93,
            vertical: 81,
            team: 37,
            aa: 'Thu May 11 2023 05:38:40 GMT+0000 (Coordinated Universal Time)',
            bb: false,
            cc: 70,
        }
        store.dispatch(employeeAdded(initialInput))
        state = store.getState().employee
        expect(state.entities).toHaveLength(1)
    })

    test('update employee from store should change the length of the entities array in redux store', () => {
        const initialInput = {
            id: 2,
            name: 'name',
            phone: 22,
            address: 73.13,
            vertical: 72,
            team: 23,
            aa: 'Thu May 11 2023 05:38:40 GMT+0000 (Coordinated Universal Time)',
            bb: true,
            cc: 12,
        }
        store.dispatch(employeeAdded(initialInput))
        let state = store.getState().employee
        expect(state.entities).toHaveLength(2)

        const updatedInput = {
            id: initialInput.id,
            name: 'name',
            phone: 24,
            address: 56.17,
            vertical: 19,
            team: 97,
            aa: 'aa',
            bb: false,
            cc: 29,
        }
        store.dispatch(employeeUpdated(updatedInput))
        state = store.getState().employee
        let changedEmployee = state.entities.find((p) => p.id === 2)
        expect(changedEmployee).toStrictEqual(updatedInput)
    })

    test('delete employee from store should reduce the length of the entities array in redux store', () => {
        const initialInput = {
            id: 3,
            name: 'name',
            phone: 21,
            address: 33.36,
            vertical: 5,
            team: 53,
            aa: 'Thu May 11 2023 05:38:40 GMT+0000 (Coordinated Universal Time)',
            bb: true,
            cc: 92,
        }
        store.dispatch(employeeAdded(initialInput))
        let state = store.getState().employee
        expect(state.entities).toHaveLength(3)

        store.dispatch(
            employeeDeleted({
                id: initialInput.id,
            })
        )
        state = store.getState().employee
        expect(state.entities).toHaveLength(2)
    })
})
