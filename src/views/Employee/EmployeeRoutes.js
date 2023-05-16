import React, { lazy } from 'react'
import Loadable from 'components/Loadable/Loadable'

const EmployeeList = Loadable(lazy(() => import('./EmployeeList')))
const EditEmployee = Loadable(lazy(() => import('./EditEmployee')))
const AddEmployee = Loadable(lazy(() => import('./AddEmployee')))

const EmployeeRoutes = [
    {
        path: '/Employee',
        element: <EmployeeList />,
    },
    {
        path: '/Employee/edit/:id',
        element: <EditEmployee />,
    },
    {
        path: '/Employee/add',
        element: <AddEmployee />,
    },
]

export default EmployeeRoutes
