class Store {
	constructor() {
		this.schema = null;
        this.message = null;
		this.large = false;
		this.errors = null;
		this.errorPaths = [];
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
}

export default (new Store());