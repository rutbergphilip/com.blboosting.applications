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
exports.ConnectionService = void 0;
const mongodb_1 = require("mongodb");
class ConnectionService {
    static get() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.database) {
                return this.database;
            }
            const client = new mongodb_1.MongoClient(process.env.MONGODB_URI);
            yield client.connect();
            this.database = client.db(this.NAME);
            return this.database;
        });
    }
}
exports.ConnectionService = ConnectionService;
ConnectionService.NAME = 'blbapps';
