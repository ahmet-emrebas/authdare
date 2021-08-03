export async function delay(time: number) {
    return new Promise((res, rej) => setTimeout(() => res(true), time));
}