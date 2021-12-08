const Employee = require('./Employee');
class Engineer extends Employee {
    constructor(name, id, email, github) {
        // Get methods from Employee class
        super(id, name, email)
        this.github = github
    }
        getGithub() {
            return this.github
        }
    
        getRole() {
            return 'Engineer'
        }
    }
    
    module.exports = Engineer;