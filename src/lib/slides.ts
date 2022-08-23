import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import slides from '../../homepage/slides.json';

export interface Slide {
  readonly image: string;
  readonly title: string;
}

export interface SerializedSlide {
  readonly image: string;
  readonly titleSource: MDXRemoteSerializeResult<Record<string, unknown>, Record<string, string>>;
}

export default slides.slides as Slide[];
