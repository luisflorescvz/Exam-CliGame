#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';


let playerName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow(
    'How well do you know me? \n'
  );

  await sleep();
  rainbowTitle.stop();

  console.log(`
    ${chalk.bgBlue('HOW TO PLAY')} 
    I am a process on your computer.
    If you get any question wrong I will be ${chalk.bgRed('killed')}
    So get all the questions right...

  `);
}

async function askName() {
    const answers = await inquirer.prompt({
      name: 'player_name',
      type: 'input',
      message: 'What is your name?',
      default() {
        return 'Player';
      },
    });
  
    playerName = answers.player_name;
  }

  async function question1() {
    const answers = await inquirer.prompt({
      name: 'Question-1',
      type: 'list',
      message: 'What is my favorite animal?\n',
      choices: [
        'Dog',
        'Cat',
        'Horse',
        'Fish ',
      ],
    });
  
    return handleAnswer(answers.question_1 === 'Cat');
  }

  async function question2() {
    const answers = await inquirer.prompt({
      name: 'Question-2',
      type: 'list',
      message: 'What is my favorite food?\n',
      choices: [
        'Pizza',
        'Burger',
        'Boneless',
        'Sandwich ',
      ],
    });
  
    return handleAnswer(answers.question_1 === 'Burger');
  }

  async function question3() {
    const answers = await inquirer.prompt({
      name: 'Question-3',
      type: 'list',
      message: 'What do I like the least?\n',
      choices: [
        'School',
        'Work',
        'Money',
        'Sports ',
      ],
    });
  
    return handleAnswer(answers.question_1 === 'School');
  }

  async function question4() {
    const answers = await inquirer.prompt({
      name: 'Question-4',
      type: 'list',
      message: 'How old am I?\n',
      choices: [
        '22',
        '18',
        '24',
        '21 ',
      ],
    });
  
    return handleAnswer(answers.question_1 === '21');
  }

  async function question5() {
    const answers = await inquirer.prompt({
      name: 'Question-5',
      type: 'list',
      message: 'Am I going to complete my career?\n',
      choices: [
        'Absolutely',
        'Of course',
        'Maybe',
        'Please try',
      ],
    });
  
    return handleAnswer(answers.question_1 === 'Absolutely');
  }


  async function handleAnswer(isCorrect) {
    const spinner = createSpinner('Checking answer...').start();
    await sleep();
  
    if (isCorrect) {
      spinner.success({ text: `Nice work ${playerName}. That's a legit answer` });
    } else {
      spinner.error({ text: `💀💀💀 Game over, you lose ${playerName}!` });
      process.exit(1);
    }
  }

  function winner() {
    console.clear();
    figlet(`Congrats , ${playerName} !`, (err, data) => {
      console.log(gradient.pastel.multiline(data) + '\n');

      console.log(
        chalk.green(
          `I owe you your favorite thing in the world`
        )
      );
  
      process.exit(0);
    });
  }

console.clear();
await welcome();
await askName();
await question1();
winner();
