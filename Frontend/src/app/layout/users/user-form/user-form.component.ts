import { ChangeDetectionStrategy, Component, Inject, inject, Injector } from '@angular/core';
import { NgUIModule } from '../../../shared/ng-ui.module';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { v4 as uuidv4, validate } from 'uuid';
import { HotToastService } from '@ngxpert/hot-toast';
import { User, UserRole } from '../../../core/models/user';
import { UserService } from '../../../core/services/user.service';
import { hotToastObserve } from '../../../core/utils/toast-observer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  standalone: false,
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent {
  readonly dialog = inject(MatDialog);
  userForm: FormGroup;
  hidePassword = false;
  users: User[] = [];
  roles = Object.values(UserRole);
  // roles = [
  //   { value: UserRole.Admin, label: 'Administrator' },
  //   { value: UserRole.User, label: 'Standard User' },
  //   { value: UserRole.Manager, label: 'Team Manager' }
  // ];

  constructor(private fb: FormBuilder, private toast: HotToastService, private userService: UserService, private router: Router) {
    this.userForm = this.fb.group({
      userId: [this.newUserId([]), Validators.required],
      userName: ['', Validators.required],
      password: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      isActive: [true],
      description: [''],
      createdDate: [new Date()],
      updatedDate: [new Date()],
    });
  }

  showHidePassword() {
    this.hidePassword = !this.hidePassword;
  }

  newUserId(existingId: number[]): number {
    let id: number;
    do {
      const uuid = uuidv4();
      const numeric = uuid.replace(/\D/g, '');
      let sub = numeric.substring(0, 5);
      sub = sub.padStart(5, '0');
      id = Number(sub);
      if (id < 10000) {
        id += 10000;
      }
    } while (existingId.includes(id))
    return id;
  }

  // saveForm() {
  //   const user: User = this.userForm.value as User;
  //   if (this.userForm.invalid) {
  //     this.toast.error('fill the all fields')
  //     return
  //   };
  //   if (this.userForm.valid) {
  //     const newUser = { ...user }
  //     console.log(newUser);
  //     this.userService.addUser(newUser).pipe(
  //       hotToastObserve(this.toast, {
  //         loading: "Just a Second....",
  //         success: (res: any) => `User ${res.userName} Saved!`,
  //         error: (err) => {
  //           if (err.status === 0) return "Data not Saved, Server is Sleeping! 😪";
  //           if (err.status === 401) return "Invalid Data! 🤔";
  //           return "Something Crashed! 😱";
  //         }
  //       }),
  //     ).subscribe({
  //       next: (res: any) => {
  //         console.log("successfully saved ....", res);
  //         // this.toast.success('Successfully saved!!',{ dismissible: true, position: 'bottom-center' });
  //       }
  //     })
  //   }
  //   this.userForm.reset();
  //   // window.location.reload();
  // }

  saveConfirmDialog() {
    const user: User = this.userForm.value as User;
    if (this.userForm.invalid) {
      this.toast.error('Form is Empty')
      return
    };
    const dialogRef = this.dialog.open(userDialog, {
      width: '400px',
      data: user.userName,
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`dialog result : ${result}`);
      if (result !== 'confirm') return;
      const newUser = { ...user }
      console.log(newUser);
      this.userService.addUser(newUser).pipe(
        hotToastObserve(this.toast, {
          loading: "Just a Second....",
          success: (res: any) => `User ${res.userName} Successfully Saved!`,
          error: (err) => {
            if (err.status === 0) return "Data not Saved, Server is Sleeping! 😪";
            if (err.status === 401) return "Invalid Data! 🤔";
            return "Something Crashed! 😱";
          }
        }),
      ).subscribe({
        next: () => {
          this.userForm.reset();
          this.userForm.patchValue({
            userId: this.newUserId([])   // 🔥 New ID auto set
          });
          this.router.navigate(['users']);
        }
      })
    }
    )
  }

  cancel(){
    this.router.navigate(['users']);
  }
}

@Component({
  selector: 'user-dialog',
  templateUrl: './dialogs/user-dialog.html',
  standalone: true,
  imports: [NgUIModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class userDialog {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<userDialog>
  ) {
    console.log(this.data);
  }

  user: User[] = []

  confirm() {
    this.dialogRef.close('confirm');
  }

  close() {
    this.dialogRef.close('cancel');
  }
}

