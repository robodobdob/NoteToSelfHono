/** Converts a pipe-delimited tag string from the database to a string array */
export function dbTagsToArray(tags: string): string[] {
    return tags.split('|').map(t => t.trim()).filter(t => t.length > 0);
}

/** Converts a string array of tags to a pipe-delimited string for database storage */
export function arrayToDbTags(tags: string[]): string {
    return tags.join('|');
}

export function tagsToList(tags: string[]): string {
    return tags.join(', ');
}