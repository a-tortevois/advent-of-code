// Part 1

const getPriority = (item) => {
    const index = item.charCodeAt(0);
    if (index < 0x5b) { // Uppercase
        return index - 38;
    } else { // Lowercase
        return index - 96;
    }
}

const compareRucksacks = (c1, c2) => {
    for (let a of c1) {
        const aPriority = getPriority(a);
        // maybe more efficient than: a.includes(c2) ? return getPriority(a) : continue;
        for (let b of c2) {
            const bPriority = getPriority(b);
            if (aPriority > bPriority) {
                break;
            } else if (aPriority === bPriority) {
                return bPriority;
            }
        }
    }
}

let sum = 0;
for (let rucksack of input.split('\n')) {
    let m = rucksack.length / 2;
    let c1 = rucksack.slice(0, m).split('').sort((a, b) => {
        return getPriority(b) - getPriority(a)
    });
    let c2 = rucksack.slice(m).split('').sort((a, b) => {
        return getPriority(b) - getPriority(a)
    });
    sum += compareRucksacks(c1, c2);
}

console.log("sum =", sum);
answer = sum;
