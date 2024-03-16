import { Button, Typography } from '@mui/material';
import React from 'react'
//import { useHistory } from 'react-router-dom';

const Dashboard_Page = () => {
   //const history = useHistory();

   const handleLogout = () =>{
    history.push('/');
   }


  return (
    <div>
     <Typography variant="h4">Dashboard</Typography>
     <Button variant = "contained" color = "primary" onClick={handleLogout}>
        Logout
     </Button>
    </div>
  )
}

export default Dashboard_Page