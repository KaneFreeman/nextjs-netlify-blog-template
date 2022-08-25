/* eslint-disable react/display-name */
import { css, Global } from '@emotion/core';
import { EditorType } from '@toast-ui/editor';
import '@toast-ui/editor/dist/toastui-editor-only.css';
import { Editor } from '@toast-ui/react-editor';
import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import contentStyles from '../../../../public/styles/content.module.css';

function ToastUIGlobalStyles() {
  return (
    <Global
      styles={css`
        .toastui-editor-main .toastui-editor-md-vertical-style .toastui-editor {
          width: 100%;
        }

        .toastui-editor-main .toastui-editor-md-vertical-style .toastui-editor-md-splitter {
          display: none;
        }

        .toastui-editor-main .toastui-editor-md-vertical-style .toastui-editor-md-preview {
          display: none;
        }
      `}
    />
  );
}

// TODO: passing the editorControl and components like this is horrible, should
// be handled through Redux and a separate registry store for instances
let _editorControl;
// eslint-disable-next-line func-style
let _getEditorComponents = () => {
  return new Map();
};

export function getEditorControl() {
  return _editorControl;
}

export function getEditorComponents() {
  return _getEditorComponents();
}

function toCleanMarkdown(value: string): string {
  return value.replace(/<br>/g, '<br />').replace(/<[\/]{0,1}em>/g, '**');
}

function toCleanValue(value: string): string {
  return value.replace(/<br \/>/g, '<br>').replace(/<[\/]{0,1}em>/g, '**');
}

interface MarkdownControlProps {
  value?: string;
  classNameWrapper: string;
  editorControl: React.ReactNode;
  field: Record<any, any>;
  onChange(value: string): void;
  onAddAsset(): void;
  getAsset(): void;
  getEditorComponents: () => Map<any, any>;
  t(): void;
}

const MarkdownControl = memo(({ value = '', onChange, getEditorComponents, editorControl }: MarkdownControlProps) => {
  const editorRef = useRef<Editor>();
  const [editorType, setEditorType] = useState<EditorType>('markdown');

  const cleanValue = useMemo(() => toCleanValue(value), [value]);

  useEffect(() => {
    _getEditorComponents = getEditorComponents;
  }, [getEditorComponents]);

  useEffect(() => {
    _editorControl = editorControl;
  }, [editorControl]);

  const setValueAsContent = useCallback(() => {
    const content = editorRef.current.getInstance().getMarkdown();
    if (content !== cleanValue) {
      editorRef.current.getInstance().setMarkdown(cleanValue);
    }
  }, [cleanValue]);

  useEffect(() => {
    setValueAsContent();
  }, [setValueAsContent]);

  const handleOnChange = useCallback(
    (newEditorType: EditorType) => {
      const content = editorRef.current.getInstance()?.getMarkdown();
      if (newEditorType !== editorType) {
        setEditorType(newEditorType);
        setValueAsContent();
        return;
      }

      if (content.trim() === '') {
        return;
      }

      onChange(toCleanMarkdown(content));
    },
    [editorType, onChange, setValueAsContent]
  );

  return useMemo(
    () => (
      <>
        <ToastUIGlobalStyles />
        <div className={contentStyles.content}>
          <Editor
            ref={editorRef}
            initialValue={cleanValue}
            initialEditType="wysiwyg"
            previewStyle="vertical"
            height="auto"
            useCommandShortcut={true}
            onChange={handleOnChange}
          />
        </div>
      </>
    ),
    [cleanValue, handleOnChange]
  );
});

export default MarkdownControl;
