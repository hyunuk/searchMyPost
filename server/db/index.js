import { Client } from '@elastic/elasticsearch'
import dotenv from 'dotenv'

dotenv.config()

const db = new Client({
  node: `${process.env.DB_NODE}`,
})

export default db
