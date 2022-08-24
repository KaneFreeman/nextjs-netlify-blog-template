import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import { MDXRemote } from 'next-mdx-remote';
import { CAROUSEL_MAX_HEIGHT, MAX_APP_WIDTH } from '../../constants';
import { SerializedSlide } from '../../lib/slides';
import carouselStyles from '../../../public/styles/carousel-content.module.css';

interface CarouselSlideProps {
  slide: SerializedSlide;
  selected: boolean;
}

const CarouselSlide = ({ slide: { image, titleSource }, selected }: CarouselSlideProps) => {
  return (
    <Box sx={{ position: 'relative' }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <Box
        sx={{
          backgroundImage: `url(${image})`,
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          width: '100%',
          height: CAROUSEL_MAX_HEIGHT
        }}
      />
      <Fade in={selected} easing="ease-in" style={{ transitionDelay: '500ms' }}>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Box sx={{ maxWidth: MAX_APP_WIDTH, width: '100%' }} className={`${carouselStyles.carouselContent}`}>
            <MDXRemote {...titleSource} />
          </Box>
        </Box>
      </Fade>
    </Box>
  );
};

export default CarouselSlide;
