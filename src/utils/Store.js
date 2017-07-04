class Store {
	constructor() {
		this.schema = null;
		this.message = null;
		this.large = false;
		this.errors = null;
		this.errorPaths = [];
		this.segmentPaths = null;
		this.delimiters = [];
	}

	processDelimiters() {
		if (this.message["delimiters"]) {
			let delms = Store.message["delimiters"];
			this.delimiters = delms.split('Q');
		} else {
			this.delimiters = ["\\r\\n","*","\\","^"];
		}
	}

	lookupErrorSegment(path) {
		if (this.errorPaths.length === 0 && this.errors !== null) {
			this.errorPaths = [];
			this.errors.forEach((v, i) => {
				this.errorPaths.push(v.location.substring(0, v.location.lastIndexOf('/')))
			})
		}
		return this.errorPaths.indexOf(path) > -1
	}

	lookupErrorPath(path) {
		if (this.errorPaths.length === 0 && this.errors !== null) {
			this.errorPaths = [];
			this.errors.forEach((v, i) => {
				this.errorPaths.push(v.location.substring(0, v.location.lastIndexOf('/')))
			})
		}
		let found = false;
		for (let i = 0, len = this.errorPaths.length; i < len; i++) {
			if (this.errorPaths[i].startsWith(path)) {
				found = true;
			}
		}
		return found;
	}

	lookupSegmentPath(selectedPath) {
		let paths = selectedPath.split('/');
		if (paths.length > 3) {
			let elements = this.schema["transaction"][0].element;
			paths = paths.slice(3);
			let element = null;
			element = this.processPaths(elements, paths);
			return element;
		}
	}

	lookupHeaderPath(selectedPath) {
		let paths = selectedPath.split('/');
		if (paths.length > 0) {
			let elements = this.schema["segment"];
			let path = paths[paths.length - 1];
			let name = "segment:"+ path.substring(0, path.indexOf('['));
			for (let el of elements) {
				if (el.name === name) {
					return el;
				}
			}
		}
	}

	processPaths(elements, paths) {

		for (let i = 0, len = paths.length; i < len; i++) {
			let name = '';
			let path = paths[i];

			if (i === (len - 1)) {
				name = "segment:" + path.substring(0, path.indexOf('['));
			} else {
				name = "loop:" + path.substring(0, path.indexOf('['));
			}

			for (let el of elements) {
				if (el.name === name) {
					if (el.name.startsWith("loop")) {
						return this.processPaths(el.element, paths.slice(1));
					} else {
						return el;
					}
				}
			}
		}
	}

	/*processPath(path, element) {
		for (let el of element) {
			if (el.name.startsWith("segment")) {
				let paths = [];
				if (this.segmentPaths[el.name]) {
					let paths = this.segmentPaths[el.name];
					paths.push(path + "/" + el.name);
					this.segmentPaths[el.name] = paths
				} else {
					paths.push(path + "/" + el.name)
					this.segmentPaths[el.name] = paths;
				}
			} else if (el.name.startsWith("loop")) {
				this.processPath(path + "/" + el.name, el.element);
			}
		}
	}*/
}

export default (new Store());