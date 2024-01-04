import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import welcomeImage from '../assets/images/welcomeImage.svg';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import { Stack } from '@mui/system';
import useConfigStore from '../store/configStore';




const LandingPage = () => {

  const { setNewUser } = useConfigStore()
  const ImgStyles = {
    width: '100%',
    maxWidth: '500px',
    margin: '0 auto',
    minWidth: '300px'
  }

  return (

    <Stack direction='row' spacing={2} paddingX="5vw" alignItems='center' paddingTop={'15vh'} >
      <Stack direction='column' alignItems='center' spacing={5} >
        <Typography variant='h4' gutterBottom color='primary' >Web To-Do Extension</Typography>
        <Typography paragraph paddingX='30px'> What if your web browser, the tools you use to go online, could do more than just show websites?
          What if it could help you remember what you need to do and keep you organized while you’re
          on the internet? That’s exactly what a “Web To-Do Extension” does.
        </Typography>
        <Box>

          <Button onClick={setNewUser} color='primary' variant="contained" endIcon={<NavigateNextRoundedIcon />} >
            Get Started
          </Button>
        </Box>
      </Stack>
      <Box sx={ImgStyles}>
        <img src={welcomeImage} sx alt='TodoImage' />
      </Box>
    </Stack>



  )
}


export default LandingPage