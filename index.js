let cols = process.stdout.columns;
process.stdout.on('resize', () => cols = process.stdout.columns);
const cliCursor = require('cli-cursor');
const ansiEscapes = require('ansi-escapes');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '',
  terminal: true
});


let list = ["张三", "李四", "王五"];
let curr = 0;
let lines = 0;

function render(rl) {
    rl.output.write(ansiEscapes.eraseLines(lines));
    lines = 0;
    // rl.output.write(ansiEscapes.clearScreen);
    let message = "";
    list.forEach((name, index) => {
        if(index == curr) {
            message += ">";
        }else {
            message += " ";
        }
        message += " " + name;
        message += "\n";
        lines += 1;
    })
    lines += 1;
    rl.write(message);
}

render(rl);

rl.input.on("keypress", (i, b) => {
    // console.log(b);
    if(b.name == "up") {
        if(curr == 0) {
            curr = list.length - 1;
        } else {
            curr -= 1;
        }
    }else if(b.name == "down") {
        if(curr == list.length - 1) {
            curr = 0;
        } else {
            curr += 1;
        }
    }else {
        lines = 0;
        return console.log(JSON.stringify(b, "  ", 2));
    }
    render(rl);
    return true;
})