class Tags {
	constructor(tagList) {
		this.tagList = tagList;
		this.currentTags = [];
	}

	updateTagList(tagList) {
		this.tagList = tagList;
	}

	getCurrentTags() {
		return this.currentTags;
	}

	addTag(tag) {
		if (!this.currentTags.includes(tag)) {
			this.currentTags.push(tag);
		}
	}

	removeTag(tag) {
		this.currentTags = this.currentTags.filter(t => t !== tag);
	}

	getAvailableTags() {
		return this.tagList.filter(t => !this.currentTags.includes(t));
	}

	getFilteredTags(filterString) {
		return this.getAvailableTags().filter(t => t.match(new RegExp(filterString, "i")));
	}

	getSortedTags(filterString) {
		const tags = this.getFilteredTags(filterString);
		const startTags = tags.map(tag => tag.substring(0, filterString.length).toLowerCase() === filterString.toLowerCase() ? tag : null).filter(tag => tag != null);
		const endTags = tags.filter(tag => !startTags.includes(tag));
		return startTags.concat(endTags);
	}
}
