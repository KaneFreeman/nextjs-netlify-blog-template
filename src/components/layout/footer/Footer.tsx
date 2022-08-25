import Box from '@mui/material/Box';
import churchDetails from '../../../lib/church_details';
import styles from '../../../lib/styles';
import Container from '../Container';
import ContactDetails from './ContactDetails';
import Copyright from './Copyright';
import FooterAside from './FooterAside';
import FooterHeader from './FooterHeader';
import SearchBox from './SearchBox';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        mt: 4
      }}
    >
      <Box
        sx={{
          backgroundColor: '#e8e5e1',
          backgroundImage: `url(${styles.footer_background})`,
          backgroundRepeat: 'repeat',
          backgroundPosition: 'center top',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pt: 5,
          pb: 1
        }}
      >
        <Container
          sx={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gap: 6
          }}
        >
          <Box>
            <FooterAside title="Our Mission Statement" text={churchDetails.mission_statement} />
            <FooterAside title="Vision Statement" text={churchDetails.vision_statement} />
          </Box>
          <Box>
            <FooterHeader text="Search Our Site" />
            <SearchBox />
            <ContactDetails />
          </Box>
        </Container>
      </Box>
      <Copyright />
    </Box>
  );
};

export default Footer;
