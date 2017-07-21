class Store {
	constructor() {
		this.schema = null;
		this.message = null;
		this.large = false;
		this.errors = null;
		this.delimiters = [];
		this.errorsOnDisplay = [];
		this.errorList = [];
	}

	processDelimiters() {
		if (this.message["delimiters"]) {
			let delms = this.message["delimiters"];
			this.delimiters = delms.split('Q');
		} else {
			this.delimiters = ["\\r\\n", "*", "\\", "^"];
		}
	}

	getErrorList(size) {
		let errors = [];
		if (this.errors && this.errorsOnDisplay.length === 0) {
			Object.keys(this.errors).forEach((key) => {
				errors = errors.concat(this.errors[key]);
			});
			this.errorsOnDisplay = errors.slice(0, size);
		}
		return this.errorsOnDisplay;
	}

	lookupErrorSegment(path) {
		if (this.errorList) {
			for (let i = 0, length = this.errorList.length; i < length; i++) {
				let error = this.errorList[i];
				let location = error.location;
				let paths = location.split("/");
				let last = paths[paths.length - 1];
				if (!isNaN(last)) { 
					location = location.substring(0, location.lastIndexOf("/"))
				}
				if (path === location) {
					return {
						text : error.message
					}
				} else {
					continue;
				}
			}
			return null;
		} else {
			return null;
		}

	}

	lookupErrorList(path) {
		if (this.errors) {
			let errors = this.errors[path];
			if (errors) {
				this.errorList = errors;
			}
		}
	}


	lookupErrorPath(path) {
		/*let found = false;
		if (this.errors) {
			Object.keys(this.errors).forEach((key) => {
				if (key.startsWith(path)) {
					return true;
				}
			});
			return false;
		} else {
			return false;
		}*/
		if (this.errors){
			return this.errors[path];
		} else {
			return false;
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