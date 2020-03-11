class User {
  constructor(name, email, password) {
    this.name = name
    this.email = email
    this.password = password
    this.registered = false
  }

  get userName() {
    if (!this.name[0].match(/[A-Z]/)) {
      let split = this.name.substring(1)
      this.name = this.name[0].toUpperCase() + split
      return this.name
    }
  }

  isRegistered() {
    this.registered = true
  }
}

module.exports = User;