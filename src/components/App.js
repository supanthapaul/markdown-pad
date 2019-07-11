import React, { Component } from 'react';
import { connect } from 'react-redux';

import Sidebar from './Sidebar';
import Editor from './Editor';
import Preview from './Preview';
import './styles/App.css';

class App extends Component {

  render() {
    return (
      <div style={{ height: '100%' }}>
        <div className="root">
          <Sidebar />
          <div className="main">
            <Editor editorText={this.props.editorText} />
            <Preview editorText={this.props.editorText} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  editorText: state.editor.text
})

export default connect(mapStateToProps)(App);
