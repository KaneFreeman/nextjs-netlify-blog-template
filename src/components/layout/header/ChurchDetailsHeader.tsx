import EmailIcon from '@mui/icons-material/Email';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import churchDetails from '../../../lib/church_details';

const ChurchDetailsHeaderLink = styled('a')`
  display: flex;
  align-items: center;
  color: white;
  gap: 4px;

  &:hover {
    color: white;
    text-decoration: underline;
  }
`;

const ChurchDetailsHeader = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        background: 'black',
        color: 'white',
        fontFamily: 'Lato',
        fontSize: '17px',
        lineHeight: '34px',
        width: '100%',
        gap: 0.5,
        borderTop: '1px solid rgb(225, 209, 169)'
      }}
    >
      <Box sx={{ flexGrow: 1 }} />
      <Box>{churchDetails.name}</Box>
      <Box>|</Box>
      <Box>
        <ChurchDetailsHeaderLink
          href={`http://maps.google.com/maps?q=${encodeURIComponent(churchDetails.address)}`}
          target="_blank"
          rel="noreferrer"
        >
          {churchDetails.address} - {churchDetails.city}, {churchDetails.state} {churchDetails.zipcode}
        </ChurchDetailsHeaderLink>
      </Box>
      <Box>|</Box>
      <Box>
        <ChurchDetailsHeaderLink href={`tel:${churchDetails.phone}`}>
          <PhoneEnabledIcon fontSize="small" />
          {churchDetails.phone}
        </ChurchDetailsHeaderLink>
      </Box>
      <Box>|</Box>
      <Box>
        <ChurchDetailsHeaderLink href={`mailto:${churchDetails.email}`} target="_blank" rel="noreferrer">
          <EmailIcon fontSize="small" />
          {churchDetails.email}
        </ChurchDetailsHeaderLink>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
    </Box>
  );
};

export default ChurchDetailsHeader;
