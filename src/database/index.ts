import { Pool } from 'pg'
import { connectionString } from '../config'

const pool = new Pool({ connectionString })

export default pool
