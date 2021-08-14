const fs = require('fs');
const yaml = require('js-yaml');
const { join } = require('path');

/**
 * load all the conf/yaml/env config files and transform to object.
 * @param dirname directory name of the config files
 * @returns
 */
export function loadConfigFiles(dirname = './config') {
    return fs
        .readdirSync(dirname)
        .map((e: string) => e?.match(/conf|env|config/)?.input)
        .filter((e: string) => e)
        .map((e: string) => {
            return {
                type: e.split('.').pop(),
                content: fs.readFileSync(join(dirname, e)).toString(),
            } as { type: string; content: string };
        })
        .map(({ type, content }: { type: string; content: string }) => {
            if (type == 'yaml') return yaml.load(content);
            if (type == 'json') return JSON.parse(content);
            if (type == 'env' || type == 'config' || type == 'conf')
                return content
                    .split('\n')
                    .map((e) => e.split('='))
                    .filter((e) => e.length >= 2)
                    .map((e) => {
                        return { [e[0].trim()]: e[1].trim() };
                    })
                    .reduce((a, b) => ({ ...a, ...b }));
        })
        .filter((e: any) => e)
        .reduce((a: any, b: any) => ({ ...a, ...b }));
}
