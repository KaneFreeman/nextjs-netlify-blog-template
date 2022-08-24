import { CMS } from 'netlify-cms-core';
import { useEffect } from 'react';
import BlogPostPreview from '../components/previews/BlogPostPreview';
import { useScript } from '../util/useScript';

const Admin = () => {
  useScript('https://identity.netlify.com/v1/netlify-identity-widget.js');
  const { script: cms } = useScript<CMS>('https://unpkg.com/netlify-cms@^2.0.0/dist/netlify-cms.js', 'CMS');

  useEffect(() => {
    if (!cms) {
      return;
    }

    cms.registerPreviewStyle('https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400&display=swap');
    cms.registerPreviewStyle('/styles/content.module.css');
    cms.registerPreviewTemplate('posts', BlogPostPreview);
  }, [cms]);

  return <div />;
};

export default Admin;
