import { ReactNode } from 'react';
import { getTag } from '../../lib/tags';
import DateComponent from '../Date';
import TagButton from '../TagButton';
import contentStyles from '../../../public/styles/content.module.css';

interface PageViewProps {
  title: string;
  date: Date | string;
  tags?: string[];
  children: ReactNode;
}

const PageView = ({ title, date, tags = [], children }: PageViewProps) => {
  const finalDate = typeof date === 'string' ? new Date(date) : date;

  return (
    <article>
      <header>
        <h1>Test {title}</h1>
        <div className="metadata">
          <div>
            <DateComponent date={finalDate} />
          </div>
        </div>
      </header>
      <div className={`content ${contentStyles.content}`}>{children}</div>
      <ul className="tag-list">
        {tags.map((it, i) => (
          <li key={i}>
            <TagButton tag={getTag(it)} />
          </li>
        ))}
      </ul>
    </article>
  );
};

export default PageView;
