export function moveToFront<T extends {id: number}>(array: T[], id: number) {
    const selectedElement = array.find(el => el.id === id);
    if (!selectedElement) {
        console.warn(`Tentou mexer no id ${id} no array, mas não foi encontrado.`);
        return array;
    }

    const otherElements = array.filter(el => el.id !== id);
    return [selectedElement, ...otherElements];
}