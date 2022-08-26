import EmailIcon from '@mui/icons-material/Email';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import Box from '@mui/material/Box';
import { styled, useTheme } from '@mui/material/styles';
import churchDetails from '../../../lib/church_details';
import useSmallScreen from '../../../util/smallScreen.util';

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

const CenteredBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ChurchDetailsHeader = () => {
  const theme = useTheme();
  const isSmallScreen = useSmallScreen();

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
        borderTop: '1px solid rgb(225, 209, 169)',
        [theme.breakpoints.down('md')]: {
          flexDirection: 'column',
          alignItems: 'center',
          gap: 0
        },
        [theme.breakpoints.up('md')]: {
          gap: 0.5
        }
      }}
    >
      {!isSmallScreen ? <Box sx={{ flexGrow: 1 }} /> : null}
      <CenteredBox>{churchDetails.name}</CenteredBox>
      {!isSmallScreen ? <Box>|</Box> : null}
      <CenteredBox>
        <ChurchDetailsHeaderLink
          href={`http://maps.google.com/maps?q=${encodeURIComponent(churchDetails.address)}`}
          target="_blank"
          rel="noreferrer"
        >
          {isSmallScreen ? (
            <CenteredBox sx={{ display: 'flex', flexDirection: 'column' }}>
              <CenteredBox>{churchDetails.address}</CenteredBox>
              <CenteredBox>
                {churchDetails.city}, {churchDetails.state} {churchDetails.zipcode}
              </CenteredBox>
            </CenteredBox>
          ) : (
            <CenteredBox>
              {churchDetails.address} - {churchDetails.city}, {churchDetails.state} {churchDetails.zipcode}
            </CenteredBox>
          )}
        </ChurchDetailsHeaderLink>
      </CenteredBox>
      {!isSmallScreen ? <Box>|</Box> : null}
      <CenteredBox>
        <ChurchDetailsHeaderLink href={`tel:${churchDetails.phone}`}>
          <PhoneEnabledIcon fontSize="small" />
          {churchDetails.phone}
        </ChurchDetailsHeaderLink>
      </CenteredBox>
      {!isSmallScreen ? <Box>|</Box> : null}
      <CenteredBox>
        <ChurchDetailsHeaderLink href={`mailto:${churchDetails.email}`} target="_blank" rel="noreferrer">
          <EmailIcon fontSize="small" />
          {churchDetails.email}
        </ChurchDetailsHeaderLink>
      </CenteredBox>
      {!isSmallScreen ? <Box sx={{ flexGrow: 1 }} /> : null}
    </Box>
  );
};

export default ChurchDetailsHeader;
