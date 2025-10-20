import dayjs from 'dayjs/esm';

import { IWeight, NewWeight } from './weight.model';

export const sampleWithRequiredData: IWeight = {
  id: 86192,
};

export const sampleWithPartialData: IWeight = {
  id: 53022,
  timestamp: dayjs('2025-10-15T05:25'),
};

export const sampleWithFullData: IWeight = {
  id: 24033,
  timestamp: dayjs('2025-10-15T05:06'),
  weight: 55812,
};

export const sampleWithNewData: NewWeight = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
