function tagsToSpaces(tags: string): string{
    return tags.replace('|', ' ');
}

function spacesToTags(tags: string): string{
    return tags.replace(' ', '|');
}

function tagsToList(tags: string[]){
    return tags.join(', ');
}

export {
    tagsToSpaces,
    spacesToTags,
    tagsToList
}