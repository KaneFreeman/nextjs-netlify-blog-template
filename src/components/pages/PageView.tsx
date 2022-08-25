import Box from '@mui/material/Box';
import { ReactNode } from 'react';
import contentStyles from '../../../public/styles/content.module.css';
import { getTag } from '../../lib/tags';
import Container from '../layout/Container';
import PageHeader from '../layout/header/PageHeader';
import QuickLinks from '../layout/sidebar/QuickLinks';
import TagButton from '../TagButton';

interface PageViewProps {
  title: string;
  tags?: string[];
  children: ReactNode;
}

const PageView = ({ title, tags = [], children }: PageViewProps) => {
  return (
    <Box
      component="article"
      sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%' }}
    >
      <Box
        component="header"
        sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%' }}
      >
        <PageHeader title={title} />
      </Box>
      <Container
        sx={{
          pt: 6,
          pb: 1
        }}
      >
        <Box sx={{ display: 'flex', gap: 4 }}>
          <Box sx={{ flexGrow: 1 }}>
            <div className={`content ${contentStyles.content}`}>{children}</div>
            <ul>
              {tags.map((it, i) => (
                <li key={i}>
                  <TagButton tag={getTag(it)} />
                </li>
              ))}
            </ul>
          </Box>
          <QuickLinks />
        </Box>
      </Container>
    </Box>
  );
};

export default PageView;
