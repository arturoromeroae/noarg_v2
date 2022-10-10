import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Spinner = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '10px' }}>
      <Box>
        <CircularProgress />
      </Box>
    </div>
  )
}

export default Spinner