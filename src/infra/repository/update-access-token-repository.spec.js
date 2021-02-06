const UpdateAccessTokenRepository = require('./update-access-token-repository')
const MongoHelper = require('../helpers/mongo-helpers')
const { MissingParamError } = require('../../utils/errors')
let db

const makeSut = () => {
  const userModel = db.collection('users')
  const sut = new UpdateAccessTokenRepository(userModel)
  return {
    userModel,
    sut
  }
}

describe('UpdateAccessToken Repository', () => {
  let fakeUserId
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
    db = await MongoHelper.getDb()
  })

  beforeEach(async () => {
    const userModel = await db.collection('users')
    await userModel.deleteMany()
    const fakerUser = await userModel.insertOne({
      email: 'valid_email@mail.com',
      name: 'any_name',
      age: 50,
      state: 'any_state',
      password: 'hashed_password'
    })
    fakeUserId = fakerUser.ops[0]._id
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should update the user with the given accessToken', async () => {
    const { sut, userModel } = makeSut()
    await sut.update(fakeUserId, 'valid_token')
    const updatedFakeUser = await userModel.findOne({ _id: fakeUserId })
    expect(updatedFakeUser.accessToken).toBe('valid_token')
  })

  test('Should throw if no userModel is provided', async () => {
    const sut = new UpdateAccessTokenRepository()
    const promise = sut.update(fakeUserId, 'valid_token')
    await expect(promise).rejects.toThrow()
  })

  test('Should throw if no params are provided', async () => {
    const { sut } = makeSut()
    await expect(sut.update()).rejects.toThrow(new MissingParamError('userId'))
    await expect(sut.update(fakeUserId)).rejects.toThrow(new MissingParamError('accessToken'))
  })
})
