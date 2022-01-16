import { ApplicationEntity } from '../entites/application.entity';
import { ConnectionService } from '../connection.service';
import { ObjectId } from 'mongodb';

export class ApplicationRepository {
  private static readonly COLLECTION = 'applications';

  async get(objectId: ObjectId): Promise<void> {
    const database = await ConnectionService.get();
    return await database
      .collection(ApplicationRepository.COLLECTION)
      .findOne(objectId);
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
      .collection(ApplicationRepository.COLLECTION)
      .updateOne(entity._id, updatedEntity);
    return {
      ...updatedEntity,
      _id: result.upsertedId,
    };
  }
}
