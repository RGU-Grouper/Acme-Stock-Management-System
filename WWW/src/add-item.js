const $tagTemplate = document.getElementById("tag-template");

const addTagToList = ($list, tag) => {
    const $tag = $tagTemplate.content.cloneNode(true).firstElementChild;

    $tag.children[0].innerText = tag;

    $tag.children[1].addEventListener("click", (event) => {
        $list.removeChild($tag);
    });

    $list.appendChild($tag);
};

const createTagSelectItem = (tag, onClickCallback) => {
    const $tagItem = document.createElement("li");
    $tagItem.innerText = tag;
    $tagItem.addEventListener("click", onClickCallback);
    return $tagItem;
};

const createTagSelectList = (tags) => {
    // Create list element
    const $tagList = document.createElement("ul");

    // Create list item elements
    for (let i = 0; i < tags.length; i++) {
        const $tagItem = createTagSelectItem(tags[i], (event) => {
            // On Click...

        });
        $tagList.appendChild($tagItem);
    }

    // Create Add New list item element
    const $addTag = createTagSelectItem("Add New...", (event) => {
        // On Click...

    });
    $tagList.appendChild($addTag);

    // Return the completed tag list element
    return $tagList;
};