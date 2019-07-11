import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';
import { newFile } from '../actions/fileActions';
import './styles/modal.css';

ReactModal.setAppElement('#root');

class NewFileModal extends Component {

  state = {
    newFileName: ''
  }

  onInputChange(e) {
    this.setState({ newFileName: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const { newFileName } = this.state;

    if (newFileName) {
      this.props.newFile(newFileName);
      // clear state
      this.setState({ newFileName: '' });
      // close modal
      this.props.onRequestClose();
    }
  }

  render() {
    const { isOpen, onRequestClose } = this.props;

    return (
      <div>
        <ReactModal
          isOpen={isOpen}
          contentLabel="Create New File"
          onRequestClose={onRequestClose}
          shouldCloseOnEsc
          shouldCloseOnOverlayClick
        >
          <form onSubmit={this.onSubmit.bind(this)}>
            <div className="form-group">
              <label htmlFor="file-name">File Name</label>
              <input
                value={this.state.newFileName}
                onChange={this.onInputChange.bind(this)}
                className="input"
                type="text"
                autoFocus
                name="file-name" />
            </div>
          </form>
        </ReactModal>
      </div>
    )
  }
}

export default connect(null, { newFile })(NewFileModal);