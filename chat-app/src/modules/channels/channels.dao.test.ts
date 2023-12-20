import mongoose, { Types } from 'mongoose';
import { ChannelsDao, channelsSchema, IChannelRes } from '.';
import { IMessage } from '..';
import { docToJSON, expectDocumentToEqual, mockCreateChannelDmReq, MockDB, mockMsg } from '../../test';

describe('channels-dao', () => {
  const db = new MockDB();
  mongoose.model(ChannelsDao.MODEL_NAME, channelsSchema);
  const channelsDao = new ChannelsDao();

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
    const doc = await channelsDao.create(mockCreateChannelDmReq);
    expectDocumentToEqual(doc, mockCreateChannelDmReq);

    let getResult = await channelsDao.get(doc.id);
    expectDocumentToEqual(getResult, doc);

    // invalid channel id, should return null
    getResult = await channelsDao.get(new Types.ObjectId().toString());
    expect(getResult).toEqual(null);

    const getAllResult = await channelsDao.getAll();
    expect(getAllResult.length).toEqual(1);
    expectDocumentToEqual(getAllResult[0], doc);
  });

  it('createChannel -> getChannelDmByUsers -> getUserChannels', async () => {
    const doc = await channelsDao.createChannel(mockCreateChannelDmReq);
    expectDocumentToEqual(doc, mockCreateChannelDmReq);

    let getChannelDmByUsersResult = await channelsDao.getChannelDmByUsers(
      mockCreateChannelDmReq.users[0].toString(),
      mockCreateChannelDmReq.users[1].toString()
    );
    expectDocumentToEqual(getChannelDmByUsersResult, doc);

    // should return null
    getChannelDmByUsersResult = await channelsDao.getChannelDmByUsers(
      new Types.ObjectId().toString(),
      new Types.ObjectId().toString()
    );
    expect(getChannelDmByUsersResult).toEqual(null);

    const getUserChannelsResult = await channelsDao.getUserChannels(mockCreateChannelDmReq.users[0].toString());
    expect(getUserChannelsResult.length).toEqual(1);
    // field 'users' should be empty because getUserChannels populating field 'users' agains 'users' collection and its not exists.
    // field message should shoult not be included in the result because we remove the field using $project pipeline
    expectDocumentToEqual(getUserChannelsResult[0], doc, { excludeFields: ['users', 'messages'] });
  });

  it('createChannel -> pushMsg -> getMsgs', async () => {
    const channel = await channelsDao.createChannel(mockCreateChannelDmReq);
    expectDocumentToEqual(channel, mockCreateChannelDmReq);

    const pushMsgResult = await channelsDao.pushMsg(
      channel.id,
      mockMsg
    );
    expect(pushMsgResult).toBeTruthy();
    const [, pushedMsg] = pushMsgResult as unknown as [IChannelRes, IMessage];
    expectDocumentToEqual(pushedMsg, mockMsg, { ignoreTimestamp: true });

    let msgs = await channelsDao.getMsgs(channel.id);
    expectDocumentToEqual(msgs, [mockMsg], { ignoreTimestamp: true });

    // invalid channel id should return null
    msgs = await channelsDao.getMsgs(new Types.ObjectId().toString());
    expect(msgs).toEqual(null);
  });

  it('createChannel -> pushMsg -> getMsgs -> editMsg', async () => {
    const channel = await channelsDao.createChannel(mockCreateChannelDmReq);
    expectDocumentToEqual(channel, mockCreateChannelDmReq);

    const pushMsgResult = await channelsDao.pushMsg(
      channel.id,
      mockMsg
    );
    expect(pushMsgResult).toBeTruthy();
    const [, pushedMsg] = pushMsgResult as unknown as [IChannelRes, IMessage];
    expectDocumentToEqual(pushedMsg, mockMsg, { ignoreTimestamp: true });

    const msgs = await channelsDao.getMsgs(channel.id);
    expectDocumentToEqual(msgs, [mockMsg], { ignoreTimestamp: true });

    const msg = await channelsDao.editMsg(channel.id, pushedMsg.id, 'new text');
    expectDocumentToEqual(msg, {
      ...mockMsg,
      text: 'new text'
    }, { ignoreTimestamp: true });
  });

  it('create -> update -> get', async () => {
    const doc = await channelsDao.create(mockCreateChannelDmReq);
    expectDocumentToEqual(doc, mockCreateChannelDmReq);

    const updateResult = await channelsDao.update({ id: doc.id, name: 'new name' });
    expectDocumentToEqual(
      updateResult,
      { ...docToJSON(doc), name: 'new name' },
      { ignoreTimestamp: true }
    );

    const getResult = await channelsDao.get(doc.id);
    expectDocumentToEqual(getResult, updateResult);
  });

  it('create -> update (fail) -> get (same as before)', async () => {
    const doc = await channelsDao.create(mockCreateChannelDmReq);
    expectDocumentToEqual(doc, mockCreateChannelDmReq);

    const updateResult = await channelsDao.update({
      id: new Types.ObjectId().toString(),
      name: 'new name'
    });
    expect(updateResult).toEqual(null);

    const getResult = await channelsDao.get(doc.id);
    expectDocumentToEqual(getResult, doc);
  });

  it('create -> delete (success) -> get (null)', async () => {
    const doc = await channelsDao.create(mockCreateChannelDmReq);
    expectDocumentToEqual(doc, mockCreateChannelDmReq);

    const deletedExplorationId = await channelsDao.delete(doc.id);
    expect(deletedExplorationId).toBeTruthy();

    const getResult = await channelsDao.get(doc.id);
    expect(getResult).toEqual(null);
  });

  it('create -> delete (fail) -> get (exists)', async () => {
    const doc = await channelsDao.create(mockCreateChannelDmReq);
    expectDocumentToEqual(doc, mockCreateChannelDmReq);

    const deletedExplorationId = await channelsDao.delete(new Types.ObjectId().toString());
    expect(deletedExplorationId).toEqual(null);

    const getResult = await channelsDao.get(doc.id);
    expectDocumentToEqual(getResult, doc);
  });
});
