import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const SearchBox = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <TextField
        variant="outlined"
        size="small"
        placeholder="Enter your search"
        sx={{ background: 'white', mb: 4 }}
        fullWidth
      />
    </Box>
  );
};

export default SearchBox;
