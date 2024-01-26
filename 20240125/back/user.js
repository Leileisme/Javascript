import { Schema, model } from 'mongoose'

const schema = new Schema({
  name: String,
  line: String,
  pictureUrl: String,
  tokens: [String]
})

export default model('users', schema)
