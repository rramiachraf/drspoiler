import request from 'supertest'
import app from '../src/app'
import pool from '../src/database'

const credentials = {
  valid: { username: 'test', email: 'test@example.com', password: 'test' },
  invalid: { username: 'test1', email: 'test1@example', password: 'test1' }
}

beforeAll(async () => {
  const { username } = credentials.valid
  await pool.query('DELETE FROM main.users WHERE username = $1', [username])
})

afterAll(async () => {
  await pool.end()
})

test('sign up with valid data', done => {
  request(app)
    .post('/api/signup')
    .send(credentials.valid)
    .expect(201)
    .end(err => {
      if (err) return done(err)
      done()
    })
})

test('sign up with invalid data', done => {
  request(app)
    .post('/api/signup')
    .send(credentials.invalid)
    .expect(400)
    .end((err, res) => {
      if (err) return done(err)
      expect(res.body.error).toBe('invalid email')
      done()
    })
})

test('login with valid credentials', done => {
  request(app)
    .post('/api/login')
    .send(credentials.valid)
    .expect(200)
    .end(err => {
      if (err) return done(err)
      done()
    })
})

test('login with invalid credentials', done => {
  request(app)
    .post('/api/login')
    .send(credentials.invalid)
    .expect(404)
    .end(err => {
      if (err) return done(err)
      done()
    })
})
