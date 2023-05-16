const { render, screen, cleanup } = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'store/store'
import { BrowserRouter as Router } from 'react-router-dom'
import { SettingsProvider } from 'common/contexts/SettingsContext'
import { MatxTheme } from 'components'
import EmployeeList from '../EmployeeList'
import axios from '../../../axios'
import MockAdapter from 'axios-mock-adapter'

afterEach(cleanup)

test('should render Employee rows when api response has data', async () => {
    const endPoint = 'employee'
    const getEmployeeListResponse = [
        {
            id: 1,
            name: 'name',
            phone: 45,
            address: 30.54,
            vertical: 52,
            team: 53,
            aa: 'aa',
            bb: true,
            cc: 59,
        },
    ]
    const mock = new MockAdapter(axios)
    mock.onGet(`/${endPoint}`).reply(200, getEmployeeListResponse)
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <EmployeeList />
                    </Router>
                </MatxTheme>
            </SettingsProvider>
        </Provider>
    )
    const employeeNameCell = await screen.findByText(/name/i)

    expect(employeeNameCell).toHaveTextContent(/name/i)
    mock.reset()
})
