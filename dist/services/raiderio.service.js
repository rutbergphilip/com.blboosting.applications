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
exports.RaiderIoService = void 0;
const http_service_1 = require("./http.service");
class RaiderIoService {
    static getCharacter(region, realm, name) {
        return __awaiter(this, void 0, void 0, function* () {
            const cacheKey = `${region.toLowerCase()}-${realm.toLowerCase()}-${name.toLowerCase()}`;
            const cacheItem = this.CACHE.get(cacheKey);
            if (cacheItem && cacheItem.expiresAt > new Date().getTime()) {
                return cacheItem.value;
            }
            const value = yield http_service_1.HttpService.get({
                hostname: 'raider.io',
                path: '/api/v1/characters/profile',
                queryParameters: {
                    name: name,
                    realm: realm,
                    region: region,
                    fields: 'mythic_plus_scores_by_season:current,covenant,guild',
                },
            });
            this.CACHE.set(cacheKey, {
                expiresAt: new Date().getTime() + 300000,
                value: value,
            });
            return value;
        });
    }
}
exports.RaiderIoService = RaiderIoService;
RaiderIoService.CACHE = new Map();
