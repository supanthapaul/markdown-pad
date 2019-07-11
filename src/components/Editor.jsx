import React, { Component } from 'react';
import { connect } from 'react-redux';
import AceEditor from 'react-ace';
import 'brace/mode/markdown';
import 'brace/theme/github';

import { updateEditor } from '../actions/editorActions';

class Editor extends Component {

  onInputChange(newCode) {
    this.props.updateEditor(newCode);
  }

  render() {
    return (
      <div className="textarea-container">
        <AceEditor
          value={this.props.editorText}
          onChange={this.onInputChange.bind(this)}
          fontSize="20px"
          height="100%"
          width="100%"
          wrapEnabled={true}
          mode="markdown"
          theme="github"
          name="UNIQUE_ID_OF_DIV"
          editorProps={{ $blockScrolling: true }}
        />
      </div>
    )
  }
}

export default connect(null, { updateEditor })(Editor);