export function getProcessArg(key: string) {
    const index = process.argv.findIndex((e) => e == `--${key}`);
    return process.argv[index + 1];
}
