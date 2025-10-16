import { Units } from 'app/entities/enumerations/units.model';

import { IPreferences, NewPreferences } from './preferences.model';

export const sampleWithRequiredData: IPreferences = {
  id: 99282,
  weightUnits: Units['LB'],
};

export const sampleWithPartialData: IPreferences = {
  id: 26211,
  weightUnits: Units['LB'],
};

export const sampleWithFullData: IPreferences = {
  id: 68408,
  weeklyGoal: 18,
  weightUnits: Units['KG'],
};

export const sampleWithNewData: NewPreferences = {
  weightUnits: Units['KG'],
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
