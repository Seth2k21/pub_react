import React from 'react'
import { Avatar, Box, Button, IconButton, Stack, TextField, Typography } from '@mui/material';
import { AccountCircle, DeleteForeverRounded, EditAttributesRounded, EditNoteRounded } from '@mui/icons-material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function TaskItem({task}) {
    const useQuery = useQueryClient();
    const mutationd = useMutation({
        mutationFn: (id) => {
            return axios.delete(`http://localhost:3000/tasks/${id}`);
        },
        onError: (error) => {
            toast.error('Failed to delete task');
        },
        onSuccess: () => {
            useQuery.invalidateQueries('tasking');
            toast.success('Task successful delete');
        }
    });
    const mutationc = useMutation({
        mutationFn: (id) => {
            const status = {status: true}
            return axios.patch(`http://localhost:3000/tasks/id=${id}`, status);
        },
        onError: (error) => {
            toast.error('Failed to complete task');
        },
        onSuccess: () => {
            useQuery.invalidateQueries('completed');
            useQuery.invalidateQueries('processed');
            toast.success('Task successful completed');
        }
    });
    const deleteTask = (id) => {
        mutationd.mutate(id);
    }
    const completeTask = (id) => {
        mutationc.mutate(id);
    }

    return (
      <Box width={'100%'} bgcolor={task.status && 'green' || '#fff'} borderRadius={5} padding={2} marginTop={3}>  
          <Stack direction={'row'} justifyContent={'space-between'}>
            <Stack justifyContent={'space-between'} direction={'row'} alignItems={'center'}>
              <Avatar src={task.image} />
              <Typography marginLeft={2}>{task.title}</Typography>
            </Stack>
            <Stack justifyContent={'space-between'} direction={'row'} alignItems={'center'}>
              {!task.status && <IconButton
                aria-label='edit'
                onClick={() => completeTask(task.id)}
                color="#ff0000"
                >
                <EditNoteRounded  />
              </IconButton>}
              <IconButton
                marginLeft={2}
                aria-label='delete'
                onClick={() => deleteTask(task.id)}
                color="#ffff00"
                >
                  <DeleteForeverRounded  />
              </IconButton>
            </Stack>
          </Stack>
          <br />
          <b>Description</b>
          <p>{task.description}</p>
      </Box>
    )
}
