import path from 'path'
import fs from 'fs'

const __dirname = path.resolve()

export const privateKey = fs.readFileSync(path.join(__dirname, '../private/server.key')).toString()
export const certificate = fs.readFileSync(path.join(__dirname, '../private/server.crt')).toString()
