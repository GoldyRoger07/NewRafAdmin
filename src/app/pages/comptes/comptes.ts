import { CommonModule } from '@angular/common';
import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { SelectModule } from 'primeng/select';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { Compte } from '../../models/Compte';
import { CompteService } from '../../services/compte-service';

interface Column {
    field: string;
    header: string;
    customExportHeader?: string;
}

interface ExportColumn {
    title: string;
    dataKey: string;
}

interface TransactionDetails{
    header: string;
    type: string;
    montant: number;
    montantPromo: number;
    points: number;
}

@Component({
  selector: 'app-comptes',
  imports: [
        CommonModule,
        TableModule,
        FormsModule,
        ButtonModule,
        RippleModule,
        ToastModule,
        ToolbarModule,
        RatingModule,
        InputTextModule,
        TextareaModule,
        SelectModule,
        RadioButtonModule,
        InputNumberModule,
        DialogModule,
        TagModule,
        InputIconModule,
        IconFieldModule,
        ConfirmDialogModule
    ],
  template: `
    <p-toolbar styleClass="mb-6">
            <ng-template #start>
                <p-button label="New" icon="pi pi-plus" severity="secondary" class="mr-2" (onClick)="openNew()" />
                <p-button label="Deposit" severity="secondary" class="mr-2" (onClick)="openDeposit()" [disabled]="!selectedComptes || !selectedComptes.length || selectedComptes.length > 1"/>
                <p-button label="Widthdraw" severity="secondary" class="mr-2" (onClick)="openWidthdraw()" [disabled]="!selectedComptes || !selectedComptes.length || selectedComptes.length > 1"/>
                <p-button severity="secondary" label="Delete" icon="pi pi-trash" outlined (onClick)="deleteSelectedComptes()" [disabled]="!selectedComptes || !selectedComptes.length" />
            </ng-template>

            <ng-template #end>
                <p-button label="Export" icon="pi pi-upload" severity="secondary" (onClick)="exportCSV()" />
            </ng-template>
        </p-toolbar>

        <p-table
            #dt
            [value]="comptes()"
            [rows]="10"
            [columns]="cols"
            [paginator]="true"
            [globalFilterFields]="['username', 'nom', 'prenom', 'actif']"
            [tableStyle]="{ 'min-width': '75rem' }"
            [(selection)]="selectedComptes"
            [rowHover]="true"
            dataKey="idCompte"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} comptes"
            [showCurrentPageReport]="true"
            [rowsPerPageOptions]="[10, 20, 30]"
        >
            <ng-template #caption>
                <div class="flex items-center justify-between">
                    <h5 class="m-0">Manage Comptes</h5>
                    <p-iconfield>
                        <p-inputicon class="pi pi-search" />
                        <input pInputText type="text" (input)="onGlobalFilter(dt, $event)" placeholder="Search..." />
                    </p-iconfield>
                </div>
            </ng-template>
            <ng-template #header>
                <tr>
                    <th style="width: 3rem">
                        <p-tableHeaderCheckbox />
                    </th>
                    <th style="min-width: 7rem">ID</th>
                    <th pSortableColumn="nom" style="min-width:12rem">
                        Nom
                        <p-sortIcon field="nom" />
                    </th>
                    <th pSortableColumn="prenom" style="min-width:12rem">
                        Prenom
                        <p-sortIcon field="prenom" />
                    </th>
                    <th pSortableColumn="username" style="min-width: 8rem">
                        Username
                        <p-sortIcon field="username" />
                    </th>
                    <th  style="min-width:8rem">
                        Telephone
                    
                    </th>
                    <th pSortableColumn="actif" style="min-width: 8rem">
                        Actif
                        <p-sortIcon field="actif" />
                    </th>
                    <th pSortableColumn="solde" style="min-width: 12rem">
                        Solde
                        <p-sortIcon field="solde" />
                    </th>
                    <th pSortableColumn="soldePromo" style="min-width: 12rem">
                        Solde Promo
                        <p-sortIcon field="soldePromo" />
                    </th>
                    <th pSortableColumn="points" style="min-width: 12rem">
                        Points
                        <p-sortIcon field="points" />
                    </th>
                    <th style="min-width: 10rem">Actions</th>
                </tr>
            </ng-template>
            <ng-template #body let-compte>
                <tr>
                    <td style="width: 3rem">
                        <p-tableCheckbox [value]="compte" />
                    </td>
                    <td style="min-width: 7rem">{{ compte.idCompte }}</td>
                    <td style="min-width: 12rem">{{ compte.nom }}</td>
                    <td style="min-width: 12rem">
                        <!-- <img [src]="'https://primefaces.org/cdn/primeng/images/demo/product/' + product.image" [alt]="product.name" style="width: 64px" class="rounded" /> -->
                        {{compte.prenom}}
                    </td>
                    <td style="min-width: 8rem">{{ compte.username }}</td>
                    <td style="min-width: 8rem">{{ compte.telephone }}</td>
                    <!-- <td>

                        <p-rating [(ngModel)]="product.rating" [readonly]="true" />
                    </td> -->
                    <td style="min-width: 8rem">
                        <p-tag [value]="compte.actif?'OUI':'NON'" [severity]="getSeverity(compte.actif)" />
                    </td>
                    <td style="min-width: 12rem">
                        {{compte.solde | currency: 'HTG '}}
                    </td>
                    <td style="min-width: 12rem">
                        {{compte.soldePromo | currency: 'HTG '}}
                    </td>
                    <td style="min-width: 12rem">
                        {{compte.points+' pts'}}
                    </td>
                    <td style="min-width: 10rem">
                        <p-button icon="pi pi-pencil" class="mr-2" [rounded]="true" [outlined]="true" (click)="editCompte(compte)" />
                        <p-button icon="pi pi-trash" severity="danger" [rounded]="true" [outlined]="true" (click)="deleteCompte(compte)" />
                    </td>
                </tr>
            </ng-template>
        </p-table>

        <p-dialog [(visible)]="compteDialog" [style]="{ width: '450px' }" header="Compte Details" [modal]="true">
            <ng-template #content>
                <div class="flex flex-col gap-6">
                    <!-- <img [src]="'https://primefaces.org/cdn/primeng/images/demo/product/' + product.image" [alt]="product.image" class="block m-auto pb-4" *ngIf="product.image" /> -->
                    <div class="flex gap-2 items-center">
                            <div class="w-full">
                                <label for="nom" class="block font-bold mb-3">Nom</label>
                                <input type="text" pInputText id="nom" [(ngModel)]="compte.nom" required autofocus fluid />
                                <small class="text-red-500" *ngIf="submitted && !compte.nom">Nom is required.</small>
                            </div>
                            <div class="w-full">
                                <label for="prenom" class="block font-bold mb-3">Prenom</label>
                                <input type="text" pInputText id="prenom" [(ngModel)]="compte.prenom" required autofocus fluid />
                                <small class="text-red-500" *ngIf="submitted && !compte.prenom">Prenom is required.</small>
                            </div>
                    </div>

                    <div>
                        <label for="username" class="block font-bold mb-3">Username</label>
                        <input type="text" pInputText id="username" [(ngModel)]="compte.username" required autofocus fluid />
                        <small class="text-red-500" *ngIf="submitted && !compte.prenom">Username is required.</small>
                    </div>

                    <div>
                        <label for="email" class="block font-bold mb-3">Email</label>
                        <input type="email" pInputText id="email" [(ngModel)]="compte.email" required autofocus fluid />
                        <small class="text-red-500" *ngIf="submitted && !compte.email">Email is required.</small>
                    </div>

                    <div>
                        <label for="telephone" class="block font-bold mb-3">Telephone</label>
                        <p-inputnumber id="telephone" [(ngModel)]="compte.telephone"  fluid />
                        <small class="text-red-500" *ngIf="submitted && !compte.telephone">Telephone is required.</small>
                    </div>

                    <div>
                        <label for="actif" class="block font-bold mb-3">Actif</label>
                        <p-select [(ngModel)]="compte.actif" inputId="actif" [options]="etatsCompte" optionLabel="label" optionValue="value" placeholder="Select a Status" fluid />
                    </div>

                    <div>
                        <label for="idConnection" class="block font-bold mb-3">ID Connection</label>
                        <p-select [(ngModel)]="compte.idConnection" inputId="idConnection" [options]="idConnections" optionLabel="label" optionValue="value" placeholder="Select a connection Status" fluid />
                    </div>

                    <div>
                        <label for="role" class="block font-bold mb-3">Role</label>
                        <p-select [(ngModel)]="compte.role" inputId="role" [options]="rolesCompte" optionLabel="label" optionValue="value" placeholder="Select a Role" fluid />
                    </div>

                    <div>
                        <label for="avatar" class="block font-bold mb-3">Avatar</label>
                        <input type="text" pInputText id="avatar" [(ngModel)]="compte.urlPhotoProfile" required autofocus fluid />
                        <small class="text-red-500" *ngIf="submitted && !compte.urlPhotoProfile">Avatar is required.</small>
                    </div>

                    <!-- <div>
                        <span class="block font-bold mb-4">Category</span>
                        <div class="grid grid-cols-12 gap-4">
                            <div class="flex items-center gap-2 col-span-6">
                                <p-radiobutton id="category1" name="category" value="Accessories" [(ngModel)]="product.category" />
                                <label for="category1">Accessories</label>
                            </div>
                            <div class="flex items-center gap-2 col-span-6">
                                <p-radiobutton id="category2" name="category" value="Clothing" [(ngModel)]="product.category" />
                                <label for="category2">Clothing</label>
                            </div>
                            <div class="flex items-center gap-2 col-span-6">
                                <p-radiobutton id="category3" name="category" value="Electronics" [(ngModel)]="product.category" />
                                <label for="category3">Electronics</label>
                            </div>
                            <div class="flex items-center gap-2 col-span-6">
                                <p-radiobutton id="category4" name="category" value="Fitness" [(ngModel)]="product.category" />
                                <label for="category4">Fitness</label>
                            </div>
                        </div>
                    </div> -->

                    <!-- <div class="grid grid-cols-12 gap-4">
                        <div class="col-span-6">
                            <label for="price" class="block font-bold mb-3">Price</label>
                            <p-inputnumber id="price" [(ngModel)]="product.price" mode="currency" currency="USD" locale="en-US" fluid />
                        </div>
                        <div class="col-span-6">
                            <label for="quantity" class="block font-bold mb-3">Quantity</label>
                            <p-inputnumber id="quantity" [(ngModel)]="product.quantity" fluid />
                        </div>
                    </div> -->
                </div>
            </ng-template>

            <ng-template #footer>
                <p-button label="Cancel" icon="pi pi-times" text (click)="hideDialog()" />
                <p-button label="Save" icon="pi pi-check" (click)="saveCompte()" />
            </ng-template>
        </p-dialog>

        <p-dialog [(visible)]="transactionsDialog" [style]="{ width: '450px' }" [header]="transactionDetails.header" [modal]="true">
            <ng-template #content>
                <div class="flex flex-col gap-6">
                    <!-- <img [src]="'https://primefaces.org/cdn/primeng/images/demo/product/' + product.image" [alt]="product.image" class="block m-auto pb-4" *ngIf="product.image" /> -->
                    <div class="flex flex-col gap-2">
                        <span class="text-[12px] text-gray-500">Nom Complet (username)</span>
                        <span class="text-2xl text-gray-700">{{compte.nom+' '+compte.prenom}} ({{compte.username}})</span>
                    </div>

                    <div class="flex items-center gap-2">
                        <div class="flex flex-col gap-2 w-full">
                            <span class="text-[12px] text-gray-500">Solde</span>
                            <span class=" text-2xl text-gray-700">
                                {{calculTransaction((compte.solde || 0),transactionDetails.montant,transactionDetails.type)}} HTG
                            </span>
                        </div>

                        <div class="flex flex-col gap-2 w-full">
                            <span class="text-[12px] text-gray-500">Solde Promo</span>
                            <span class="text-2xl text-gray-700">
                                {{calculTransaction((compte.soldePromo || 0),transactionDetails.montantPromo,transactionDetails.type)}} HTG
                            </span>
                        </div>
                    </div>

                    <div class="flex flex-col gap-2">
                        <span class="text-[12px] text-gray-500">Points</span>
                        <span class="text-2xl text-gray-700">
                            {{calculTransaction((compte.points || 0),transactionDetails.points,transactionDetails.type)}} pts
                        </span>
                    </div>

                    <div class="flex items-center gap-2">
                            <div class="w-full">
                                <label for="montant" class="block font-bold mb-3">Montant</label>
                                <p-inputnumber id="montant" [(ngModel)]="transactionDetails.montant" fluid />
                                <small class="text-red-500" *ngIf="submitted && !transactionDetails.montant">Montant is required.</small>
                            </div>

                            <div class="w-full">
                                <label for="montantPromo" class="block font-bold mb-3">Montant Promo</label>
                                <p-inputnumber id="montantPromo" [(ngModel)]="transactionDetails.montantPromo"  fluid />
                                <small class="text-red-500" *ngIf="submitted && !transactionDetails.montantPromo">Montant Promo is required.</small>
                            </div>
                    </div>

                    <div>
                        <label for="pointsTransaction" class="block font-bold mb-3">Points</label>
                        <p-inputnumber id="pointsTransaction" [(ngModel)]="transactionDetails.points"  fluid />
                        <small class="text-red-500" *ngIf="submitted && !transactionDetails.points">Points is required.</small>
                    </div>

                    
                </div>
            </ng-template>

            <ng-template #footer>
                <p-button label="Cancel" icon="pi pi-times" text (click)="closeTransactionsDialog()" />
                <p-button label="Save" icon="pi pi-check" (click)="saveCompte()" />
            </ng-template>
        </p-dialog>

        <p-confirmdialog [style]="{ width: '450px' }" />
    
  `,
  providers: [MessageService, ConfirmationService]
})
export class Comptes implements OnInit{
    compteDialog: boolean = false;

    transactionsDialog: boolean = false

    comptes = signal<Compte[]>([]);

    compte!: Compte;

    selectedComptes!: Compte[] | null;

    submitted: boolean = false;

    etatsCompte!: any[];

    rolesCompte!: any[];

    idConnections!: any[];

    @ViewChild('dt') dt!: Table;

    exportColumns!: ExportColumn[];

    cols!: Column[];

    transactionDetails: TransactionDetails = {
        header: 'Make A Deposit',
        type: 'depot',
        montant: 0,
        montantPromo: 0,
        points: 0
    }

    constructor(
        private compteService: CompteService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    exportCSV() {
        this.dt.exportCSV();
    }

    ngOnInit() {
        this.loadDemoData();
    }

    loadDemoData() {
        this.compteService.getComptes().then((data: Compte[]) => {
            this.comptes.set(data);
        });

        this.etatsCompte = [
            { label: 'OUI', value: true },
            { label: 'NON', value: false },
            
        ];

        this.rolesCompte = [
            { label: 'Admin', value: 'ADMIN' },
            { label: 'User', value: 'USER' },
            { label: 'Agent', value: 'AGENT' }
        ]

        this.idConnections = [
            { label: 'Deconnected', value: 'NO_CONNECTION'},
        ]

        if(this.compte && this.compte.idConnection){
            if(this.compte.idConnection!=='NO_CONNECTION')
                this.idConnections.push({label: this.compte.idConnection, value: this.compte.idConnection})
        }
            

        this.cols = [
            { field: 'idCompte', header: 'ID' },
            { field: 'username', header: 'Username' },
            { field: 'email', header: 'Email' },
            { field: 'nom', header: 'Nom' },
            { field: 'prenom', header: 'Prenom' },
            { field: 'telephone', header: 'Telephone' },
            { field: 'urlPhotoProfile', header: 'Avatar' },
            { field: 'solde', header: 'Solde' },
            { field: 'soldePromo', header: 'Solde Promo' },
            { field: 'points', header: 'Points' },
            { field: 'codePromo', header: 'Code Promo' },
            { field: 'role', header: 'Role' },
            { field: 'actif', header: 'Actif' },
            { field: 'idAgent', header: 'ID Agent' },
            { field: 'idConnection', header: 'ID Connection' }
        ];

        this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
    }

    calculTransaction(solde:number,montant:number,type:string){
        if(type === 'depot')
            return solde + montant

        let result = solde - montant

        return result>=0?result:solde
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    openNew() {
        this.compte = {};
        this.submitted = false;
        this.compteDialog = true;
    }

    openDeposit(){
        this.compte = this.selectedComptes?this.selectedComptes[0]:{}
        this.transactionDetails.header = 'Make A Deposit'
        this.transactionDetails.type = 'depot'
        this.transactionsDialog = true
        
    }

    openWidthdraw(){
        this.compte = this.selectedComptes?this.selectedComptes[0]:{}
        this.transactionDetails.header = 'Make A Widthdraw'
        this.transactionDetails.type = 'retrait'
        this.transactionsDialog = true
    }

    closeTransactionsDialog(){
        this.transactionDetails.montant = 0
        this.transactionDetails.montantPromo = 0
        this.transactionDetails.points = 0
        this.transactionsDialog = false

    }

    editCompte(compte: Compte) {
        this.compte = { ...compte };
        if(this.compte && this.compte.idConnection){
            if(this.compte.idConnection!=='NO_CONNECTION')
                this.idConnections.push({label: this.compte.idConnection, value: this.compte.idConnection})
        }
        this.compteDialog = true;
    }

    deleteSelectedComptes() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected products?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.comptes.set(this.comptes().filter((val: any) => !this.selectedComptes?.includes(val)));
                this.selectedComptes = null;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Comptes Deleted',
                    life: 3000
                });
            }
        });
    }

    hideDialog() {
        this.compteDialog = false;
        this.submitted = false;
        this.idConnections = [
            { label: 'Deconnected', value: 'NO_CONNECTION'},
        ]
    }

    deleteCompte(compte: Compte) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + compte.username + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.comptes.set(this.comptes().filter((val) => val.idCompte !== compte.idCompte));
                this.compte = {};
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Compte Deleted',
                    life: 3000
                });
            }
        });
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.comptes().length; i++) {
            if (this.comptes()[i].idCompte === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    getSeverity(actif: boolean) {
        // switch (status) {
        //     case 'INSTOCK':
        //         return 'success';
        //     case 'LOWSTOCK':
        //         return 'warn';
        //     case 'OUTOFSTOCK':
        //         return 'danger';
        //     default:
        //         return 'info';
        // }

        return actif?'success':'danger'
          
    }

    saveCompte() {
        this.submitted = true;
        let _comptes = this.comptes();
        if (this.compte.username?.trim()) {
            if (this.compte.idCompte) {
                _comptes[this.findIndexById(this.compte.idCompte)] = this.compte;
                this.comptes.set([..._comptes]);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Compte Updated',
                    life: 3000
                });
            } else {
                this.compte.idCompte = this.createId();
                this.compte.urlPhotoProfile = 'product-placeholder.svg';
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Compte Created',
                    life: 3000
                });
                this.comptes.set([..._comptes, this.compte]);
            }

            this.compteDialog = false;
            this.compte = {};
        }
    }
}
