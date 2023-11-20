import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layouts/header/header.component';
import { SidebarComponent } from './components/layouts/sidebar/sidebar.component';
import { FooterComponent } from './components/layouts/footer/footer.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard/dashboard.component';
import { AnalyticsComponent } from './components/pages/dashboard/analytics/analytics.component';
import { EcommerceComponent } from './components/pages/dashboard/ecommerce/ecommerce.component';
import { AppChatComponent } from './components/pages/app-chat/app-chat.component';
import { AppTodoComponent } from './components/pages/app-todo/app-todo.component';
import { AppCalendarComponent } from './components/pages/app-calendar/app-calendar.component';
import { TimelineComponent } from './components/pages/timeline/timeline.component';
import { GalleryComponent } from './components/pages/gallery/gallery.component';
import { FaqComponent } from './components/pages/faq/faq.component';
import { InvoiceComponent } from './components/pages/invoice/invoice.component';
import { BlankPageComponent } from './components/pages/blank-page/blank-page.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { GridComponent } from './components/pages/grid/grid.component';
import { ColorsComponent } from './components/pages/colors/colors.component';
import { BoxiconsComponent } from './components/pages/icons/boxicons/boxicons.component';
import { FeathericonsComponent } from './components/pages/icons/feathericons/feathericons.component';
import { IconsComponent } from './components/pages/icons/icons/icons.component';
import { CardComponent } from './components/pages/card/card/card.component';
import { BasicCardComponent } from './components/pages/card/basic-card/basic-card.component';
import { ColorsCardComponent } from './components/pages/card/colors-card/colors-card.component';
import { StatisticsCardComponent } from './components/pages/card/statistics-card/statistics-card.component';
import { FormComponent } from './components/pages/forms/form/form.component';
import { FormLayoutComponent } from './components/pages/forms/form-layout/form-layout.component';
import { FormInputGroupComponent } from './components/pages/forms/form-input-group/form-input-group.component';
import { TableComponent } from './components/pages/table/table/table.component';
import { TableLightComponent } from './components/pages/table/table-light/table-light.component';
import { TableDarkComponent } from './components/pages/table/table-dark/table-dark.component';
import { AuthenticationComponent } from './components/pages/authentication/authentication/authentication.component';
import { LoginComponent } from './components/pages/authentication/login/login.component';
import { LoginWithImageComponent } from './components/pages/authentication/login-with-image/login-with-image.component';
import { RegisterComponent } from './components/pages/authentication/register/register.component';
import { RegisterWithImageComponent } from './components/pages/authentication/register-with-image/register-with-image.component';
import { ForgotPasswordComponent } from './components/pages/authentication/forgot-password/forgot-password.component';
import { ForgotPasswordWithImageComponent } from './components/pages/authentication/forgot-password-with-image/forgot-password-with-image.component';
import { ResetPasswordComponent } from './components/pages/authentication/reset-password/reset-password.component';
import { ResetPasswordWithImageComponent } from './components/pages/authentication/reset-password-with-image/reset-password-with-image.component';
import { SessionLockScreenComponent } from './components/pages/authentication/session-lock-screen/session-lock-screen.component';
import { SessionLockScreenWithImageComponent } from './components/pages/authentication/session-lock-screen-with-image/session-lock-screen-with-image.component';
import { NotAuthorizedComponent } from './components/pages/miscellaneous/not-authorized/not-authorized.component';
import { NotAuthorizedWithImageComponent } from './components/pages/miscellaneous/not-authorized-with-image/not-authorized-with-image.component';
import { MaintenanceComponent } from './components/pages/miscellaneous/maintenance/maintenance.component';
import { MaintenanceWithImageComponent } from './components/pages/miscellaneous/maintenance-with-image/maintenance-with-image.component';
import { ComingSoonComponent } from './components/pages/miscellaneous/coming-soon/coming-soon.component';
import { ComingSoonWithImageComponent } from './components/pages/miscellaneous/coming-soon-with-image/coming-soon-with-image.component';
import { MiscellaneousComponent } from './components/pages/miscellaneous/miscellaneous/miscellaneous.component';
import { ErrorComponent } from './components/pages/error/error/error.component';
import { Errorv1Component } from './components/pages/error/errorv1/errorv1.component';
import { Errorv2Component } from './components/pages/error/errorv2/errorv2.component';
import { Errorv3Component } from './components/pages/error/errorv3/errorv3.component';
import { Errorv4Component } from './components/pages/error/errorv4/errorv4.component';
import { MapsComponent } from './components/pages/maps/maps.component';
import { WebAnalyticsComponent } from './components/charts/web-analytics/web-analytics.component';
import { EmailSendComponent } from './components/charts/email-send/email-send.component';
import { ActivityTimelineComponent } from './components/charts/activity-timeline/activity-timeline.component';
import { TrafficSourceComponent } from './components/charts/traffic-source/traffic-source.component';
import { RevenueSummaryComponent } from './components/charts/revenue-summary/revenue-summary.component';
import { ClientRecollectionComponent } from './components/charts/client-recollection/client-recollection.component';
import { RevenueGrowthComponent } from './components/charts/revenue-growth/revenue-growth.component';
import { ApexChartsComponent } from './components/pages/apex-charts/apex-charts.component';
import { BasicLineChartComponent } from './components/charts/basic-line-chart/basic-line-chart.component';
import { LineWithDataLabelsComponent } from './components/charts/line-with-data-labels/line-with-data-labels.component';
import { AnnotationsLineComponent } from './components/charts/annotations-line/annotations-line.component';
import { GradientLineComponent } from './components/charts/gradient-line/gradient-line.component';
import { DashedLineComponent } from './components/charts/dashed-line/dashed-line.component';
import { ZoomableLineTimeseriesComponent } from './components/charts/zoomable-line-timeseries/zoomable-line-timeseries.component';
import { BasicAreaChartComponent } from './components/charts/basic-area-chart/basic-area-chart.component';
import { SplineAreaComponent } from './components/charts/spline-area/spline-area.component';
import { NegativeAreaComponent } from './components/charts/negative-area/negative-area.component';
import { StackedAreaComponent } from './components/charts/stacked-area/stacked-area.component';
import { AreaDatetimeXAxisComponent } from './components/charts/area-datetime-x-axis/area-datetime-x-axis.component';
import { BasicColumnChartComponent } from './components/charts/basic-column-chart/basic-column-chart.component';
import { ColumnWithDataLabelsComponent } from './components/charts/column-with-data-labels/column-with-data-labels.component';
import { StackedColumnsComponent } from './components/charts/stacked-columns/stacked-columns.component';
import { StackedColumnsHundredPercentComponent } from './components/charts/stacked-columns-hundred-percent/stacked-columns-hundred-percent.component';
import { ColumnWithNegativeValuesComponent } from './components/charts/column-with-negative-values/column-with-negative-values.component';
import { DynamicLoadedColumnComponent } from './components/charts/dynamic-loaded-column/dynamic-loaded-column.component';
import { BasicBarChartComponent } from './components/charts/basic-bar-chart/basic-bar-chart.component';
import { GroupedBarComponent } from './components/charts/grouped-bar/grouped-bar.component';
import { StackedBarComponent } from './components/charts/stacked-bar/stacked-bar.component';
import { StackedBarHundredPercentComponent } from './components/charts/stacked-bar-hundred-percent/stacked-bar-hundred-percent.component';
import { BarWithNegativeValuesComponent } from './components/charts/bar-with-negative-values/bar-with-negative-values.component';
import { CustomDatalabelsBarComponent } from './components/charts/custom-datalabels-bar/custom-datalabels-bar.component';
import { MixedLineColumnComponent } from './components/charts/mixed-line-column/mixed-line-column.component';
import { MixedMultipleYAxisComponent } from './components/charts/mixed-multiple-y-axis/mixed-multiple-y-axis.component';
import { MixedLineAndAreaComponent } from './components/charts/mixed-line-and-area/mixed-line-and-area.component';
import { MixedLineColumnAreaComponent } from './components/charts/mixed-line-column-area/mixed-line-column-area.component';
import { SimplePieChartComponent } from './components/charts/simple-pie-chart/simple-pie-chart.component';
import { SimpleDonutChartComponent } from './components/charts/simple-donut-chart/simple-donut-chart.component';
import { MonochromePieComponent } from './components/charts/monochrome-pie/monochrome-pie.component';
import { GradientDonutComponent } from './components/charts/gradient-donut/gradient-donut.component';
import { DonutWithPatternComponent } from './components/charts/donut-with-pattern/donut-with-pattern.component';
import { PieWithImageComponent } from './components/charts/pie-with-image/pie-with-image.component';
import { BasicRadialbarChartComponent } from './components/charts/basic-radialbar-chart/basic-radialbar-chart.component';
import { MultipleRadialbarComponent } from './components/charts/multiple-radialbar/multiple-radialbar.component';
import { RadialbarCustomAngleCircleComponent } from './components/charts/radialbar-custom-angle-circle/radialbar-custom-angle-circle.component';
import { RadialbarGradientCircleComponent } from './components/charts/radialbar-gradient-circle/radialbar-gradient-circle.component';
import { RadialbarStrokedCircularGaugeComponent } from './components/charts/radialbar-stroked-circular-gauge/radialbar-stroked-circular-gauge.component';
import { RadialbarSemiCircularGaugeComponent } from './components/charts/radialbar-semi-circular-gauge/radialbar-semi-circular-gauge.component';
import { RadialbarsWithImageComponent } from './components/charts/radialbars-with-image/radialbars-with-image.component';
import { BasicRadarChartComponent } from './components/charts/basic-radar-chart/basic-radar-chart.component';
import { RadarMultipleSeriesComponent } from './components/charts/radar-multiple-series/radar-multiple-series.component';
import { RadarWithPolygonFillComponent } from './components/charts/radar-with-polygon-fill/radar-with-polygon-fill.component';
import { ChartjsComponent } from './components/pages/chartjs/chartjs.component';
import { BasicBarChartv2Component } from './components/charts/basic-bar-chartv2/basic-bar-chartv2.component';
import { BasicLineChartv2Component } from './components/charts/basic-line-chartv2/basic-line-chartv2.component';
import { BasicPieChartComponent } from './components/charts/basic-pie-chart/basic-pie-chart.component';
import { BasicRadarChartv2Component } from './components/charts/basic-radar-chartv2/basic-radar-chartv2.component';
import { BasicHorizontalBarComponent } from './components/charts/basic-horizontal-bar/basic-horizontal-bar.component';
import { BarWithLineComponent } from './components/charts/bar-with-line/bar-with-line.component';
import { CreateEmployeeEncomiendaComponent } from './components/pages/encomienda-gestion/create-employee-encomienda/create-employee-encomienda.component';
import { ReportsEncomiendaComponent } from './components/pages/encomienda-gestion/reports-encomienda/reports-encomienda.component';
import { EncomiendaGestionComponent } from './components/pages/encomienda-gestion/encomienda-gestion/encomienda-gestion.component';
import { HonorariumTableEncomiendaComponent } from './components/pages/encomienda-gestion/honorarium-table-encomienda/honorarium-table-encomienda.component';
import { BranchExpensesEncomiendaComponent } from './components/pages/branch-expenses-encomienda/branch-expenses-encomienda.component';
import { SpecialExpensesEncomiendaComponent } from './components/pages/special-expenses-encomienda/special-expenses-encomienda.component';
import { MonthlyGoalsEncomiendaComponent } from './components/pages/monthly-goals-encomienda/monthly-goals-encomienda.component';
import { SurplusEncomiendaComponent } from './components/pages/surplus-encomienda/surplus-encomienda.component';
import { SurplusGlobalComponent } from './components/pages/surplus-encomienda/surplus-global/surplus-global.component';
import { SurplusGenericComponent } from './components/pages/surplus-encomienda/surplus-generic/surplus-generic.component';
import { MainService } from './services/main.service';
import { CreateExpenseEncomiendaComponent } from './components/pages/encomienda-gestion/create-expense-encomienda/create-expense-encomienda.component';
import { EncomiendaComponent } from './components/pages/encomienda/encomienda.component';
import { StatusEncomiendaComponent } from './components/pages/encomienda/status-encomienda/status-encomienda.component';
import { SendEncomiendaComponent } from './components/pages/encomienda/send-encomienda/send-encomienda.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PriceEncomiendaComponent } from './components/pages/encomienda/price-encomienda/price-encomienda.component';
import { BranchComponent } from './components/pages/branch/branch/branch.component';
import { NewBranchComponent } from './components/pages/branch/new-branch/new-branch.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RoutesComponent } from './components/pages/routes/routes.component';
import { TransportComponent } from './components/pages/routes/transport/transport.component';
import { OverComponent } from './modals/over/over.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NewRouteComponent } from './components/pages/routes/new-route/new-route.component';
import { CreateHonorariumEncomiendaComponent } from './components/pages/encomienda-gestion/create-honorarium-encomienda/create-honorarium-encomienda.component';
import { CreateRoleComponent } from './components/pages/encomienda-gestion/create-role/create-role.component';
import { CreateRolBranchComponent } from './components/pages/encomienda-gestion/create-rol-branch/create-rol-branch.component';
import { BudgetComponent } from './components/pages/encomienda-gestion/budget/budget.component';
import { ChartComponent } from './components/pages/monthly-goals-encomienda/chart/chart.component';
import { ConfigurationComponent } from './components/pages/configuration/configuration.component';
import { ParamComponent } from './components/pages/configuration/param/param.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    DashboardComponent,
    AnalyticsComponent,
    EcommerceComponent,
    AppChatComponent,
    AppTodoComponent,
    AppCalendarComponent,
    TimelineComponent,
    GalleryComponent,
    FaqComponent,
    InvoiceComponent,
    BlankPageComponent,
    ProfileComponent,
    GridComponent,
    ColorsComponent,
    BoxiconsComponent,
    FeathericonsComponent,
    IconsComponent,
    CardComponent,
    BasicCardComponent,
    ColorsCardComponent,
    StatisticsCardComponent,
    FormComponent,
    FormLayoutComponent,
    FormInputGroupComponent,
    TableComponent,
    TableLightComponent,
    TableDarkComponent,
    AuthenticationComponent,
    LoginComponent,
    LoginWithImageComponent,
    RegisterComponent,
    RegisterWithImageComponent,
    ForgotPasswordComponent,
    ForgotPasswordWithImageComponent,
    ResetPasswordComponent,
    ResetPasswordWithImageComponent,
    SessionLockScreenComponent,
    SessionLockScreenWithImageComponent,
    NotAuthorizedComponent,
    NotAuthorizedWithImageComponent,
    MaintenanceComponent,
    MaintenanceWithImageComponent,
    ComingSoonComponent,
    ComingSoonWithImageComponent,
    MiscellaneousComponent,
    ErrorComponent,
    Errorv1Component,
    Errorv2Component,
    Errorv3Component,
    Errorv4Component,
    MapsComponent,
    WebAnalyticsComponent,
    EmailSendComponent,
    ActivityTimelineComponent,
    TrafficSourceComponent,
    RevenueSummaryComponent,
    ClientRecollectionComponent,
    RevenueGrowthComponent,
    ApexChartsComponent,
    BasicLineChartComponent,
    LineWithDataLabelsComponent,
    AnnotationsLineComponent,
    GradientLineComponent,
    DashedLineComponent,
    ZoomableLineTimeseriesComponent,
    BasicAreaChartComponent,
    SplineAreaComponent,
    NegativeAreaComponent,
    StackedAreaComponent,
    AreaDatetimeXAxisComponent,
    BasicColumnChartComponent,
    ColumnWithDataLabelsComponent,
    StackedColumnsComponent,
    StackedColumnsHundredPercentComponent,
    ColumnWithNegativeValuesComponent,
    DynamicLoadedColumnComponent,
    BasicBarChartComponent,
    GroupedBarComponent,
    StackedBarComponent,
    StackedBarHundredPercentComponent,
    BarWithNegativeValuesComponent,
    CustomDatalabelsBarComponent,
    MixedLineColumnComponent,
    MixedMultipleYAxisComponent,
    MixedLineAndAreaComponent,
    MixedLineColumnAreaComponent,
    SimplePieChartComponent,
    SimpleDonutChartComponent,
    MonochromePieComponent,
    GradientDonutComponent,
    DonutWithPatternComponent,
    PieWithImageComponent,
    BasicRadialbarChartComponent,
    MultipleRadialbarComponent,
    RadialbarCustomAngleCircleComponent,
    RadialbarGradientCircleComponent,
    RadialbarStrokedCircularGaugeComponent,
    RadialbarSemiCircularGaugeComponent,
    RadialbarsWithImageComponent,
    BasicRadarChartComponent,
    RadarMultipleSeriesComponent,
    RadarWithPolygonFillComponent,
    ChartjsComponent,
    BasicBarChartv2Component,
    BasicLineChartv2Component,
    BasicPieChartComponent,
    BasicRadarChartv2Component,
    BasicHorizontalBarComponent,
    BarWithLineComponent,
    CreateEmployeeEncomiendaComponent,
    ReportsEncomiendaComponent,
    EncomiendaGestionComponent,
    HonorariumTableEncomiendaComponent,
    BranchExpensesEncomiendaComponent,
    SpecialExpensesEncomiendaComponent,
    MonthlyGoalsEncomiendaComponent,
    SurplusEncomiendaComponent,
    SurplusGlobalComponent,
    SurplusGenericComponent,
    CreateExpenseEncomiendaComponent,
    EncomiendaComponent,
    StatusEncomiendaComponent,
    SendEncomiendaComponent,
    PriceEncomiendaComponent,
    BranchComponent,
    NewBranchComponent,
    RoutesComponent,
    TransportComponent,
    OverComponent,
    NewRouteComponent,
    CreateHonorariumEncomiendaComponent,
    CreateRoleComponent,
    CreateRolBranchComponent,
    BudgetComponent,
    ChartComponent,
    ConfigurationComponent,
    ParamComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [MainService],
  bootstrap: [AppComponent]
})
export class AppModule { }
