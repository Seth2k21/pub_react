import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar';
import { Avatar, Box, Button, IconButton, Stack, TextField, Typography } from '@mui/material';
import AddNew from '../components/AddNew';
import axios from 'axios';
import { AccountCircle, DeleteForeverRounded, EditAttributesRounded, EditNoteRounded } from '@mui/icons-material';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import TaskItem from '../components/TaskItem';

function Store() {
  const navigate = useNavigate();
  const infoUser = JSON.parse(localStorage.getItem('user'));
  useEffect(() => {
    if(!localStorage.getItem('user')){
      navigate('/')
    }
  }, []);
  
  const queryClient = useQueryClient();
  const {data: tasking, error, isLoading} = useQuery({
    queryKey:  ['tasking'],
    queryFn: () => axios.get(`http://localhost:3000/tasks?idUser=${infoUser.id}`).then((response) => response.data),
    onerror: () => console.log(errort)
  });
  if (isLoading) {
    // localStorage.removeItem('user')
    return <div>Loading...</div>
  }
  let taskTrier = tasking.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  return (
    <Stack sx={{backgroundColor: '#f1f3f3', color: '#262525',}}>
      <Navbar/>

      <Typography variant='h6'  margin={3} > Mr {infoUser.name} <br /> Happy to see you again ! </Typography>

      <Stack direction={'row'} width={'100%'}>
        
        <AddNew/>

        <Box width={'100%'}  margin={3}>
          <Stack direction={'row'}>
            <Typography variant={'h5'}>All ({tasking.length})</Typography>
          </Stack>
          {tasking && taskTrier.map((task) => (
            <TaskItem task={task}/>
          ))}
          
        </Box>

      </Stack>
      
    </Stack>
  )
}

export default Store
