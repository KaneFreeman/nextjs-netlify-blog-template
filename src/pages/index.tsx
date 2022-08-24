import Box from '@mui/material/Box';
import { serialize } from 'next-mdx-remote/serialize';
import { useEffect } from 'react';
import CarouselView from '../components/carousel/CarouselView';
import Layout from '../components/Layout';
import BasicMeta from '../components/meta/BasicMeta';
import OpenGraphMeta from '../components/meta/OpenGraphMeta';
import TwitterCardMeta from '../components/meta/TwitterCardMeta';
import { SocialList } from '../components/SocialList';
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
      <div className="container">
        <Box sx={{ width: '100%' }}>
          <CarouselView slides={slides} />
          <h1>
            Hi, We&apos;re Next.js & Netlify<span className="fancy">.</span>
          </h1>
          <span className="handle">@nextjs-netlify-blog</span>
          <h2>A blog template with Next.js and Netlify.</h2>
          <SocialList />
        </Box>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 1 1 auto;
        }
        h1 {
          font-size: 2.5rem;
          margin: 0;
          font-weight: 500;
        }
        h2 {
          font-size: 1.75rem;
          font-weight: 400;
          line-height: 1.25;
        }
        .fancy {
          color: #15847d;
        }
        .handle {
          display: inline-block;
          margin-top: 0.275em;
          color: #9b9b9b;
          letter-spacing: 0.05em;
        }

        @media (min-width: 769px) {
          h1 {
            font-size: 3rem;
          }
          h2 {
            font-size: 2.25rem;
          }
        }
      `}</style>
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
