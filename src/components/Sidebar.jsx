import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FaFolderOpen, FaPlus } from 'react-icons/fa';
import { openDirectory, loadFiles, readFile, saveFile } from '../actions/fileActions';
import { updateEditor } from '../actions/editorActions';

import NewFileModal from './NewFileModal';
import './styles/sidebar.css';

const { ipcRenderer } = window.require('electron');

class Sidebar extends Component {

	state = {
		modalOpen: false
	}

	componentWillMount() {
		this.updateNewFileMenuItem();

		// handle menu item clicks
		ipcRenderer.on('directory:open', this.onOpenDir);
		ipcRenderer.on('file:save', this.onSaveFile);
		ipcRenderer.on('file:new', this.onNewFile);
	}
	componentDidUpdate() {
		this.updateNewFileMenuItem();
	}

	updateNewFileMenuItem = () => {
		if (this.props.activeDir) {
			// notify main process that new file is now creatable
			ipcRenderer.send('file:creatable');
		} else {
			ipcRenderer.send('file:not-creatable');
		}
	}

	onOpenDir = () => {
		this.props.openDirectory()
			.then(directory => {
				this.props.loadFiles(directory)
			});
	}

	onNewFile = () => {
		this.setState({ modalOpen: true });
	}
	onModalClose = () => {
		this.setState({ modalOpen: false });
	}

	onSaveFile = () => {
		this.props.saveFile();
	}

	onSelectFile(file) {
		this.props.readFile(file.path);
	}

	renderFiles() {
		const activeFilePath = this.props.activeFile && this.props.activeFile.path;

		if (this.props.files.length > 0) {
			return (
				this.props.files.map((file, i) => (
					<div
						className={`file-select
							${activeFilePath === file.path ? 'active' : ''}`
						}
						key={i}
						onClick={this.onSelectFile.bind(this, file)}
					>
						<h3>{file.name}</h3>
					</div>
				))
			);
		}
	}

	render() {
		return (
			<div className="sidebar">
				<div className="button-group">
					<button className="btn" onClick={this.onOpenDir}>
						<FaFolderOpen size="1.5em" className="btn-icon" />
						Open Folder
          </button>

					{this.props.activeDir &&
						<button
							className="btn"
							onClick={this.onNewFile}>
							<FaPlus size="1.5em" className="btn-icon" />
							New File
            </button>
					}
				</div>

				<NewFileModal
					isOpen={this.state.modalOpen}
					onRequestClose={this.onModalClose}
				/>
				{this.renderFiles()}
			</div>
		)
	}
}

const mapStateToProps = state => {
	const { files, activeDir, activeFile } = state.directory;

	return { files, activeDir, activeFile };
}

export default connect(mapStateToProps, {
	openDirectory, loadFiles, readFile, updateEditor, saveFile
})(Sidebar);