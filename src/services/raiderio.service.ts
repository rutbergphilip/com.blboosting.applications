import { RaiderIoCharacter } from '../interfaces/raiderio.interface';
import { HttpService } from './http.service';

export class RaiderIoService {
  private static CACHE: Map<
    string,
    { expiresAt: number; value: RaiderIoCharacter }
  > = new Map();

  static async getCharacter(
    region: string,
    realm: string,
    name: string
  ): Promise<RaiderIoCharacter> {
    const cacheKey = `${region.toLowerCase()}-${realm.toLowerCase()}-${name.toLowerCase()}`;
    const cacheItem = this.CACHE.get(cacheKey);
    if (cacheItem && cacheItem.expiresAt > new Date().getTime()) {
      return cacheItem.value;
    }
    const value = await HttpService.get<RaiderIoCharacter>({
      hostname: 'https://raider.io',
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
  }
}
