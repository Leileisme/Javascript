import bcrypt from 'bcrypt'

console.log(bcrypt.hashSync('12345678910abcd', 10))

// console.log(bcrypt.compareSync('1234', '$2b$10$OyI3fr2hCNN6Ewn5UJY69.AqMF7d.eShPyXeLw8mpUkX/09a2JZTW'))
