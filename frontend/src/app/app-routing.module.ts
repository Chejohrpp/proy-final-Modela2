import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnalyticsComponent } from './components/pages/dashboard/analytics/analytics.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard/dashboard.component';
import { EcommerceComponent } from './components/pages/dashboard/ecommerce/ecommerce.component';
import { AppChatComponent } from './components/pages/app-chat/app-chat.component';
import { AppTodoComponent } from './components/pages/app-todo/app-todo.component';
import { AppCalendarComponent } from './components/pages/app-calendar/app-calendar.component';
import { GalleryComponent } from './components/pages/gallery/gallery.component';
import { TimelineComponent } from './components/pages/timeline/timeline.component';
import { FaqComponent } from './components/pages/faq/faq.component';
import { InvoiceComponent } from './components/pages/invoice/invoice.component';
import { BlankPageComponent } from './components/pages/blank-page/blank-page.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { GridComponent } from './components/pages/grid/grid.component';
import { ColorsComponent } from './components/pages/colors/colors.component';
import { IconsComponent } from './components/pages/icons/icons/icons.component';
import { BoxiconsComponent } from './components/pages/icons/boxicons/boxicons.component';
import { FeathericonsComponent } from './components/pages/icons/feathericons/feathericons.component';
import { BasicCardComponent } from './components/pages/card/basic-card/basic-card.component';
import { ColorsCardComponent } from './components/pages/card/colors-card/colors-card.component';
import { StatisticsCardComponent } from './components/pages/card/statistics-card/statistics-card.component';
import { FormLayoutComponent } from './components/pages/forms/form-layout/form-layout.component';
import { FormInputGroupComponent } from './components/pages/forms/form-input-group/form-input-group.component';
import { TableLightComponent } from './components/pages/table/table-light/table-light.component';
import { TableDarkComponent } from './components/pages/table/table-dark/table-dark.component';
import { FormComponent } from './components/pages/forms/form/form.component';
import { CardComponent } from './components/pages/card/card/card.component';
import { TableComponent } from './components/pages/table/table/table.component';
import { LoginComponent } from './components/pages/authentication/login/login.component';
import { AuthenticationComponent } from './components/pages/authentication/authentication/authentication.component';
import { LoginWithImageComponent } from './components/pages/authentication/login-with-image/login-with-image.component';
import { RegisterComponent } from './components/pages/authentication/register/register.component';
import { RegisterWithImageComponent } from './components/pages/authentication/register-with-image/register-with-image.component';
import { ForgotPasswordComponent } from './components/pages/authentication/forgot-password/forgot-password.component';
import { ForgotPasswordWithImageComponent } from './components/pages/authentication/forgot-password-with-image/forgot-password-with-image.component';
import { ResetPasswordComponent } from './components/pages/authentication/reset-password/reset-password.component';
import { ResetPasswordWithImageComponent } from './components/pages/authentication/reset-password-with-image/reset-password-with-image.component';
import { SessionLockScreenComponent } from './components/pages/authentication/session-lock-screen/session-lock-screen.component';
import { SessionLockScreenWithImageComponent } from './components/pages/authentication/session-lock-screen-with-image/session-lock-screen-with-image.component';
import { MiscellaneousComponent } from './components/pages/miscellaneous/miscellaneous/miscellaneous.component';
import { NotAuthorizedComponent } from './components/pages/miscellaneous/not-authorized/not-authorized.component';
import { NotAuthorizedWithImageComponent } from './components/pages/miscellaneous/not-authorized-with-image/not-authorized-with-image.component';
import { MaintenanceComponent } from './components/pages/miscellaneous/maintenance/maintenance.component';
import { MaintenanceWithImageComponent } from './components/pages/miscellaneous/maintenance-with-image/maintenance-with-image.component';
import { ComingSoonComponent } from './components/pages/miscellaneous/coming-soon/coming-soon.component';
import { ComingSoonWithImageComponent } from './components/pages/miscellaneous/coming-soon-with-image/coming-soon-with-image.component';
import { Errorv1Component } from './components/pages/error/errorv1/errorv1.component';
import { Errorv2Component } from './components/pages/error/errorv2/errorv2.component';
import { ErrorComponent } from './components/pages/error/error/error.component';
import { Errorv3Component } from './components/pages/error/errorv3/errorv3.component';
import { Errorv4Component } from './components/pages/error/errorv4/errorv4.component';
import { MapsComponent } from './components/pages/maps/maps.component';
import { ApexChartsComponent } from './components/pages/apex-charts/apex-charts.component';
import { ChartjsComponent } from './components/pages/chartjs/chartjs.component';
import { EncomiendaGestionComponent } from './components/pages/encomienda-gestion/encomienda-gestion/encomienda-gestion.component';
import { CreateEmployeeEncomiendaComponent } from './components/pages/encomienda-gestion/create-employee-encomienda/create-employee-encomienda.component';
import { ReportsEncomiendaComponent } from './components/pages/encomienda-gestion/reports-encomienda/reports-encomienda.component';
import { HonorariumTableEncomiendaComponent } from './components/pages/encomienda-gestion/honorarium-table-encomienda/honorarium-table-encomienda.component';
import { BranchExpensesEncomiendaComponent } from './components/pages/branch-expenses-encomienda/branch-expenses-encomienda.component';
import { MonthlyGoalsEncomiendaComponent } from './components/pages/monthly-goals-encomienda/monthly-goals-encomienda.component';
import { SurplusEncomiendaComponent } from './components/pages/surplus-encomienda/surplus-encomienda.component';
import { SpecialExpensesEncomiendaComponent } from './components/pages/special-expenses-encomienda/special-expenses-encomienda.component';
import { CreateExpenseEncomiendaComponent } from './components/pages/encomienda-gestion/create-expense-encomienda/create-expense-encomienda.component';
import { EncomiendaComponent } from './components/pages/encomienda/encomienda.component';
import { StatusEncomiendaComponent } from './components/pages/encomienda/status-encomienda/status-encomienda.component';
import { SendEncomiendaComponent } from './components/pages/encomienda/send-encomienda/send-encomienda.component';
import { PriceEncomiendaComponent } from './components/pages/encomienda/price-encomienda/price-encomienda.component';
import { NewBranchComponent } from './components/pages/branch/new-branch/new-branch.component';
import { BranchComponent } from './components/pages/branch/branch/branch.component';
import { TransportComponent } from './components/pages/routes/transport/transport.component';
import { RoutesComponent } from './components/pages/routes/routes.component';
import { NewRouteComponent } from './components/pages/routes/new-route/new-route.component';
import { CreateHonorariumEncomiendaComponent } from './components/pages/encomienda-gestion/create-honorarium-encomienda/create-honorarium-encomienda.component';
import { CreateRoleComponent } from './components/pages/encomienda-gestion/create-role/create-role.component';
import { CreateRolBranchComponent } from './components/pages/encomienda-gestion/create-rol-branch/create-rol-branch.component';

const routes: Routes = [
  {path: '', component: AnalyticsComponent},
  {
    path: 'dashboard', component: DashboardComponent,
    children: [
      {path: 'analytics', data: { breadcrumb: 'Analytics' }, component: AnalyticsComponent},
      {path: 'e-commerce', data: { breadcrumb: 'eCommerce' }, component: EcommerceComponent},
    ]
  },
  {path: 'encomienda', component: EncomiendaComponent,
  children: [
    {path: 'status', data: { breadcrumb: 'Estado Encomienda' }, component: StatusEncomiendaComponent},
    {path: 'send', data: { breadcrumb: 'Enviar Encomienda' }, component: SendEncomiendaComponent},
    {path: 'price', data: { breadcrumb: 'Tarifario' }, component: PriceEncomiendaComponent}
  ]},
  {path: 'routes', component: RoutesComponent,
  children: [
    {path: 'transport', data: { breadcrumb: 'Gestión de Transportes' }, component: TransportComponent},
    {path: 'new', data: { breadcrumb: 'Agregar nueva ruta' }, component: NewRouteComponent},
  ]},
  {path: 'branch', component: BranchComponent,
  children: [
    {path: 'new', data: { breadcrumb: 'Crear Sucursal' }, component: NewBranchComponent}
  ]},
  {path: 'app-chat', component: AppChatComponent},
  {path: 'app-todo', component: AppTodoComponent},
  {path: 'app-calendar', component: AppCalendarComponent},
  {
    path: 'encomienda-gestion', component: EncomiendaGestionComponent,
    children: [
      {path: 'create-employer', data: { breadcrumb: 'Crear empleado' }, component: CreateEmployeeEncomiendaComponent},
      {path: 'report', data: { breadcrumb: 'Visualizar reportes' }, component: ReportsEncomiendaComponent},
      {path: 'honorarium', data: { breadcrumb: 'tabla de honorarios' }, component: HonorariumTableEncomiendaComponent},
      {path: 'create-expense', data: { breadcrumb: 'crear un nuevo gasto' }, component: CreateExpenseEncomiendaComponent},
      {path: 'create-honorarium', data: { breadcrumb: 'crear un nuevo honorario' }, component: CreateHonorariumEncomiendaComponent},
      {path: 'create-rol', data: { breadcrumb: 'crear un nuevo rol' }, component: CreateRoleComponent},
      {path: 'create-rol-branch', data: { breadcrumb: 'Asignar salario a una sucursal de rol' }, component: CreateRolBranchComponent},
    ]
  },
  {path: 'branch-expenses', component: BranchExpensesEncomiendaComponent},
  {path: 'special-expenses', component: SpecialExpensesEncomiendaComponent},
  {path: 'monthly-goals', component: MonthlyGoalsEncomiendaComponent},
  {path: 'surplus', component: SurplusEncomiendaComponent},
  {path: 'grid', component: GridComponent},
  {path: 'colors', component: ColorsComponent},
  {
    path: 'icons', component: IconsComponent,
    children: [
      {path: 'boxicons', data: { breadcrumb: 'Boxicons' }, component: BoxiconsComponent},
      {path: 'feathericons', data: { breadcrumb: 'Feather Icons' }, component: FeathericonsComponent},
    ]
  },
  {
    path: 'card', component: CardComponent,
    children: [
      {path: 'basic-card', data: { breadcrumb: 'Basic Card' }, component: BasicCardComponent},
      {path: 'colors-card', data: { breadcrumb: 'Colors Card' }, component: ColorsCardComponent},
      {path: 'statistics-card', data: { breadcrumb: 'Statistics Card' }, component: StatisticsCardComponent},
    ]
  },
  {
    path: 'forms', component: FormComponent,
    children: [
      {path: 'form-layout', data: { breadcrumb: 'Forms' }, component: FormLayoutComponent},
      {path: 'form-input-group', data: { breadcrumb: 'Input Group' }, component: FormInputGroupComponent},
    ]
  },
  {
    path: 'table', component: TableComponent,
    children: [
      {path: 'table-light', data: { breadcrumb: 'Table' }, component: TableLightComponent},
      {path: 'table-dark', data: { breadcrumb: 'Table Dark' }, component: TableDarkComponent},
    ]
  },
  {path: 'profile', component: ProfileComponent},
  {path: 'gallery', component: GalleryComponent},
  {path: 'timeline', component: TimelineComponent},
  {path: 'faq', component: FaqComponent},
  {path: 'invoice', component: InvoiceComponent},
  {path: 'blank-page', component: BlankPageComponent},
  {
    path: 'authentication', component: AuthenticationComponent,
    children: [
      {path: 'login', data: { breadcrumb: 'Login' }, component: LoginComponent},
      {path: 'login-with-image', data: { breadcrumb: 'Login with Image' }, component: LoginWithImageComponent},
      {path: 'register', data: { breadcrumb: 'Register' }, component: RegisterComponent},
      {path: 'register-with-image', data: { breadcrumb: 'Register with Image' }, component: RegisterWithImageComponent},
      {path: 'forgot-password', data: { breadcrumb: 'Forgot Password' }, component: ForgotPasswordComponent},
      {path: 'forgot-password-with-image', data: { breadcrumb: 'Forgot Password with Image' }, component: ForgotPasswordWithImageComponent},
      {path: 'reset-password', data: { breadcrumb: 'Reset Password' }, component: ResetPasswordComponent},
      {path: 'reset-password-with-image', data: { breadcrumb: 'Reset Password with Image' }, component: ResetPasswordWithImageComponent},
      {path: 'lock-screen', data: { breadcrumb: 'Lock Screen' }, component: SessionLockScreenComponent},
      {path: 'lock-screen-with-image', data: { breadcrumb: 'Lock Screen with Image' }, component: SessionLockScreenWithImageComponent},
    ]
  },
  {
    path: 'miscellaneous', component: MiscellaneousComponent,
    children: [
      {path: 'not-authorized', data: { breadcrumb: 'Not Authorized' }, component: NotAuthorizedComponent},
      {path: 'not-authorized-with-image', data: { breadcrumb: 'Not Authorized with Image' }, component: NotAuthorizedWithImageComponent},
      {path: 'maintenance', data: { breadcrumb: 'Maintenance' }, component: MaintenanceComponent},
      {path: 'maintenance-with-image', data: { breadcrumb: 'Maintenance with Image' }, component: MaintenanceWithImageComponent},
      {path: 'coming-soon', data: { breadcrumb: 'Coming Soon' }, component: ComingSoonComponent},
      {path: 'coming-soon-with-image', data: { breadcrumb: 'Coming Soon with Image' }, component: ComingSoonWithImageComponent},
    ]
  },
  {
    path: 'error', component: ErrorComponent,
    children: [
      {path: 'errorv1', data: { breadcrumb: '404 Error' }, component: Errorv1Component},
      {path: 'errorv2', data: { breadcrumb: '404 Error with Image' }, component: Errorv2Component},
      {path: 'errorv3', data: { breadcrumb: '500 Error with Image' }, component: Errorv3Component},
      {path: 'errorv4', data: { breadcrumb: '500 Error with Image' }, component: Errorv4Component},
    ]
  },
  {path: 'apex-charts', component: ApexChartsComponent},
  {path: 'chartjs', component: ChartjsComponent},
  {path: 'maps', component: MapsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
