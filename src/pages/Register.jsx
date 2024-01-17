import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import axios from 'axios';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom'

function Register() {
  const navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem('user')){
      navigate('/store')
    }
  });
  const {handleSubmit, register, formState: {errors}} = useForm();
  const onSubmit = (data) => {
    if (data.password != data.confirmpassword) {
      toast.error("Password is not same");
    } else {
      axios.get(`http://localhost:3000/users?email=${data.email}`).then((response) => {
        if (response.data.length > 0) {
          toast.error("Email is already used");
        }
        else{
          axios.post("http://localhost:3000/users", data).then((response) => {
            toast.success("Registration successful");
            navigate('/login');
          }).catch((error) => {
            toast.error("Registration failed");
          });
        }
      });
      
    }
  };
  return (
    <>
      <Stack alignItems={"center"} justifyContent={'center'} width={'100%'} height={'100vh'} sx={{backgroundColor: '#f1f3f3', color: '#262525',}}>

        <Box alignItems={"center"} width={600} sx={{backgroundColor: '#fff', color: '#262525', padding: 3,}}>
          <Typography variant='h5'> <Link to='/'>Home</Link> / Register</Typography>  
          <br />
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack direction={'column'} gap={2}>
              <TextField fullWidth id='filled-basic' label='Name' variant='filled' {...register('name', {required: 'Name is required*'})} />
              <TextField fullWidth id='filled-basic' label='Surname' variant='filled' {...register('surname', {required: 'Surname is required*'})} />
              <TextField type='email' fullWidth id='filled-basic' label='Email' variant='filled' {...register('email', {required: 'Email is required*'})} />
              <TextField type='password' fullWidth id='filled-basic' label='Password' variant='filled' {...register('password', {required: 'Password is required*', minLength: {value: 8, message: 'Password should contain 8 characteres*'}})} />
              <TextField type='password' fullWidth id='filled-basic' label='Confirm Password' variant='filled' {...register('confirmpassword', {required: 'Password is required*', minLength: {value: 8, message: 'Password should contain 8 characteres*'}})} />
            </Stack>
            <Button variant='contained' type='submit' sx={{marginTop: 2,}}>Register</Button>
          </form>
          <br />
          <p>I have an account ? <Link to='/login'>Login</Link></p>
        </Box>

      </Stack>
    </>
  )
}

export default Register
