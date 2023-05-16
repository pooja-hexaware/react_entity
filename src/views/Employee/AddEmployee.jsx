import { Breadcrumb, SimpleCard } from 'components'
import { Button, Icon, Grid, MenuItem } from '@mui/material'
import { styled } from '@mui/system'
import { Span } from 'components/Typography'
import React, { useState, useEffect } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addEmployee, fetchEmployee } from './store/Employee.action'

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

const AddEmployee = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [vertical, setVertical] = useState('')
    const [team, setTeam] = useState('')
    const [aa, setAa] = useState('')
    const [bb, setBb] = useState('')
    const [cc, setCc] = useState('')

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
            addEmployee({
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

    useEffect(() => {
        return () => {
            setName('')
            setPhone('')
            setAddress('')
            setVertical('')
            setTeam('')
            setAa('')
            setBb('')
            setCc('')
        }
    }, [])

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'AddEmployee', path: '/Employee' },
                        { name: 'Form' },
                    ]}
                />
            </div>
            <SimpleCard title="Add Form">
                <ValidatorForm onSubmit={handleClick} onError={() => null}>
                    <Grid container spacing={6}>
                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                            <TextField
                                type="text"
                                name="name"
                                id="nameInput"
                                onChange={handleName}
                                value={name}
                                label="Name"
                            />

                            <TextField
                                type="number"
                                name="phone"
                                id="phoneInput"
                                onChange={handlePhone}
                                value={phone || ''}
                                label="Phone"
                            />

                            <TextField
                                type="number"
                                name="address"
                                id="addressInput"
                                onChange={handleAddress}
                                value={address || ''}
                                label="Address"
                            />

                            <TextField
                                type="number"
                                name="vertical"
                                id="verticalInput"
                                onChange={handleVertical}
                                value={vertical || ''}
                                label="Vertical"
                            />

                            <TextField
                                type="number"
                                name="team"
                                id="teamInput"
                                onChange={handleTeam}
                                value={team || ''}
                                label="Team"
                            />

                            <TextField
                                type="date"
                                name="aa"
                                id="aaInput"
                                onChange={handleAa}
                                value={aa || ''}
                            />

                            <TextField
                                value={bb}
                                onChange={handleBb}
                                select
                                id="bbInput"
                                label="Bb"
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
                                label="Cc"
                            />
                        </Grid>
                    </Grid>
                    <Button type="submit" color="primary" variant="contained">
                        <Icon>add</Icon>
                        <Span sx={{ pl: 1, textTransform: 'capitalize' }}>
                            Add
                        </Span>
                    </Button>
                </ValidatorForm>
            </SimpleCard>
        </Container>
    )
}

export default AddEmployee
