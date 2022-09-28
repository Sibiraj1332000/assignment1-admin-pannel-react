import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';


const Login = () => {
    const myHistory = useHistory();
    const [loginData, setLoginData] = useState({
        userName: '',
        password: ''
    });

    const handleChange = (event) => {
        setLoginData((previousState) => ({
            ...previousState,
            [event.target.name]: event.target.value
        }))
    }

    const handleLogin = () => {
        console.log(loginData);
        axios.post("http://localhost:3001/admin/login", {
            userName: loginData.userName,
            password: loginData.password
        })
            .then(data => {
                console.log("gggg: ", data.data.success);
                if(data.data.success){

                    window.localStorage.setItem('accessKey', data.data.accessKey);
                    myHistory.push('/admin')

                }
            })
    }
    return (
        <form action="">
            <Box
                display='flex'
                flexDirection='column'
                maxWidth={400}
                alignItems='center'
                justifyContent={'center'}
                margin='auto'
                marginTop={20}
                padding={3}
                borderRadius={5}
                boxShadow={'5px 5px 10px #ccc'}
                sx={{
                    ":hover": {
                        boxShadow: '10px 10px 20px #ccc'
                    }
                }}
            >
                <Typography
                    variant='h3'
                    padding={3}
                    textAlign='center'
                > Login</Typography>

                <TextField
                    type={'email'}
                    variant='outlined'
                    placeholder='UserName'
                    name='userName'
                    margin='normal'
                    onChange={handleChange}
                ></TextField>
                <TextField
                    type={'password'}
                    variant='outlined'
                    placeholder='Password'
                    name='password'
                    margin='normal'
                    onChange={handleChange}
                ></TextField>

                <Button
                    variant='contained'
                    color='warning'
                    sx={{
                        marginTop: 3,
                        borderRadius: 3
                    }}
                    onClick={handleLogin}
                >Login</Button>
            </Box>
        </form>
    )
};
export default Login;