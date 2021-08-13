export function mapEntitiesToObj(entities: any[]) {
    return entities
        .map((e) => {
            const key = (e.name as string).replace('Entity', 's').toLowerCase();
            return {
                [key]: e,
            };
        })
        .reduce((p, c) => ({ ...p, ...c }));
}
