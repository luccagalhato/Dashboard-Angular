import { Component, OnInit } from '@angular/core';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

export interface ProductPlan {
  key: 'mei' | 'free' | 'basic';
  displayName: string;
  description: string;
  buttonText: string;
}
@Component({
  selector: 'app-billings-general',
  templateUrl: './billings-general.component.html',
  styleUrls: ['./billings-general.component.scss'],
})
export class BillingsGeneralComponent implements OnInit {
  faExternalLinkAlt = faExternalLinkAlt;

  plans: ProductPlan[] = [
    {
      key: 'basic',
      displayName: 'Plano Básico',
      description:
        'Limite de 5 notas fiscais importadas, cálculo automático, gestão de notificação e documentos.',
      buttonText: 'Assinar Plano Básico',
    },
    {
      key: 'mei',
      displayName: 'Plano MEI',
      description: 'Inserir descrição do plano MEI...',
      buttonText: 'Assinar Plano MEI',
    },
    {
      key: 'free',
      displayName: 'Plano Grátis',
      description:
        'Importe notas ilimitadas, cálculo automático, efetue simulações, realize apurações, faça gestão de notificação e documentos.',
      buttonText: 'Voltar Plano Grátis',
    },
  ];

  selectedPlan: ProductPlan = this.plans.find((x) => x.key === 'basic');

  constructor() {}

  ngOnInit(): void {}

  selectPlan(plan: ProductPlan) {
    this.selectedPlan = this.plans.find((x) => x.key === plan.key);
  }
}
