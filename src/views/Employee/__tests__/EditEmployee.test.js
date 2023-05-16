const {
    render,
    screen,
    fireEvent,
    within,
    getByRole,
    act,
    cleanup,
} = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'store/store'
import {
    BrowserRouter as Router,
    Navigate,
    Route,
    Routes,
} from 'react-router-dom'
import { SettingsProvider } from 'common/contexts/SettingsContext'
import { MatxTheme } from 'components'
import EditEmployee from '../EditEmployee'
import { EmployeeAdded } from '../store/EmployeeSlice'
beforeAll(() => {
    store.dispatch(
        EmployeeAdded({
            id: 1,
            name: 'name',
            phone: 49,
            address: 62.84,
            vertical: 73,
            team: 1,
            aa: 'aa',
            bb: false,
            cc: 96,
        })
    )
})

beforeEach(() => {
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <Navigate to="Employee/edit/1" replace />
                                }
                            />
                            <Route
                                path="Employee/edit/:id"
                                element={<EditEmployee />}
                            />
                        </Routes>
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

describe('testing view of EmployeeEdit Component', () => {
    test('should render EditEmployee and display the heading Edit Form', async () => {
        const headingNote = screen.getByText(/Edit Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the edit form', async () => {
        const saveEmployeeButtonElement = screen.getByRole('button', {
            name: /save/i,
        })
        const nameElement = screen.getByLabelText(/Name/i)
        const phoneElement = screen.getByLabelText(/Phone/i)
        const addressElement = screen.getByLabelText(/Address/i)
        const verticalElement = screen.getByLabelText(/Vertical/i)
        const teamElement = screen.getByLabelText(/Team/i)
        const aaElement = screen.getByLabelText(/Aa/i)
        const bbElement = screen.getByLabelText(/Bb/i)
        const ccElement = screen.getByLabelText(/Cc/i)

        expect(saveEmployeeButtonElement).toBeInTheDocument()

        expect(nameElement).toBeInTheDocument()
        expect(phoneElement).toBeInTheDocument()
        expect(addressElement).toBeInTheDocument()
        expect(verticalElement).toBeInTheDocument()
        expect(teamElement).toBeInTheDocument()
        expect(aaElement).toBeInTheDocument()
        expect(bbElement).toBeInTheDocument()
        expect(ccElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of Employee edit form', async () => {
        const nameElement = screen.getByLabelText(/Name/i)
        const phoneElement = screen.getByLabelText(/Phone/i)
        const addressElement = screen.getByLabelText(/Address/i)
        const verticalElement = screen.getByLabelText(/Vertical/i)
        const teamElement = screen.getByLabelText(/Team/i)
        const aaElement = screen.getByLabelText(/Aa/i)
        const bbElement = screen.getByLabelText(/Bb/i)
        const ccElement = screen.getByLabelText(/Cc/i)

        fireEvent.change(nameElement, { target: { value: 'name' } })
        fireEvent.change(phoneElement, { target: { value: 86 } })
        fireEvent.change(addressElement, { target: { value: 76.58 } })
        fireEvent.change(verticalElement, { target: { value: 34 } })
        fireEvent.change(teamElement, { target: { value: 30 } })
        fireEvent.change(aaElement, { target: { value: 'aa' } })
        fireEvent.change(ccElement, { target: { value: 91 } })

        expect(nameElement.value).toBe('name')

        expect(phoneElement.value).toBe(86)
        expect(addressElement.value).toBe(76.58)
        expect(verticalElement.value).toBe(34)
        expect(teamElement.value).toBe(30)
        expect(aaElement.value).toBe('aa')
        expect(ccElement.value).toBe(91)

        fireEvent.mouseDown(bbElement)
        const bblistbox = within(screen.getByRole('listbox'))
        fireEvent.click(bblistbox.getByText(/False/))
        expect(bbElement).toHaveTextContent(/False/i)
    })

    test('should return error message when save button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const nameElement = screen.getByLabelText(/Name/i)
        const phoneElement = screen.getByLabelText(/Phone/i)
        const addressElement = screen.getByLabelText(/Address/i)
        const verticalElement = screen.getByLabelText(/Vertical/i)
        const teamElement = screen.getByLabelText(/Team/i)
        const aaElement = screen.getByLabelText(/Aa/i)
        const ccElement = screen.getByLabelText(/Cc/i)

        fireEvent.change(nameElement, { target: { value: '' } })
        fireEvent.change(phoneElement, { target: { value: '' } })
        fireEvent.change(addressElement, { target: { value: '' } })
        fireEvent.change(verticalElement, { target: { value: '' } })
        fireEvent.change(teamElement, { target: { value: '' } })
        fireEvent.change(aaElement, { target: { value: '' } })
        fireEvent.change(ccElement, { target: { value: '' } })
        await act(async () => {
            jest.runOnlyPendingTimers()
        })
        const saveEmployeeButtonElement = screen.getByRole('button', {
            name: /save/i,
        })

        await clickAndWait(saveEmployeeButtonElement)

        const errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(7)
    })
})
