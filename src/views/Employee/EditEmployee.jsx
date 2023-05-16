import { Breadcrumb, SimpleCard } from 'components'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { editEmployee, fetchEmployee } from './store/Employee.action'
import { Button, Icon, Grid, MenuItem } from '@mui/material'
import { styled } from '@mui/system'
import { Span } from 'components/Typography'
import React, { useState } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

const TextField = styled(TextValidator)(() => ({
    width: '100%',
    marginBottom: '16px',
}))

const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '16px',
        },
    },
}))

const EditEmployee = () => {
    const { id: EmployeeId } = useParams()

    const Employee = useSelector((state) =>
        state.Employee.entities.find(
            (Employee) => Employee.id.toString() === EmployeeId.toString()
        )
    )

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [name, setName] = useState(Employee.name)

    const [phone, setPhone] = useState(Employee.phone)

    const [address, setAddress] = useState(Employee.address)

    const [vertical, setVertical] = useState(Employee.vertical)

    const [team, setTeam] = useState(Employee.team)

    const [aa, setAa] = useState(Employee.aa.split('T')[0])

    const [bb, setBb] = useState(Employee.bb)

    const [cc, setCc] = useState(Employee.cc)

    const handleName = (e) => setName(e.target.value)
    const handlePhone = (e) => setPhone(parseInt(e.target.value))
    const handleAddress = (e) => setAddress(parseFloat(e.target.value))
    const handleVertical = (e) => setVertical(parseInt(e.target.value))
    const handleTeam = (e) => setTeam(parseInt(e.target.value))
    const handleAa = (e) => setAa(e.target.value)
    const handleBb = (e) => setBb(e.target.value)
    const handleCc = (e) => setCc(parseInt(e.target.value))

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(
            editEmployee({
                id: EmployeeId,
                name,
                phone,
                address,
                vertical,
                team,
                aa,
                bb,
                cc,
            })
        ).then(() => {
            dispatch(fetchEmployee())
        })
        navigate('/Employee')
    }

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'EditEmployee', path: '/Employee' },
                        { name: 'Form' },
                    ]}
                />
            </div>
            <SimpleCard title="Edit Form">
                <ValidatorForm onSubmit={handleClick} onError={() => null}>
                    <Grid container spacing={6}>
                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                            <TextField
                                type="text"
                                name="name"
                                id="nameInput"
                                onChange={handleName}
                                value={name}
                                validators={['required']}
                                label="Name"
                                errorMessages={['this field is required']}
                            />
                            <TextField
                                type="number"
                                name="phone"
                                id="phoneInput"
                                onChange={handlePhone}
                                value={phone || ''}
                                validators={['required']}
                                label="Phone"
                                errorMessages={['this field is required']}
                            />
                            <TextField
                                type="number"
                                name="address"
                                id="addressInput"
                                onChange={handleAddress}
                                value={address || ''}
                                validators={['required']}
                                label="Address"
                                errorMessages={['this field is required']}
                            />
                            <TextField
                                type="number"
                                name="vertical"
                                id="verticalInput"
                                onChange={handleVertical}
                                value={vertical || ''}
                                validators={['required']}
                                label="Vertical"
                                errorMessages={['this field is required']}
                            />
                            <TextField
                                type="number"
                                name="team"
                                id="teamInput"
                                onChange={handleTeam}
                                value={team || ''}
                                validators={['required']}
                                label="Team"
                                errorMessages={['this field is required']}
                            />
                            <TextField
                                type="date"
                                name="aa"
                                id="aaInput"
                                onChange={handleAa}
                                value={aa}
                                validators={['required']}
                                errorMessages={['this field is required']}
                            />
                            <TextField
                                value={bb}
                                onChange={handleBb}
                                select
                                id="bbInput"
                                label="Bb"
                                validators={['required']}
                                errorMessages={['this field is required']}
                            >
                                <MenuItem value={true}>True</MenuItem>
                                <MenuItem value={false}>False</MenuItem>
                            </TextField>
                            <TextField
                                type="number"
                                name="cc"
                                id="ccInput"
                                onChange={handleCc}
                                value={cc || ''}
                                validators={['required']}
                                label="Cc"
                                errorMessages={['this field is required']}
                            />
                        </Grid>
                    </Grid>
                    <Button type="submit" color="primary" variant="contained">
                        <Icon>send</Icon>
                        <Span sx={{ pl: 1, textTransform: 'capitalize' }}>
                            Save
                        </Span>
                    </Button>
                </ValidatorForm>
            </SimpleCard>
        </Container>
    )
}

export default EditEmployee
