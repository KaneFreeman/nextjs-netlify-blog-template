import { useEffect, useState } from 'react';

interface StyleCopyProps {
  document: Document;
}

const StyleCopy = ({ document }: StyleCopyProps) => {
  const [styles, setStyles] = useState<HTMLStyleElement[]>([]);

  useEffect(() => {
    if (typeof window === undefined) {
      return;
    }

    console.log('[StyleCopy] useEffect!');
    if (parent) {
      const arrStyleSheets = parent.document.getElementsByTagName('style');
      console.log('[StyleCopy] arrStyleSheets.length:', arrStyleSheets.length);
      const newStyles: HTMLStyleElement[] = [];
      for (let i = 0; i < arrStyleSheets.length; i++) {
        console.log('[StyleCopy] copying!', i, arrStyleSheets[i]);
        newStyles.push(arrStyleSheets[i].cloneNode(true) as HTMLStyleElement);
      }
      setStyles(newStyles);
    }
  }, []);

  useEffect(() => {
    if (parent) {
      console.log('[StyleCopy] HEAD', document.getElementsByTagName('head'));
      const oHead = document.getElementsByTagName('head')[0];
      styles.forEach((style) => oHead.appendChild(style));

      return () => {
        styles.forEach((style) => oHead.removeChild(style));
      };
    }

    return () => {};
  }, [document, styles]);

  return null;
};

export default StyleCopy;
