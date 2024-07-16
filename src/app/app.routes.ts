import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'admin',
        loadChildren:()=> import('./admin/admin/admin.routes').then(m=> m.ADMIN_ROUTES)
    }
];
