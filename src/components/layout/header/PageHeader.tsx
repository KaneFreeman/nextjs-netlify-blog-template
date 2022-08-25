import Box from '@mui/material/Box';
import styles from '../../../lib/styles';
import ChurchDetailsHeader from './ChurchDetailsHeader';

interface PageHeaderProps {
  title: string;
}

const PageHeader = ({ title }: PageHeaderProps) => {
  return (
    <>
      <Box
        sx={{
          backgroundImage: `url(${styles.header_background})`,
          backgroundRepeat: 'repeat-x',
          backgroundPosition: 'center top',
          padding: '130px 0 40px',
          width: '100%'
        }}
      >
        <Box
          component="h1"
          sx={{
            color: styles.header_color,
            fontStyle: styles.header_font_style,
            textAlign: 'center',
            margin: 0,
            fontSize: '50px',
            lineHeight: '50px',
            fontWeight: 400
          }}
        >
          {title}
        </Box>
      </Box>
      <ChurchDetailsHeader />
    </>
  );
};

export default PageHeader;
