const {
    render,
    screen,
    fireEvent,
    within,
    waitFor,
    getByRole,
    act,
    cleanup,
} = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'store/store'
import { BrowserRouter as Router } from 'react-router-dom'
import { SettingsProvider } from 'common/contexts/SettingsContext'
import { MatxTheme } from 'components'
import axios from '../../../axios'
import MockAdapter from 'axios-mock-adapter'
import AddEmployee from '../AddEmployee'

beforeEach(() => {
    const endPoint = 'Employee'
    const getStudentListResponse = [
        {
            id: 1,
            name: 'name',
            phone: 10,
            address: 99.29,
            vertical: 48,
            team: 36,
            aa: 'aa',
            bb: true,
            cc: 59,
        },
    ]
    const mock = new MockAdapter(axios)
    mock.onGet(`/${endPoint}`).reply(200, getStudentListResponse)
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <AddEmployee />
                    </Router>
                </MatxTheme>
            </SettingsProvider>
        </Provider>
    )
})

const clickAndWait = async (element) => {
    await act(async () => {
        fireEvent.click(element)
    })

    await act(async () => {
        jest.runOnlyPendingTimers()
    })
}

afterEach(cleanup)

describe('testing view EmployeeAdd Component', () => {
    test('should render AddEmployee and to display Add Form title', async () => {
        const headingNote = screen.getByText(/Add Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the add form', async () => {
        const addEmployeeButtonElement = screen.getByRole('button', {
            name: /Add/i,
        })

        const nameElement = screen.getByLabelText(/Name/i)
        const phoneElement = screen.getByLabelText(/Phone/i)
        const addressElement = screen.getByLabelText(/Address/i)
        const verticalElement = screen.getByLabelText(/Vertical/i)
        const teamElement = screen.getByLabelText(/Team/i)
        const aaElement = screen.getByLabelText(/Aa/i)
        const bbElement = screen.getByLabelText(/Bb/i)
        const ccElement = screen.getByLabelText(/Cc/i)

        expect(addEmployeeButtonElement).toBeInTheDocument()

        expect(nameElement).toBeInTheDocument()
        expect(phoneElement).toBeInTheDocument()
        expect(addressElement).toBeInTheDocument()
        expect(verticalElement).toBeInTheDocument()
        expect(teamElement).toBeInTheDocument()
        expect(aaElement).toBeInTheDocument()
        expect(bbElement).toBeInTheDocument()
        expect(ccElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of Employee add form', async () => {
        const nameElement = screen.getByLabelText(/Name/i)
        const phoneElement = screen.getByLabelText(/Phone/i)
        const addressElement = screen.getByLabelText(/Address/i)
        const verticalElement = screen.getByLabelText(/Vertical/i)
        const teamElement = screen.getByLabelText(/Team/i)
        const aaElement = screen.getByLabelText(/Aa/i)
        const bbElement = screen.getByLabelText(/Bb/i)
        const ccElement = screen.getByLabelText(/Cc/i)

        fireEvent.change(nameElement, { target: { value: 'name' } })
        fireEvent.change(phoneElement, { target: { value: 95 } })
        fireEvent.change(addressElement, { target: { value: 27.17 } })
        fireEvent.change(verticalElement, { target: { value: 19 } })
        fireEvent.change(teamElement, { target: { value: 2 } })
        fireEvent.change(aaElement, { target: { value: 'aa' } })
        fireEvent.change(ccElement, { target: { value: 98 } })

        fireEvent.mouseDown(bbElement)
        const bblistbox = within(screen.getByRole('listbox'))
        fireEvent.click(bblistbox.getByText(/False/))
        expect(bbElement).toHaveTextContent(/False/i)
    })

    test('should return error message when add Employee button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const addEmployeeButtonElement = screen.getByRole('button', {
            name: /Add/i,
        })

        await clickAndWait(addEmployeeButtonElement)

        let errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(8)
    })
})
