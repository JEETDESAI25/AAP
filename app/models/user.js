class User {
    constructor(id, firstName, lastName, middleName,
        age, phoneNumber, password, gender, dob, isValid ) {
            this.id = id;
            this.firstName = firstName;
            this.lastName = lastName;
            this.middleName = middleName;
            this.age = age;
            this.phoneNumber = phoneNumber;
            this.password = password;
            this.gender = gender;
            this.dob = dob;
            this.isValid = isValid;
    }
}

module.exports = User;