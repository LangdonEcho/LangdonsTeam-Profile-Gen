const Employee = require('./Employee');
class Engineer extends Employee {
    constructor(name, id, email, github) {
        // Get methods from Employee class
        super(name, id, email);
        getGithub() {
            return this.github
        }
    
        getRole() {
            return 'Engineer'
        }
    }
    
    module.exports = Engineer;