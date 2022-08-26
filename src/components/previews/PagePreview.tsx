import { PreviewTemplateComponentProps } from 'netlify-cms-core';
import PageView from '../pages/PageView';

const PagePreview = ({ entry, widgetFor }: PreviewTemplateComponentProps) => {
  return (
    <>
      <h1>{entry.getIn(['data', 'title'])}</h1>
      <div className="content">{widgetFor('body')}</div>
    </>
  );
};
export default PagePreview;
