export function genToken(): string {
    return (Math.random() * 90000 + 10000) + '';
}