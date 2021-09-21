import { CalculatedTax } from './calculatedTax.model';
import { RetainedTax } from './retainedTax.model';

export interface Taxes {
  impostosCalculados: CalculatedTax;
  totalVendas: number;
  totalAnexoI: number;
  totalAnexoIII: number;
  contactsCount: number;
  totalAnexoII: number;
  total: number;
  impostosRetidos: RetainedTax;
  totalAnexoV: number;
  totalServicos: number;
  totalAnexoIV: number;
  totalTaxes?: number;
}
