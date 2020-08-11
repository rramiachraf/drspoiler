import { Pool } from 'pg'
import { connectionString } from '../config'

//TODO different users 

const pool = new Pool({ connectionString })

export default pool
