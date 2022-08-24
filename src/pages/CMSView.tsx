import { CMS } from 'netlify-cms-core';
import { useEffect } from 'react';
import controlComponent from '../cms/markdown/MarkdownControl';
import previewComponent from '../cms/markdown/MarkdownPreview';
import schema from '../cms/markdown/schema';
import BlogPostPreview from '../components/previews/BlogPostPreview';
import { useScript } from '../util/useScript';

const CMSView = () => {
  useScript('https://uicdn.toast.com/editor/latest/toastui-editor-all.min.js');
  useScript('https://identity.netlify.com/v1/netlify-identity-widget.js');
  const { script: cms } = useScript<CMS>('https://unpkg.com/netlify-cms@2.10.192/dist/netlify-cms.js', 'CMS');

  useEffect(() => {
    if (!cms) {
      return;
    }

    cms.registerPreviewStyle('https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400&display=swap');
    cms.registerPreviewStyle('/styles/content.module.css');
    cms.registerPreviewTemplate('posts', BlogPostPreview);

    (cms.registerWidget as any)('markdown', controlComponent, previewComponent, schema);
  }, [cms]);

  return <div />;
};

export default CMSView;
