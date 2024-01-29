import { describe, expect, it } from 'vitest'
import { compare } from 'bcryptjs'
import { RegisterUseCase } from './register'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

describe('Register use case', () => {
  it('should to register a new user', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'test123',
    })

    expect(user.id).toBeDefined()
  })

  it('should hash the user password', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'test123',
    })

    const passwordMatch = await compare('test123', user.password_hash)

    expect(passwordMatch).toBe(true)
  })

  it('should not be able to register a new user with an email that is already in use', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const email = 'johndoe@example.com'

    await registerUseCase.execute({
      name: 'John Doe',
      email,
      password: 'test123',
    })

    expect(() =>
      registerUseCase.execute({
        name: 'John Doe',
        email,
        password: 'test123',
      }),
    ).rejects.toThrow('User already exists')
  })
})
