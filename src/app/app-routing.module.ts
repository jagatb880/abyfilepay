import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
{
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  { path: 'identifie', loadChildren: './identifie/identifie.module#IdentifiePageModule' },
  { path: 'verifie', loadChildren: './verifie/verifie.module#VerifiePageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'transfert', loadChildren: './transfert/transfert.module#TransfertPageModule' },
  { path: 'transaction', loadChildren: './transaction/transaction.module#TransactionPageModule' },
  { path: 'mouvement', loadChildren: './mouvement/mouvement.module#MouvementPageModule' },
  { path: 'facture', loadChildren: './facture/facture.module#FacturePageModule' },
  { path: 'agents', loadChildren: './agents/agents.module#AgentsPageModule' },
  { path: 'password', loadChildren: './password/password.module#PasswordPageModule' },
  { path: 'profil', loadChildren: './profil/profil.module#ProfilPageModule' },
  { path: 'contact', loadChildren: './contact/contact.module#ContactPageModule' },
  { path: 'credit', loadChildren: './credit/credit.module#CreditPageModule' },
  { path: 'agent', loadChildren: './agent/agent.module#AgentPageModule' },
  { path: 'abyfou', loadChildren: './abyfou/abyfou.module#AbyfouPageModule' },
  { path: 'forfait', loadChildren: './forfait/forfait.module#ForfaitPageModule' },
  { path: 'cash', loadChildren: './cash/cash.module#CashPageModule' },
  { path: 'cash-recap', loadChildren: './cash-recap/cash-recap.module#CashRecapPageModule' },
  { path: 'abyfou-recap', loadChildren: './abyfou-recap/abyfou-recap.module#AbyfouRecapPageModule' },
  { path: 'facture-forfait', loadChildren: './facture-forfait/facture-forfait.module#FactureForfaitPageModule' },
  { path: 'facture-recap', loadChildren: './facture-recap/facture-recap.module#FactureRecapPageModule' },
  { path: 'transfert-recap', loadChildren: './transfert-recap/transfert-recap.module#TransfertRecapPageModule' },
  { path: 'reload', loadChildren: './reload/reload.module#ReloadPageModule' },
  { path: 'reload-recap', loadChildren: './reload-recap/reload-recap.module#ReloadRecapPageModule' },
  { path: 'suscribe', loadChildren: './suscribe/suscribe.module#SuscribePageModule' },
  { path: 'localise', loadChildren: './localise/localise.module#LocalisePageModule' },
  { path: 'session', loadChildren: './session/session.module#SessionPageModule' },
  { path: 'credit-recap', loadChildren: './credit-recap/credit-recap.module#CreditRecapPageModule' },
  { path: 'reload-client', loadChildren: './reload-client/reload-client.module#ReloadClientPageModule' },
  { path: 'recharge', loadChildren: './recharge/recharge.module#RechargePageModule' },
  { path: 'transaction-detail', loadChildren: './transaction-detail/transaction-detail.module#TransactionDetailPageModule' },
  { path: 'afric', loadChildren: './afric/afric.module#AfricPageModule' },
  { path: 'afric-recap', loadChildren: './afric-recap/afric-recap.module#AfricRecapPageModule' },
  { path: 'forfait-liste', loadChildren: './forfait-liste/forfait-liste.module#ForfaitListePageModule' },
  { path: 'facture-liste', loadChildren: './facture-liste/facture-liste.module#FactureListePageModule' },
  { path: 'alerte', loadChildren: './alerte/alerte.module#AlertePageModule' },
  { path: 'logs', loadChildren: './logs/logs.module#LogsPageModule' },
  { path: 'commission', loadChildren: './commission/commission.module#CommissionPageModule' },
  { path: 'credit-agent', loadChildren: './credit-agent/credit-agent.module#CreditAgentPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
