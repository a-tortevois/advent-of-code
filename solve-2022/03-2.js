// Part 2

const getPriority = (item) => {
    const index = item.charCodeAt(0);
    if (index < 0x5b) { // Uppercase
        return index - 38;
    } else { // Lowercase
        return index - 96;
    }
}

const compareRucksacks = (c1, c2, c3) => {
    for (let a of c1) {
        const aPriority = getPriority(a);
        for (let b of c2) {
            const bPriority = getPriority(b);
            if (aPriority > bPriority) {
                break;
            } else if (aPriority === bPriority) {
                for (let c of c3) {
                    const cPriority = getPriority(c);
                    if (bPriority > cPriority) {
                        break;
                    } else if (bPriority === cPriority) {
                        return cPriority;
                    }
                }
            }
        }
    }
}

let sum = 0;
const rucksacks = input.split('\n')
for (let i = 0; i < rucksacks.length; i += 3) {
    let c1 = rucksacks[i].split('').sort((a, b) => {
        return getPriority(b) - getPriority(a)
    });
    let c2 = rucksacks[i + 1].split('').sort((a, b) => {
        return getPriority(b) - getPriority(a)
    });
    let c3 = rucksacks[i + 2].split('').sort((a, b) => {
        return getPriority(b) - getPriority(a)
    });
    sum += compareRucksacks(c1, c2, c3);
}

console.log("sum =", sum);
answer = sum;
