import Box from '@mui/material/Box';
import { serialize } from 'next-mdx-remote/serialize';
import { useEffect } from 'react';
import CarouselView from '../components/carousel/CarouselView';
import Layout from '../components/Layout';
import SocialList from '../components/layout/footer/SocialList';
import BasicMeta from '../components/meta/BasicMeta';
import OpenGraphMeta from '../components/meta/OpenGraphMeta';
import TwitterCardMeta from '../components/meta/TwitterCardMeta';
import slides, { SerializedSlide } from '../lib/slides';
import useLocation from '../util/useLocation';
import useNavigate from '../util/useNavigate';

interface HomepageProps {
  slides: SerializedSlide[];
}

export default function Homepage({ slides }: HomepageProps) {
  const { hash = '', pathname = '' } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (hash === undefined || hash.trim() === '') {
      return;
    }

    const hashParts = hash.split('=');
    if (hashParts.length == 2) {
      switch (hashParts[0]) {
        case '#invite_token':
        case '#recovery_token':
        case '#email_change_token':
        case '#confirmation_token':
          navigate(`${pathname.replace(/\/$/g, '')}/admin${hash}`);
          return;
      }
    }
  }, [hash, navigate, pathname]);

  return (
    <Layout>
      <BasicMeta url={'/'} />
      <OpenGraphMeta url={'/'} />
      <TwitterCardMeta url={'/'} />
      <div>
        <Box sx={{ width: '100%' }}>
          <CarouselView slides={slides} />
          <h1>
            Hi, We&apos;re Next.js & Netlify<span>.</span>
          </h1>
          <span>@nextjs-netlify-blog</span>
          <h2>A blog template with Next.js and Netlify.</h2>
          <SocialList />
        </Box>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const serializedSlides: SerializedSlide[] = [];
  for (const slide of slides) {
    const mdxTitle = await serialize(slide.title);
    serializedSlides.push({
      image: slide.image,
      titleSource: mdxTitle
    });
  }

  const source = 'Some **mdx** text, with a component <Test />';
  return { props: { slides: serializedSlides } };
}
