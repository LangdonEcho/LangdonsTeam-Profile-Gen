const inquirer = require('inquirer');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer')
const Intern = require('./lib/Intern')
const fs = require('fs');
const generateTeam = require('./src/generateTeam.js');

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
    .then((managerAnswers) => {
    
        const manager = new Manager(managerAnswers.id, managerAnswers.name, managerAnswers.email, managerAnswers.officeNumber)
        team.push(manager)
        switch(managerAnswers.addMember) {
            case 'Engineer':
                engineerQuestions();
                break;
            case 'Intern':
                internQuestions();
                break;
            default: 
            writeToFile('dist/index.html', generateTeam(team))
        }
    });
};


const engineerQuestions = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'please provide the engineer name?',
        },
        {
            type: 'input',
            name: 'id',
            message: 'please provide the engineer id?',
        },
        {
            type: 'input',
            name: 'email',
            message: 'please provide the engineer email address?',
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
            name: 'github',
            message: 'please provide the engineer GitHub username?',
        },
        {
            type: 'list',
            name: 'addMember',
            message: 'What type of team member would you like to add next?',
            choices: [ 'Intern','Engineer','stop adding team members'],
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
                writeToFile('src/generateTeam.js', generateTeam(team))
            }
        });
} 
    const internQuestions = () => {
        inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'please provide the interns name?'
            },
            {
                type: 'input',
                name: 'id',
                message: 'please provide the interns id?'
            },
            {
                type: 'input',
                name: 'email',
                message: 'please provide the interns email address?',
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
                name: 'school',
                message: 'please provide the interns school?'
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
        fs.writeToFile('./src/generateTeam.js', data, err => {
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