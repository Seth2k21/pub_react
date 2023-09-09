import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom'

function AddNew() {
  const navigate = useNavigate();
  const usequeryclient = useQueryClient();
  const user = JSON.parse(localStorage.getItem('user'));
  const {handleSubmit, register, reset, formState: {errors}} = useForm();
  const mutation = useMutation({
    mutationFn: (newTask) => {
      return axios.post(`http://localhost:3000/tasks`, newTask);
    },
    onError: (error) => {
      toast.error('Failed to save task');
    },
    onSuccess: () => {
      reset();
      usequeryclient.invalidateQueries('tasking');
      toast.success('Task successful saved');
    }
  });
  const onSubmit = (data) => {
    const task = {...data, idUser: user.id, creat_at: new Date(), status: false};
    mutation.mutate(task);
  };

  return (
    <>
      <Box alignItems={"center"} width={400} sx={{backgroundColor: '#fff', color: '#262525', padding: 3, margin: 3}}>
        <Typography variant='h5'> Add New Task </Typography>  
          <br />
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack direction={'column'} gap={2}>
              <TextField type='url' fullWidth id='outlined-basic' label='Image url' variant='outlined' {...register('image')} />
              <TextField fullWidth id='outlined-basic' label='Title' variant='outlined' {...register('title', {required: 'Title is required*',})} />
              <TextField fullWidth id='outlined-basic' label='Description' multiline rows={4} variant='outlined' {...register('description',)} />
              <TextField type='datetime-local' fullWidth id='outlined-basic' variant='outlined' {...register('date', {required: 'Date is required*'})} />
            </Stack>
            <Button variant='contained' type='submit' sx={{marginTop: 2,}}>Save</Button>
          </form>
      </Box>
    </>
  )
}

export default AddNew
