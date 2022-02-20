class Fruit {
  constructor(tumblerNum, imgFile, name) {
    this.name = name;
    const element = document.createElement("div");
    element.id = tumblerNum + "-" + imgFile;
    element.setAttribute(
      "style",
      `
                    background-image: url(./${imgFile}.png);
                    background-size: cover;
                    background-position: center;
                    height: 120px;
                    width: 100%;
                    position: relative;
                    bottom:35px;
                `
    );
    document.getElementById("tumbler-" + tumblerNum).appendChild(element);
    this.el = element;
  }

  setPos(bottom) {
    this.el.style.top = `${bottom}px`;
  }
}
class Spinner {
  constructor(tumblerNum) {
    this.fruits = [
      new Fruit(tumblerNum, "01", "seven"),
      new Fruit(tumblerNum, "02", "orange"),
      new Fruit(tumblerNum, "03", "bell"),
      new Fruit(tumblerNum, "04", "melon"),
      new Fruit(tumblerNum, "05", "lemon"),
      new Fruit(tumblerNum, "06", "cherry"),
      new Fruit(tumblerNum, "07", "grape"),
      new Fruit(tumblerNum, "08", "bar"),
      new Fruit(tumblerNum, "09", "banana"),
    ];
    this.element = document.getElementById(`tumbler-${tumblerNum}`);
  }
}

const fruitValues = {
  seven: 1,
  orange: 2,
  bell: 3,
  melon: 4,
  lemon: 5,
  cherry: 6,
  grape: 7,
  bar: 8,
  banana: 9,
};
const spinner01 = new Spinner("01");
const spinner02 = new Spinner("02");
const spinner03 = new Spinner("03");
let spinner01Hold = false;
let spinner02Hold = false;
let spinner03Hold = false;

function rndSpinCount() {
  return Math.floor(Math.random() * (60 - 20 + 1)) + 20;
}

function spinSelector(tumbler) {
  if (tumbler === "tumbler-01") {
    spin("tumbler-01", spinner01, rndSpinCount());
  } else if (tumbler === "tumbler-02") {
    spinRev("tumbler-02", spinner02, rndSpinCount());
  } else if (tumbler === "tumbler-03") {
    spin("tumbler-03", spinner03, rndSpinCount());
  }
}

function spin(tumbler, spinner, maxSpinCount) {
  document.getElementById("btn-spin-all").disabled = true;
  let count = 0;
  let spinCount = 0;
  const spinId = setInterval(() => {
    spinner.fruits.forEach((fruit, index) => {
      let currentVal = fruit.el.style.bottom;
      currentVal = currentVal.substring(0, currentVal.length - 2);
      newVal = parseInt(currentVal) + 5;
      fruit.el.style.bottom = `${newVal}px`;
      console.log(currentVal, newVal, fruit.el.style.bottom);
    });
    count += 5;
    if (count % 120 == 0) {
      spinCount++;
      const topFruit = spinner.fruits.shift();
      spinner.fruits.push(topFruit);
      document.getElementById(tumbler).innerHTML = "";
      spinner.fruits.forEach((fruit) => {
        document.getElementById(tumbler).appendChild(fruit.el);
        fruit.el.style.bottom = "35px";
      });
      if (spinCount == maxSpinCount) {
        document.getElementById("btn-spin-all").disabled = false;
        clearInterval(spinId);
      }
    }
  }, 1);
}

function spinAll() {
  if (!spinner01Hold) {
    spin("tumbler-01", spinner01, rndSpinCount());
  }
  if (!spinner02Hold) {
    spinRev("tumbler-02", spinner02, rndSpinCount());
  }
  if (!spinner03Hold) {
    spin("tumbler-03", spinner03, rndSpinCount());
  }
}

function hold1() {
  spinner01Hold = true;
  document.getElementById("btn-hold-01").innerHTML = "Holding";
}
function hold2() {
  spinner02Hold = true;
  document.getElementById("btn-hold-02").innerHTML = "Holding";
}
function hold3() {
  spinner03Hold = true;
  document.getElementById("btn-hold-03").innerHTML = "Holding";
}

function spinRev(tumbler, spinner, maxSpinCount) {
  document.getElementById("btn-spin-all").disabled = true;
  let count = 0;
  let spinCount = 0;
  const spinId = setInterval(() => {
    spinner.fruits.forEach((fruit, index) => {
      let currentVal = fruit.el.style.bottom;
      currentVal = currentVal.substring(0, currentVal.length - 2);
      newVal = parseInt(currentVal) - 5;
      fruit.el.style.bottom = `${newVal}px`;
      console.log(currentVal, newVal, fruit.el.style.bottom);
    });
    count += 5;
    if (count % 120 == 0) {
      spinCount++;
      const topFruit = spinner.fruits.pop();
      spinner.fruits.unshift(topFruit);
      document.getElementById(tumbler).innerHTML = "";
      spinner.fruits.forEach((fruit) => {
        document.getElementById(tumbler).appendChild(fruit.el);
        fruit.el.style.bottom = "35px";
      });
      if (spinCount == maxSpinCount) {
        document.getElementById("btn-spin-all").disabled = false;
        clearInterval(spinId);
      }
    }
  }, 1);
}

function nudge(tumbler) {
  if (tumbler === "tumbler-01") {
    spin("tumbler-01", spinner01, 1);
  } else if (tumbler === "tumbler-02") {
    spinRev("tumbler-02", spinner02, 1);
  } else if (tumbler === "tumbler-03") {
    spin("tumbler-03", spinner03, 1);
  }
}

function outputResult() {
  let SpinResult1 = spinner01.fruits[1].name;
  let SpinResult2 = spinner02.fruits[1].name;
  let SpinResult3 = spinner03.fruits[1].name;
  let winnings = 0;
  if (SpinResult1 === SpinResult2 && SpinResult1 === SpinResult3) {
    winnings = fruitValues[SpinResult1] * 3;
  } else if (SpinResult1 === SpinResult2) {
    winnings = fruitValues[SpinResult1] * 2;
  } else {
    winnings = fruitValues[SpinResult1];
  }
  document.getElementById("winnings").innerHTML = winnings;
}
