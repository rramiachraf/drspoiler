import chalk from 'chalk'
import { promises as fs } from 'fs'
import { join } from 'path'
import pool from './index'

const file = join(__dirname, 'install.sql')

fs.readFile(file, { encoding: 'utf8' })
  .then(async query => {
    await pool.query(query)
    console.log(chalk.green('All tables created'))
  })
  .catch(e => {
    console.error(chalk.red(e))
  })
