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
}

export default (new Store());