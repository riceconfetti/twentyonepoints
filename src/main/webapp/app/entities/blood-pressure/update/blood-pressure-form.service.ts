import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IBloodPressure, NewBloodPressure } from '../blood-pressure.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IBloodPressure for edit and NewBloodPressureFormGroupInput for create.
 */
type BloodPressureFormGroupInput = IBloodPressure | PartialWithRequiredKeyOf<NewBloodPressure>;

type BloodPressureFormDefaults = Pick<NewBloodPressure, 'id'>;

type BloodPressureFormGroupContent = {
  id: FormControl<IBloodPressure['id'] | NewBloodPressure['id']>;
  timestamp: FormControl<IBloodPressure['timestamp']>;
  systolic: FormControl<IBloodPressure['systolic']>;
  diastolic: FormControl<IBloodPressure['diastolic']>;
  user: FormControl<IBloodPressure['user']>;
};

export type BloodPressureFormGroup = FormGroup<BloodPressureFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class BloodPressureFormService {
  createBloodPressureFormGroup(bloodPressure: BloodPressureFormGroupInput = { id: null }): BloodPressureFormGroup {
    const bloodPressureRawValue = {
      ...this.getFormDefaults(),
      ...bloodPressure,
    };
    return new FormGroup<BloodPressureFormGroupContent>({
      id: new FormControl(
        { value: bloodPressureRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      timestamp: new FormControl(bloodPressureRawValue.timestamp),
      systolic: new FormControl(bloodPressureRawValue.systolic),
      diastolic: new FormControl(bloodPressureRawValue.diastolic),
      user: new FormControl(bloodPressureRawValue.user),
    });
  }

  getBloodPressure(form: BloodPressureFormGroup): IBloodPressure | NewBloodPressure {
    return form.getRawValue() as IBloodPressure | NewBloodPressure;
  }

  resetForm(form: BloodPressureFormGroup, bloodPressure: BloodPressureFormGroupInput): void {
    const bloodPressureRawValue = { ...this.getFormDefaults(), ...bloodPressure };
    form.reset(
      {
        ...bloodPressureRawValue,
        id: { value: bloodPressureRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): BloodPressureFormDefaults {
    return {
      id: null,
    };
  }
}
