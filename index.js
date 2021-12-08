const inquirer = require('inquirer');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer')
const Intern = require('./lib/Intern')
const fs = require('fs');
const generateTeam = require('./src/generateTeam');
const generateHTML = require('./src/generate.html');

// Employee array
const employees = [];

// Questions array for all employees
team = [];
const managerQuestions = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'provide the manager name',
        },
        {
            type: 'input',
            name: 'id',
            message: 'provide the team manager id',
        },
        {
            type: 'input',
            name: 'email',
            message: 'provide the team manager email?',
            validate: email => {
                valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
                if (valid) {
                    return true;
                } else {
                    console.log ('Please enter an email!')
                    return false; 
                }
            }
        },       
        {
            type: 'input',
            name: 'officeNumber',
            message: 'provide the team manager office number?',
        },
        {
            type: 'list',
            name: 'addMember',
            message: 'What type of team member would you like to add?',
            choices: ['Engineer', 'Intern', 'stop adding team members'],
        }
    ])
    const writeToFile = data => {
        fs.writeToFile('./dist/index.html', data, err => {
            // if there is an error 
            if (err) {
                console.log(err);
                return;
            // when the profile has been created 
            } else {
                console.log("Your team profile has been successfully created! Please check out the index.html")
            }
        })
    }; 