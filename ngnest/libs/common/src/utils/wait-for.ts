export async function waitFor(time: number) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res(`Let's go!`);
        }, time);
    });
}
