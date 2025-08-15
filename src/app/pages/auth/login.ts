import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { AppFloatingConfigurator } from '../../layout/component/app.floatingconfigurator';
import { MessageService } from 'primeng/api';
import { CompteService } from '../../services/compte-service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ToastModule, ButtonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, ReactiveFormsModule, RouterModule, RippleModule, AppFloatingConfigurator],
    template: `
        <p-toast />
        <app-floating-configurator />
        <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-screen overflow-hidden">
            <div class="flex flex-col items-center justify-center">
                <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                    <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20" style="border-radius: 53px">
                        <div class="text-center mb-8">
                            <img src="logo.svg" alt="logo" class="w-[200px] mx-auto">
                            <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">Welcome to Raf Admin Dashboard!</div>
                            <span class="text-muted-color font-medium">Sign in to continue</span>
                        </div>

                        <form [formGroup]="formGroup" (submit)="onSubmit()">
                            <label for="email1" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Email</label>
                            <input pInputText id="email1" formControlName="email" type="text" placeholder="Email address" class="w-full md:w-120 mb-8"  />

                            <label for="password1" class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">Password</label>
                            <p-password id="password1" formControlName="password" placeholder="Password" [toggleMask]="true" styleClass="mb-4" [fluid]="true" [feedback]="false"></p-password>

                            <div class="flex items-center justify-between mt-2 mb-8 gap-8">
                                <div class="flex items-center">
                                    <p-checkbox id="rememberme1" formControlName="rememberMe" binary class="mr-2"></p-checkbox>
                                    <label for="rememberme1">Remember me</label>
                                </div>
                                <span class="font-medium no-underline ml-2 text-right cursor-pointer text-primary">Forgot password?</span>
                            </div>
                            <p-button label="Sign In" styleClass="w-full" type="submit" [loading]="loading"></p-button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `,
    providers: [MessageService]
})
export class Login {

    loading: boolean = false;

    constructor(private messageService: MessageService, private compteService: CompteService, private router: Router){}

    formGroup = new FormGroup({
        email: new FormControl('',[Validators.required]),
        password: new FormControl('',[Validators.required]),
        rememberMe: new FormControl(true,[Validators.required])
    })



    onSubmit(){
        if(!this.formGroup.invalid){
            this.loading = true
        
            const formValue = this.formGroup.value
            
            this.compteService.login(formValue.email as string,formValue.password as string,formValue.rememberMe as boolean)
            .subscribe({
                next:()=>{
                    this.router.navigate([''])
                    // this.showToast('success','','Invalid Informations Have submitted')
                },error:()=>{
                    this.showToast('error','Error Message','Invalid Informations Have submitted')
                }
            })
            
        }  
    }

    showToast(severity: string, summary: string, detail: string) {
        this.messageService.add({ severity: severity, summary: summary, detail: detail });
    }
}
