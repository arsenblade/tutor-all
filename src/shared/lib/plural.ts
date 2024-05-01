export function pluralizeRu(count: number, words: string[], isNumber: boolean = true): string {
    if (words.length !== 3) {
        throw new Error('Ожидается массив из трех слов для склонения');
    }

    const [one, few, many] = words;

    let result = '';
    if (isNumber) {
        result += `${count} `;
    }

    if (count % 10 === 1 && count % 100 !== 11) {
        result += one;
    } else if (count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 10 || count % 100 >= 20)) {
        result += few;
    } else {
        result += many;
    }

    return result;
}
