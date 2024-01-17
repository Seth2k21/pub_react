import { Box, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem('user')){
      navigate('/store')
    }
  });

  return (
    <>
      <Box >
        <Stack direction={'row'} position={'absolute'} top={0} padding={2} width={'100%'} alignItems={'center'} justifyContent={'space-between'}>
          <Typography variant='h5' color={'#fff'}>Pub</Typography>
          <Stack direction={'row'} gap={3} >
            <Link style={{color: '#fff', textDecoration: 'none', fontWeight: 'bold'}} to="/login">Login</Link>
            <Link style={{color: '#fff', textDecoration: 'none', fontWeight: 'bold'}} to="/register">Register</Link>
          </Stack>
        </Stack>
        
        <img src="https://www.coindesk.com/resizer/M8GGZYwGKZuLaGEuCox2QFbmyJw=/arc-photo-coindesk/arc2-prod/public/YPUE57ECTNAM3FSR67SMMOGY44.jpeg" height={'615vh'} width={'100%'} alt="" />
      </Box>
    </>
  )
}

export default App
