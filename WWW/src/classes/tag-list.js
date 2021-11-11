export default class TagList {
	constructor(key, tags) {
		this.key = key;								// material, colour, general, etc.
		this.tags = tags;							// List of all applicable tags
		this.currentTags = [];				// List of all applied tags
	}

	updateTagList(tags) {
		this.tags = tags;

		// Create list of applied tags which are no longer in the overall list
		const oldTags = this.currentTags.filter(tag => !tags.includes(tag));
		if (oldTags.length > 0) {
			// Remove old tags
			oldTags.forEach(tag => this.removeTag(tag));
		}
	}

	getTags() {
		return this.tags;
	}

	getCurrentTags() {
		return this.currentTags;
	}
	
	getAvailableTags() {
		return this.getTags().filter(tag => !this.currentTags.includes(tag));
	}

	getFilteredTags(filterString) {
		const tags = this.getAvailableTags().filter(tag => tag.match(new RegExp(filterString, "i")));
		const startTags = tags.map(tag => tag.substring(0, filterString.length).toLowerCase() === filterString.toLowerCase() ? tag : null).filter(tag => tag != null);
		const endTags = tags.filter(tag => !startTags.includes(tag));
		return startTags.concat(endTags);
	}

	addTag(tag) {
		if (!this.currentTags.includes(tag)) {
			this.currentTags.push(tag);
		}
	}

	removeTag(tag) {
		this.currentTags = this.currentTags.filter(t => t !== tag);
	}

	clearTags() {
		this.currentTags = [];
	}
}
