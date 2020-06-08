const chalk = require('chalk');
const boxen = require("boxen");

const boxenOptions = {
  defaults: {
    padding: 2,
    margin: 1,
    borderStyle: "round",
  },
  success: {
    borderColor: "green",
  },
  info: {
    borderColor: "blue",
  },
  warning: {
    borderColor: "yellow",
  }
};

const chalkOptions = {
  success: {
    color: "green",
  },
  info: {
    color: "blue",
  },
  warning: {
    color: "yellow",
  },
  error: {
    color: "red",
  }
}

function fancyLog(msg, type='info', withBorder=false) {
  const fancyMessage = chalk.white.bold(msg);
  if (withBorder) {
    const finalBoxenOptions = Object.assign({}, boxenOptions.defaults, boxenOptions[type])
    const msgBox = boxen( fancyMessage, finalBoxenOptions);
    console.log(msgBox);
  } else {
    const chalkColor = chalkOptions[type].color
    const fancyType = chalk[chalkColor](type.toUpperCase())
    console.log(fancyType, fancyMessage, new Date().toISOString())
  }
}

module.exports.fancyLog = fancyLog