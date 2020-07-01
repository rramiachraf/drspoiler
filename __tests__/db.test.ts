import pool from '../src/database/index'

test('database connection', async () => {
  const { rows } = await pool.query('SELECT 1 + 1 AS test')
  await pool.end()
  expect(rows[0].test).toBe(2)
})
