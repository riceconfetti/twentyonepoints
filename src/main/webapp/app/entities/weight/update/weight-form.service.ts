import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IWeight, NewWeight } from '../weight.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IWeight for edit and NewWeightFormGroupInput for create.
 */
type WeightFormGroupInput = IWeight | PartialWithRequiredKeyOf<NewWeight>;

type WeightFormDefaults = Pick<NewWeight, 'id'>;

type WeightFormGroupContent = {
  id: FormControl<IWeight['id'] | NewWeight['id']>;
  timestamp: FormControl<IWeight['timestamp']>;
  weight: FormControl<IWeight['weight']>;
  user: FormControl<IWeight['user']>;
};

export type WeightFormGroup = FormGroup<WeightFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class WeightFormService {
  createWeightFormGroup(weight: WeightFormGroupInput = { id: null }): WeightFormGroup {
    const weightRawValue = {
      ...this.getFormDefaults(),
      ...weight,
    };
    return new FormGroup<WeightFormGroupContent>({
      id: new FormControl(
        { value: weightRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      timestamp: new FormControl(weightRawValue.timestamp),
      weight: new FormControl(weightRawValue.weight),
      user: new FormControl(weightRawValue.user),
    });
  }

  getWeight(form: WeightFormGroup): IWeight | NewWeight {
    return form.getRawValue() as IWeight | NewWeight;
  }

  resetForm(form: WeightFormGroup, weight: WeightFormGroupInput): void {
    const weightRawValue = { ...this.getFormDefaults(), ...weight };
    form.reset(
      {
        ...weightRawValue,
        id: { value: weightRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): WeightFormDefaults {
    return {
      id: null,
    };
  }
}
