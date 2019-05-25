import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { serviceSuppliesRoute } from './service-supplies.route';
import { ServiceSuppliesComponent } from './service-supplies.component';

@NgModule (
    {
        imports: [RouterModule.forChild(serviceSuppliesRoute)],
        declarations: [
            ServiceSuppliesComponent
        ]

    }
)
export class ServiceSuppliesModule {
    constructor() {}
}
