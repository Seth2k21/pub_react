import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import axios from 'axios';
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem('user')){
      navigate('/store')
    }
  });
  const {handleSubmit, register, formState: {errors}} = useForm();
  const onSubmit = (data) => {
    axios.get(`http://localhost:3000/users?email=${data.email}&password=${data.password}`).then((response) => {
      if (response.data.length > 0) {
        localStorage.setItem("user", JSON.stringify(response.data[0]));
        navigate('/');
      } else {
        toast.error("Email or password incorrect");
      }
    });
  };
  return (
    <>
        <Stack alignItems={"center"} justifyContent={'center'} width={'100%'} height={'100vh'} sx={{backgroundColor: '#f1f3f3', color: '#262525',}}>

          <Box alignItems={"center"} width={600} sx={{backgroundColor: '#fff', color: '#262525', padding: 3,}}>
            <Typography variant='h5'> <Link to='/'>Home</Link> / Login</Typography>  
            <br />
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack direction={'column'} gap={2}>
                <TextField type='email' fullWidth id='filled-basic' label='Email' variant='filled' {...register('email', {required: 'Email is required*',})} />
                <TextField type='password' fullWidth id='filled-basic' label='Password' variant='filled' {...register('password', {required: 'Password is required*', minLength: {value: 8, message: 'Password should contain 8 characteres*'}})} />
              </Stack>
              <Button variant='contained' type='submit' sx={{marginTop: 2,}}>Login</Button>
            </form>
          <br />
          <p>I haven't an account ? <Link to='/register'>Register</Link></p>
          </Box>

          </Stack>
    </>
  )
}

export default Login
