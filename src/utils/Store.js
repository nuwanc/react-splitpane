class Store {
	constructor() {
		this.schema = null;
		this.message = null;
		this.large = false;
		this.errors = null;
		this.delimiters = [];
	}

	processDelimiters() {
		if (this.message["delimiters"]) {
			let delms = Store.message["delimiters"];
			this.delimiters = delms.split('Q');
		} else {
			this.delimiters = ["\\r\\n", "*", "\\", "^"];
		}
	}

	getErrorList() {
		let errors = [];
		if (this.errors) {
			Object.keys(this.errors).forEach((key)=>{
				errors = errors.concat(this.errors[key]);
			});
		}
		return errors;
	}

	lookupErrorSegment(path) {
		if (this.errors) {
			let error = this.errors[path];
			if (error) {
				return {
					text: error[0].message
				}
			} else {
				return null;
			}
		} else {
			return null;
		}

	}

	lookupErrorPath(path) {
		let found = false;
		if (this.errors) {
			Object.keys(this.errors).forEach((key)=>{
				if (key.startsWith(path)) {
					found = true;
				}
			});
			return found;
		} else {
			return found;
		}

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
			let name = "segment:" + path.substring(0, path.indexOf('['));
			//this is not working in IE
			/*for (let el of elements) {
				if (el.name === name) {
					return el;
				}
			}*/
			for (let i = 0, length = elements.length; i < length; i++) {
				let el = elements[i];
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
			//not working in ie
			/*for (let el of elements) {
				if (el.name === name) {
					if (el.name.startsWith("loop")) {
						return this.processPaths(el.element, paths.slice(1));
					} else {
						return el;
					}
				}
			}*/
			for (let i = 0, length = elements.length; i < length; i++) {
				let el = elements[i];
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
}

export default (new Store());