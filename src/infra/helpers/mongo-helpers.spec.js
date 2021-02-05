const MongoHelper = require('./mongo-helpers')

describe('Mongo Help', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should an connect if mongo has disconnected', async () => {
    await MongoHelper.disconnect()
    const db = await MongoHelper.getDb()
    expect(db).not.toBeNull()
  })
})
