import { Pipe, PipeTransform } from '@angular/core';
import { ProductPlan } from './billings-general.component';

@Pipe({
  name: 'availablePlans',
})
export class AvailablePlansPipe implements PipeTransform {
  transform(plans: ProductPlan[], selectedPlan: ProductPlan): ProductPlan[] {
    if (!plans || !selectedPlan) return [];
    return plans.filter((plan) => plan.key !== selectedPlan.key);
  }
}
