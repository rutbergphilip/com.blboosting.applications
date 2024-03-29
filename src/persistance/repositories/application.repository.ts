import { ApplicationEntity } from '../entites/application.entity';
import { ConnectionService } from '../connection.service';
import { ObjectId } from 'mongodb';

export class ApplicationRepository {
  private static readonly COLLECTION = 'applications';

  async get(objectId: ObjectId): Promise<ApplicationEntity> {
    const database = await ConnectionService.get();
    return await database
      .collection<ApplicationEntity>(ApplicationRepository.COLLECTION)
      .findOne(objectId);
  }

  async getByChannelId(channelId: string): Promise<ApplicationEntity> {
    const database = await ConnectionService.get();
    return await database
      .collection<ApplicationEntity>(ApplicationRepository.COLLECTION)
      .findOne({ channelId: channelId });
  }

  async insert(entity: ApplicationEntity): Promise<ApplicationEntity> {
    const database = await ConnectionService.get();
    const insertEntity = {
      ...entity,
      ...{
        createdAt: new Date().getTime() / 1000,
        updatedAt: new Date().getTime() / 1000,
      },
    };
    const result = await database
      .collection(ApplicationRepository.COLLECTION)
      .insertOne(insertEntity);
    return {
      ...insertEntity,
      _id: result.insertedId,
    };
  }

  async update(entity: ApplicationEntity): Promise<ApplicationEntity> {
    const database = await ConnectionService.get();
    const updatedEntity = {
      ...entity,
      ...{
        updatedAt: new Date().getTime() / 1000,
      },
    };
    const result = await database
      .collection<ApplicationEntity>(ApplicationRepository.COLLECTION)
      .updateOne({ _id: entity._id }, { $set: updatedEntity });
    return {
      ...updatedEntity,
      _id: result.upsertedId,
    };
  }
}
