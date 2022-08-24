import { css, Global } from '@emotion/core';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import PropTypes from 'prop-types';
import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

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

        .toastui-editor-contents table {
          width: 100%;
        }
      `}
    />
  );
}

// TODO: passing the editorControl and components like this is horrible, should
// be handled through Redux and a separate registry store for instances
let editorControl;
// eslint-disable-next-line func-style
let _getEditorComponents = () => {};

export function getEditorControl() {
  return editorControl;
}

export function getEditorComponents() {
  return _getEditorComponents();
}

interface MarkdownControlProps {
  value: string;
  onChange(value: string): void;
}

export default class MarkdownControl extends React.Component<MarkdownControlProps> {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    onAddAsset: PropTypes.func.isRequired,
    getAsset: PropTypes.func.isRequired,
    classNameWrapper: PropTypes.string.isRequired,
    editorControl: PropTypes.elementType.isRequired,
    value: PropTypes.string,
    field: ImmutablePropTypes.map.isRequired,
    getEditorComponents: PropTypes.func,
    t: PropTypes.func.isRequired
  };

  static defaultProps = {
    value: ''
  };

  editorRef = React.createRef<Editor>();

  constructor(props) {
    super(props);
    editorControl = props.editorControl;

    _getEditorComponents = props.getEditorComponents;
    this.state = {
      pendingFocus: false
    };
  }

  componentDidMount() {}

  componentDidUpdate() {
    const content = this.editorRef.current.getInstance().getMarkdown();
    const cleanValue = this.props.value.replace(/<br \/>/g, '<br>');
    if (content !== cleanValue) {
      this.editorRef.current.getInstance().setMarkdown(cleanValue);
    }
  }

  onChange = () => {
    const content = this.editorRef.current.getInstance().getMarkdown();
    const cleanContent = content.replace(/<br>/g, '<br />');
    this.props.onChange(cleanContent);
  };

  render() {
    const { value } = this.props;
    return (
      <>
        <ToastUIGlobalStyles />
        <Editor
          ref={this.editorRef}
          initialValue={value}
          previewStyle="vertical"
          height="600px"
          initialEditType="markdown"
          useCommandShortcut={true}
          onChange={this.onChange}
        />
      </>
    );
  }
}
