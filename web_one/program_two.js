
const argv = process.argv;

let sum = 0;
for (let i = 2; i < argv.length; i++) {
    sum += Number.parseInt(argv[i]);
}

console.log(sum);
