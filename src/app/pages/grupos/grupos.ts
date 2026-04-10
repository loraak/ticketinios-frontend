import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router'; 
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { TextareaModule } from 'primeng/textarea';
import { TagModule } from 'primeng/tag';
import { ChartModule } from 'primeng/chart';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DividerModule } from 'primeng/divider';
import { MessageService, ConfirmationService } from 'primeng/api';

import { AuthService } from '../../services/auth.service';
import { PermissionsService } from '../../services/permissions.service'; 
import { HasPermissionDirective } from '../../directives/has-permission.directive'; 
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core'

interface Group {
    id: number;
    autor: string;
    nombre: string;
    integrantes: number;
    tickets: number;
    activo: boolean;
}

@Component({
    selector: 'app-grupos',
    standalone: true,
    imports: [
        CommonModule, FormsModule, ReactiveFormsModule,
        TableModule, CardModule, ButtonModule, DialogModule,
        InputTextModule, InputNumberModule, TextareaModule,
        TagModule, ToastModule, ConfirmDialogModule,
        FloatLabelModule, DividerModule, ChartModule,
        HasPermissionDirective
    ],
    providers: [MessageService, ConfirmationService],
    templateUrl: './grupos.html',
    styleUrl: './grupos.css'
})

export class Grupos implements OnInit {
    private cdr = inject(ChangeDetectorRef);
    protected authService = inject(AuthService);
    protected permissionsSvc = inject(PermissionsService); 
    protected router = inject(Router); 
    private http = inject(HttpClient);
    private messageService = inject(MessageService);
    private confirmationService = inject(ConfirmationService);

    grupos: Group[] = [];
    loading = false; 

    // las gráficas
    estadisticas: any = null;
    chartEstado: any = null;
    chartPrioridad: any = null;
    chartOptions = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1,
                    precision: 0   
                }
            }
        }
    };

    objectEntries(obj: any): [string, number][] {
        return obj ? Object.entries(obj) : [];
    }

    private coloresEstado = ['#4CAF50', '#2196F3', '#FF9800', '#F44336', '#9C27B0'];
    private coloresPrioridad = ['#4CAF50', '#FF9800', '#F44336'];


    cargarEstadisticas() {
        this.http.get<any>('http://localhost:3000/api/tickets/estadisticas').subscribe({
            next: (res) => {
                const stats = res.data[0];
                this.estadisticas = stats;

                const estadoLabels = Object.keys(stats.porEstado);
                const estadoValues = Object.values(stats.porEstado);

                const prioridadLabels = Object.keys(stats.porPrioridad);
                const prioridadValues = Object.values(stats.porPrioridad);

                this.chartEstado = {
                    labels: estadoLabels,
                    datasets: [{
                        label: 'Tickets por estado',
                        data: estadoValues,
                        backgroundColor: this.coloresEstado.slice(0, estadoLabels.length),
                    }]
                };

                this.chartPrioridad = {
                    labels: prioridadLabels,
                    datasets: [{
                        label: 'Tickets por prioridad',
                        data: prioridadValues,
                        backgroundColor: this.coloresPrioridad.slice(0, prioridadLabels.length),
                    }]
                };

                this.cdr.detectChanges(); // <-- agrega esto al final
            },
            error: () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'No se pudieron cargar las estadísticas.'
                });
            }
        });
    }

    ngOnInit() {
        this.cargarGrupos();
        this.cargarEstadisticas();
    }


    cargarGrupos() { 
        this.loading = true;
        this.http.get<any>('http://localhost:3000/api/grupos').subscribe({
            next: (res) => {
                this.grupos = res.data;
                this.loading = false;
                this.cdr.detectChanges();
            },
            error: () => {
                this.loading = false;
                this.cdr.detectChanges();
            }
        });
    }

    modalVisible = false;
    modoEdicion = false;
    grupoSeleccionado: Group | null = null;
    form: FormGroup;

    constructor(
        private fb: FormBuilder,
    ) {
        this.form = this.fb.group({
            creador:       ['', Validators.required],
            nombre:      ['', Validators.required],
            integrantes: [null, Validators.required],
            descripcion: ['', Validators.required]
        });
    }

    abrirModalNuevo() {
        this.modoEdicion = false;
        this.form.reset();
        this.modalVisible = true;
    }

    abrirModalEditar(grupo: Group) {
        this.modoEdicion = true;
        this.grupoSeleccionado = grupo;
        this.form.patchValue(grupo);    
        this.modalVisible = true;
    }

    guardar() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }
    
        if (this.modoEdicion && this.grupoSeleccionado) {
            this.http.put<any>(
                `http://localhost:3000/api/grupos/${this.grupoSeleccionado.id}`,
                this.form.value
            ).subscribe({
                next: (res) => {
                    const actualizado = res.data[0];
                    this.grupos = this.grupos.map(g =>
                        g.id === actualizado.id ? actualizado : g
                    );
                    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Grupo actualizado.' });
                    this.modalVisible = false;
                },
                error: (err) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: err.error?.data?.[0]?.message || 'Error inesperado.'
                    });
                }
            });
        } else {
            this.http.post<any>('http://localhost:3000/api/grupos', {
                ...this.form.value,
                creadorId:     this.authService.usuario()?.sub,
                creadorNombre: this.authService.usuario()?.nombreCompleto
            }).subscribe({
                next: (res) => {
                    this.grupos = [...this.grupos, res.data[0]];
                    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Grupo creado.' });
                    this.modalVisible = false;
                },
                error: (err) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: err.error?.data?.[0]?.message || 'Error inesperado.'
                    });
                }
            });
        }
    }

    ingresarGrupo(grupoId: string) { 
        this.router.navigate(['/app/groupDetails', grupoId]); 
    }
    
    confirmarBaja(grupo: Group) {
        this.confirmationService.confirm({
            message: `¿Dar de baja al grupo "${grupo.nombre}"?`,
            header: 'Confirmar Baja',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sí, dar de baja',
            rejectLabel: 'Cancelar',
            acceptButtonProps: { severity: 'danger' },
            rejectButtonProps: { severity: 'secondary', text: true },
            accept: () => {
                const idx = this.grupos.findIndex(g => g.id === grupo.id);
                this.grupos[idx] = { ...this.grupos[idx], activo: false };
                this.grupos = [...this.grupos];
                this.messageService.add({ severity: 'warn', summary: 'Baja', detail: `Grupo "${grupo.nombre}" dado de baja.` });
            }
        });
    }
}