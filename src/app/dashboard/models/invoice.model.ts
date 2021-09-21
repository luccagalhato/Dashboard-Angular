import { Buyer } from './buyer.model';
import { CreatedAt } from './createdAt.model';
import { EmissionDate } from './emissionDate.model';
import { Seller } from './seller.model';
import { UpdatedAt } from './updatedAt.model';

export interface Invoice {
  buyer: Buyer;
  iss?: any;
  cofins: string;
  activity: string;
  emissionDate: EmissionDate;
  id: string;
  type: string;
  total: string;
  createdAt: CreatedAt;
  inss: string;
  source: string;
  updatedAt: UpdatedAt;
  description: string;
  seller: Seller;
  pis: string;
  icms?: any;
  category: string;
  ir: string;
  issueDate?: any;
  cnpj: string;
  items?: any;
}
