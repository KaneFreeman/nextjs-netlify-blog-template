import { PreviewTemplateComponentProps } from 'netlify-cms-core';
import PageView from '../pages/PageView';

const PagePreview = ({ entry, widgetFor }: PreviewTemplateComponentProps) => {
  return (
    <PageView
      title={entry.getIn(['data', 'title'])}
      date={entry.getIn(['data', 'date'])}
      tags={entry.getIn(['data', 'tags'])}
    >
      {widgetFor('body')}
    </PageView>
  );
};
export default PagePreview;
