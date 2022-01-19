import { BaseEntity } from './base.entity';
import { Region } from '../../constants/region.enum';
import { ApplicationChoices } from '../../constants/application.enum';

export interface ApplicationEntity extends BaseEntity {
  type: ApplicationChoices;
  applicantId: string;
  managerId?: string;
  channelId?: string;
  isAccepted: boolean;
  isOpen?: boolean;
  character?: {
    region: Region;
    name: string;
    faction: string;
    realm: string;
    scores: Scores;
  };
}

interface Scores {
  tank: number;
  healer: number;
  dps: number;
}
