import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { PermissionsService } from '../services/permissions.service';

@Directive({
    selector: '[ifHasPermission]',
    standalone: true
})
export class HasPermissionDirective implements OnInit {
    @Input('ifHasPermission') config: string | string[] | { permisos: string[], grupoId: string } = '';

    constructor(
        private permissionsSvc: PermissionsService,
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef
    ) {}

    ngOnInit() {
        let permisosArray: string[];
        let grupoId: string | null = null;
    
        if (typeof this.config === 'object' && !Array.isArray(this.config)) {
            permisosArray = this.config.permisos;
            grupoId = this.config.grupoId;
        } else {
            permisosArray = Array.isArray(this.config) ? this.config : [this.config];
        }
    
        if (grupoId) {
            this.permissionsSvc.hasAnyGroupPermission(grupoId, permisosArray)
                .subscribe(tiene => {
                    if (tiene) this.viewContainer.createEmbeddedView(this.templateRef);
                });
        } else {
            if (this.permissionsSvc.hasAnyPermission(permisosArray)) {
                this.viewContainer.createEmbeddedView(this.templateRef);
            }
        }
    }
}