"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationRepository = void 0;
const connection_service_1 = require("../connection.service");
class ApplicationRepository {
    get(objectId) {
        return __awaiter(this, void 0, void 0, function* () {
            const database = yield connection_service_1.ConnectionService.get();
            return yield database
                .collection(ApplicationRepository.COLLECTION)
                .findOne(objectId);
        });
    }
    getByChannelId(channelId) {
        return __awaiter(this, void 0, void 0, function* () {
            const database = yield connection_service_1.ConnectionService.get();
            return yield database
                .collection(ApplicationRepository.COLLECTION)
                .findOne({ channelId: channelId });
        });
    }
    insert(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            const database = yield connection_service_1.ConnectionService.get();
            const insertEntity = Object.assign(Object.assign({}, entity), {
                createdAt: new Date().getTime() / 1000,
                updatedAt: new Date().getTime() / 1000,
            });
            const result = yield database
                .collection(ApplicationRepository.COLLECTION)
                .insertOne(insertEntity);
            return Object.assign(Object.assign({}, insertEntity), { _id: result.insertedId });
        });
    }
    update(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            const database = yield connection_service_1.ConnectionService.get();
            const updatedEntity = Object.assign(Object.assign({}, entity), {
                updatedAt: new Date().getTime() / 1000,
            });
            const result = yield database
                .collection(ApplicationRepository.COLLECTION)
                .updateOne({ _id: entity._id }, { $set: updatedEntity });
            return Object.assign(Object.assign({}, updatedEntity), { _id: result.upsertedId });
        });
    }
}
exports.ApplicationRepository = ApplicationRepository;
ApplicationRepository.COLLECTION = 'applications';
