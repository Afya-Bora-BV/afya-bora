export function toggleStringFromList(text: string, list: string[]): string[] {
    if (list.includes(text)) {
        return list.filter((t) => t !== text)
    }
    return [...list, text]
}
