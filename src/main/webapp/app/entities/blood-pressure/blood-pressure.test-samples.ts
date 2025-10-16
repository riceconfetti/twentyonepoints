import dayjs from 'dayjs/esm';

import { IBloodPressure, NewBloodPressure } from './blood-pressure.model';

export const sampleWithRequiredData: IBloodPressure = {
  id: 82246,
};

export const sampleWithPartialData: IBloodPressure = {
  id: 37469,
  systolic: 25304,
};

export const sampleWithFullData: IBloodPressure = {
  id: 94935,
  timestamp: dayjs('2025-10-16'),
  systolic: 74963,
  diastolic: 18630,
};

export const sampleWithNewData: NewBloodPressure = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
