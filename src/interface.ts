import matter from 'gray-matter';

export interface FileMatter {
  readonly fileName: string;
  readonly fullPath: string;
  readonly matterResult: matter.GrayMatterFile<string>;
}
