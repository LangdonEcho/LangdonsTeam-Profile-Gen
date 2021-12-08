const Employee = require('../lib/Employee')

test('creates an employee object', () => {
    const employee = new Employee('john', 90, 'john.doe@gmail.com');

    expect(employee.email).toEqual(expect.any(String));
});

describe('Employee Class', () => {
    describe('Initialization', () => {
        it('Should create an object with an id and name', () => {
            const employee = new Employee(123, 'Tim')

            expect(employee.id).toEqual(123);
            expect(employee.name).toEqual('Tim');
        });
    });
});