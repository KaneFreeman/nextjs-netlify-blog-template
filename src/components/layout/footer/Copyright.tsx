import Box from '@mui/material/Box';
import CopyrightIcon from '@mui/icons-material/Copyright';

export default function Copyright() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        borderTop: '1px solid rgba(255,255,255,.1)',
        color: 'rgb(245, 244, 243)',
        backgroundColor: 'rgb(104, 11, 18)',
        boxSizing: 'border-box',
        height: '44px',
        fontSize: '14px',
        lineHeight: '18px',
        gap: 1
      }}
    >
      <CopyrightIcon fontSize="small" />
      <Box>2022 Saint Joseph Catholic Church. All Rights Reserved.</Box>
      <Box
        sx={{
          color: '#988773',
          '&:hover': {
            color: 'rgb(245, 244, 243)',
            textDecoration: 'underline'
          }
        }}
        component="a"
        href="#"
      >
        Privacy Policy.
      </Box>
    </Box>
  );
}
