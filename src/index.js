import fs from 'node:fs/promises';
import querystring from 'node:querystring';
import {AOC_COOKIE} from './aoc.secret.js';

const [YEAR, DAY, LEVEL] = process.argv.slice(2);
const BASE_URL = 'https://adventofcode.com';
const USE_CACHE = true;
const CACHE_TIMEOUT = 3_600_000;
const exampleFilePath = new URL('../.cache/example.txt', import.meta.url);
const inputFilePath = new URL('../.cache/input.txt', import.meta.url);

const isInputFileNotExistOrOutdated = async (filePath) => {
    let flag = true;
    try {
        const fh = await fs.open(filePath, 'r');
        const stats = await fh.stat();
        if (Date.now() - Date.parse(stats.mtime) < CACHE_TIMEOUT) {
            flag = false;
        }
        await fh.close();
    } catch (err) {
        // console.error('Error:', err.message);
    }
    return flag;
}

const getExample = async (day, useCache = false) => {
    let example = "";

    if (useCache && await isInputFileNotExistOrOutdated(exampleFilePath)) {
        console.warn('Refresh example file');
        try {
            const params = {
                method: "GET",
                headers: {
                    'Cookie': `session=${AOC_COOKIE}`,
                },
            }
            const res = await fetch(`${BASE_URL}/${YEAR}/day/${day}`, params);
            if (res.status === 200) {
                const regex = /(?:For example.*?\n?<pre><code>((?:\n|.)*?)<\/code><\/pre>)/;
                const data = await res.text();
                if (regex.test(data)) {
                    example = regex.exec(data)[1].trim();
                    example = example.replaceAll('&gt;', '>');
                    example = example.replaceAll('&lt;', '<');
                    await fs.writeFile(exampleFilePath, example, 'utf-8');
                } else {
                    throw new Error(`Unable to find an example`);
                }
            } else {
                throw new Error(`Unable to get example, request failed with error code ${res.status}`);
            }
        } catch (err) {
            console.error('getExample error: ', err);
            process.exit();
        }
    }

    if (example.length === 0) {
        try {
            const fh = await fs.open(exampleFilePath, 'r');
            example = await fh.readFile('utf-8');
            await fh.close();
        } catch (err) {
            console.error('Error:', err.message);
        }
    }

    return example;
}

const getInput = async (day, useCache = false) => {
    let input = "";

    if (useCache && await isInputFileNotExistOrOutdated(inputFilePath)) {
        console.warn('Refresh input file');
        try {
            const params = {
                method: "GET",
                headers: {
                    'Cookie': `session=${AOC_COOKIE}`,
                },
            }
            const res = await fetch(`${BASE_URL}/${YEAR}/day/${day}/input`, params);
            if (res.status === 200) {
                const data = await res.text();
                input = data.trim()
                await fs.writeFile(inputFilePath, input, 'utf-8');
            } else {
                throw new Error(`Unable to get input, request failed with error code ${res.status}`);
            }
        } catch (err) {
            console.error('getInput error: ', err);
            process.exit();
        }
    }

    if (input.length === 0) {
        try {
            const fh = await fs.open(inputFilePath, 'r');
            input = await fh.readFile('utf-8');
            await fh.close();
        } catch (err) {
            console.error('Error:', err.message);
        }
    }

    return input;
}

const submit = async (day, level, answer) => {
    console.log(`You are about to submit the follwing answer: ${answer}`);
    try {
        const params = {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cookie': `session=${AOC_COOKIE}`,
            },
            body: querystring.stringify({level, answer}),
        }
        const res = await fetch(`${BASE_URL}/${YEAR}/day/${day}/answer`, params);
        if (res.status === 200) {
            const data = await res.text();
            if (data.includes('You gave an answer too recently')) {
                const waitingTime = new RegExp(/You have (.*) left to wait/g).exec(data)[1];
                console.log(`Too many requests. You have ${waitingTime} left to wait.`);
            } else if (data.includes('not the right answer')) {
                if (data.includes('too low')) {
                    console.log('Too low!');
                } else if (data.includes('too high')) {
                    console.log('Too high!');
                } else {
                    console.log('That\'s not the right answer.');
                }
            } else if (data.includes('seem to be solving the right level')) {
                console.log('Invalid level');
            } else {
                console.log('Pass, well done!');
            }
        } else {
            throw new Error(`Unable to post answer, request failed with error code ${res.status}`);
        }
    } catch (err) {
        console.error('submit error: ', err);
    }
}

const main = async () => {
    // console.clear();
    const example = await getExample(DAY, USE_CACHE);
    const input = await getInput(DAY, USE_CACHE);
    let answer = 0;
    try {
        const fh = await fs.open(new URL(`../solve-${YEAR}/${`0${DAY}`.slice(-2)}-${LEVEL}.js`, import.meta.url), 'r');
        const solution = await fh.readFile('utf-8');
        await fh.close();
        console.time("Exec time");
        eval(solution)
        console.timeEnd("Exec time");
        await submit(DAY, LEVEL, answer);
    } catch (err) {
        console.error('Error:', err.message);
    }
}

await main();