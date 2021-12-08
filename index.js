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
    

    const engineerQuestions = () => {
        inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'What is the engineer\'s name?',
            },
            {
                type: 'input',
                name: 'id',
                message: 'What is the engineer\'s id?',
            },
            {
                type: 'input',
                name: 'email',
                message: 'What is the engineer\'s email address?',
            },
            {
                type: 'input',
                name: 'github',
                message: 'What is the engineer\'s GitHub username?',
            },
            {
                type: 'list',
                name: 'addMember',
                message: 'What type of team member would you like to add next?',
                choices: ['Engineer', 'Intern', 'I don\'t want to add any more team members'],
            }
        ])
        .then((engineerAnswers) => {
            const engineer = new Engineer(engineerAnswers.id, engineerAnswers.name, engineerAnswers.email, engineerAnswers.github)
            team.push(engineer)
            switch(engineerAnswers.addMember) {
                case 'Engineer':
                    engineerQuestions();
                    break;
                case 'Intern':
                    internQuestions();
                    break;
                default: 
                writeToFile('dist/index.html', generateTeam(team))
            }
        })
    };

    const internQuestions = () => {
        inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'What is the intern\'s name?'
            },
            {
                type: 'input',
                name: 'id',
                message: 'What is the intern\'s id?'
            },
            {
                type: 'input',
                name: 'email',
                message: 'What is the intern\'s email address?'
            },
            {
                type: 'input',
                name: 'school',
                message: 'What is the intern\'s school?'
            },
            {
                type: 'list',
                name: 'addMember',
                message: 'What type of team member would you like to add next?',
                choices: ['Engineer', 'Intern', 'I don\'t want to add any more team members'],
            }
        ])

        .then((internAnswers) => {
            const intern = new Intern(internAnswers.id, internAnswers.name, internAnswers.email, internAnswers.school)
            team.push(intern)
            switch(internAnswers.addMember){
                case 'Engineer':
                    engineerQuestions();
                    break;
                case 'Intern':
                    internQuestions();
                    break;
                default:
                    writeToFile('dist/index.html', generateTeam(team))
            }
        })
    }
    
    managerQuestions();

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