import mongoose, { Types } from 'mongoose';
import { ServicesDao, servicesModelSchema } from '.';
import { docToJSON, expectDocumentToEqual, mockCreateServicePayload, MockDB, mockUser } from '../../test';

describe('services-dao', () => {
  const db = new MockDB();
  mongoose.model(ServicesDao.MODEL_NAME, servicesModelSchema);
  const servicesDao = new ServicesDao();

  const mockInsertServicePayload = {
    ...mockCreateServicePayload,
    createdBy: mockUser.id
  };

  beforeAll(async () => {
    await db.connect();
  });

  afterEach(async () => {
    await db.clearDB();
  });

  afterAll(async () => {
    await db.close();
  });

  it('create -> get -> getAll', async () => {
    const doc = await servicesDao.create(mockInsertServicePayload);
    expectDocumentToEqual(doc, mockInsertServicePayload);

    let getResult = await servicesDao.get(doc.id);
    expectDocumentToEqual(getResult, doc);

    // invalid service id, should return null
    getResult = await servicesDao.get(new Types.ObjectId().toString());
    expect(getResult).toEqual(null);

    const getAllResult = await servicesDao.getAll();
    expect(getAllResult.length).toEqual(1);
    expectDocumentToEqual(getAllResult[0], doc);
  });

  it('create -> update -> get', async () => {
    const doc = await servicesDao.create(mockInsertServicePayload);
    expectDocumentToEqual(doc, mockInsertServicePayload);

    const updateResult = await servicesDao.update({ id: doc.id, name: 'new name' });
    expectDocumentToEqual(
      updateResult,
      { ...docToJSON(doc), name: 'new name' },
      { ignoreTimestamp: true }
    );

    const getResult = await servicesDao.get(doc.id);
    expectDocumentToEqual(getResult, updateResult);
  });

  it('create -> update (fail) -> get (same as before)', async () => {
    const doc = await servicesDao.create(mockInsertServicePayload);
    expectDocumentToEqual(doc, mockInsertServicePayload);

    const updateResult = await servicesDao.update({
      id: new Types.ObjectId().toString(),
      name: 'new name'
    });
    expect(updateResult).toEqual(null);

    const getResult = await servicesDao.get(doc.id);
    expectDocumentToEqual(getResult, doc);
  });

  it('create -> delete (success) -> get (null)', async () => {
    const doc = await servicesDao.create(mockInsertServicePayload);
    expectDocumentToEqual(doc, mockInsertServicePayload);

    const deletedExplorationId = await servicesDao.delete(doc.id);
    expect(deletedExplorationId).toBeTruthy();

    const getResult = await servicesDao.get(doc.id);
    expect(getResult).toEqual(null);
  });

  it('create -> delete (fail) -> get (exists)', async () => {
    const doc = await servicesDao.create(mockInsertServicePayload);
    expectDocumentToEqual(doc, mockInsertServicePayload);

    const deletedExplorationId = await servicesDao.delete(new Types.ObjectId().toString());
    expect(deletedExplorationId).toEqual(null);

    const getResult = await servicesDao.get(doc.id);
    expectDocumentToEqual(getResult, doc);
  });
});
