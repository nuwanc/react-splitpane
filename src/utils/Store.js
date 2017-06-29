class Store {
	constructor() {
		this.schema = null;
        this.message = null;
		this.large = false;
		this.errors = null;
		this.errorPaths = [];
		this.segmentPaths = null;
	}

	lookupErrorSegment(path) {
		if (this.errorPaths.length === 0 && this.errors !== null) {
			this.errorPaths = [];
			this.errors.forEach((v,i)=>{
				this.errorPaths.push(v.location.substring(0,v.location.lastIndexOf('/')))
			})
		}
		return this.errorPaths.indexOf(path) > -1
	}

	lookupErrorPath(path) {
		if (this.errorPaths.length === 0 && this.errors !== null) {
			this.errorPaths = [];
			this.errors.forEach((v,i)=>{
				this.errorPaths.push(v.location.substring(0,v.location.lastIndexOf('/')))
			})
		}
		let found = false;
		for (let i = 0,len = this.errorPaths.length; i < len; i++) {
			if (this.errorPaths[i].startsWith(path)) {
				found = true;
			}
		}
		return found;
	}

	lookupSegmentPath(selectedPath) {
		if (this.segmentPaths === null && this.schema != null) {
			this.segmentPaths = {};
			let path = ".";
			this.processPath(path,this.schema["transaction"][0].element);
		}
		let paths = selectedPath.split('/');
		if (paths.length > 3) {
			//in transaction
			let segment = paths[paths.length - 1];
			segment = "segment:"+segment.substring(0,segment.indexOf('['));
			paths = this.segmentPaths[segment];
			console.log(paths);
		}
	}

	processPath(path,element) {
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
				this.processPath(path + "/" + el.name , el.element);
			}
		}
	}
}

export default (new Store());