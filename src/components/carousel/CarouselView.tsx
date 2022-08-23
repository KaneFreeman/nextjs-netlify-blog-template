import Box from '@mui/material/Box';
import { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { CAROUSEL_INTERVAL, CAROUSEL_MAX_HEIGHT } from '../../constants';
import { SerializedSlide } from '../../lib/slides';
import CarouselSlide from './CarouselSlide';

interface CarouselViewProps {
  slides: SerializedSlide[];
}

const CarouselView = ({ slides }: CarouselViewProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <Box
      sx={{
        height: CAROUSEL_MAX_HEIGHT,
        display: 'flex',
        overflow: 'hidden',
        position: 'relative',
        '& .carousel': {
          height: '100%'
        }
      }}
    >
      <Carousel interval={CAROUSEL_INTERVAL} showStatus={false} onChange={setSelectedIndex} autoPlay infiniteLoop>
        {slides.map((slide, index) => (
          <CarouselSlide key={`slide-${index}`} slide={slide} selected={index === selectedIndex} />
        ))}
      </Carousel>
    </Box>
  );
};
export default CarouselView;
