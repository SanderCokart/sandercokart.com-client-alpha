export default function getDifference<A extends { id: number }>(array1: A[], array2: A[]): A[] {
    return array1.filter((object1) => {
        return !array2.some((object2) => {
            return object1.id === object2.id;
        });
    });
}