import { Routes } from '@angular/router';
import { LayerComponent } from './layout/layer/layer.component';
import { AbcdGridComponent } from './generic-components/abcd-grid/abcd-grid.component';
import { ChartComponent } from './pages/chart/chart.component';
import { AppComponent } from './app.component';
import { GridComponent } from './pages/grid/grid.component';
import { NotificationComponent } from './pages/notification/notification.component';
import { OpenLayerComponent } from './pages/open-layer/open-layer.component';
import { LoginComponent } from './pages/login/login.component';
import { CanActivate } from './guards/canActivate';
import { WidgetsComponent } from './pages/widgets/widgets.component';
import { TreeComponent } from './pages/tree/tree.component';
import { InspectionComponent } from './pages/inspection/inspection.component';

export const routes: Routes = [

    { path: 'login', component: LoginComponent },
    {
        path: '', component: LayerComponent,
        canActivate: [CanActivate],
        children: [
            { path: 'chart', component: ChartComponent },
            { path: 'grid', component: GridComponent },
            { path: 'notification', component: NotificationComponent },
            { path: 'map', component: OpenLayerComponent },
            { path: 'widgets', component: WidgetsComponent },
            { path: 'tree', component: TreeComponent },
            { path: 'ins', component: InspectionComponent }
        ]
    },
    { path: '**', component: LoginComponent },

];
