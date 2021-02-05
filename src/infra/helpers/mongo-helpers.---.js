const MongoHelper = require('./mongo-helpers')

describe('Mongo Help', () => {
  test('Should an connect if mongo has disconnected', async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
    await MongoHelper.disconnect()
    const db = await MongoHelper.getDb()
    expect(db).not.toBeNull()
  })
})
