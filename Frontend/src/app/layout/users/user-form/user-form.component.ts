import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core';
import { NgUIModule } from '../../../shared/ng-ui.module';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HotToastService } from '@ngxpert/hot-toast';
import { User, UserRole } from '../../../core/models/user';
import { UserService } from '../../../core/services/user.service';
import { hotToastObserve } from '../../../core/utils/toast-observer';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  standalone: false,
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent {
  readonly dialog = inject(MatDialog);
  users: User[] = [];
  existingIds: number[] = [];
  userForm: FormGroup;
  userId!: number;
  roles = Object.values(UserRole);
  hidePassword = false;
  isUpdate = false;

  private buildForm(): FormGroup {
    return this.fb.group({
      userId: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      isActive: [true],
      description: [''],
      createdDate: [new Date()],
      updatedDate: [new Date()]
    });
  }

  private createUser(user: User) {
    this.userService.addUser(user).pipe(
      hotToastObserve(this.toast, {
        loading: "Just a Second....",
        success: (res: any) => `${res.userName} Successfully Saved!`,
        error: err => {
          if (err.status === 0) return "Server Sleeping!";
          if (err.status === 401) return "Invalid Data!";
          return "Something Crashed!";
        }
      }),
    ).subscribe(() => {
      this.existingIds.push(user.userId);
      this.userForm.reset();
      this.generateId();   // fresh ID for next user
      this.router.navigate(['users']);
    });
  }
  
  protected generateId() {
    const newId = this.userService.newUserId(this.existingIds);
    this.userForm.patchValue({
      userId: newId
    });
    console.log('generated ID :', newId);
  }

  private updateUserData(user: User) {
    this.userService.updateUser(this.userId, user).pipe(
      hotToastObserve(this.toast, {
        loading: "Updating data....",
        success: () => `data Updated successfully`,
        error: err => {
          if (err.status === 0) return "Server Sleeping!";
          if (err.status === 401) return "Invalid Data!";
          return "Something Crashed!";
        }
      }),
    ).subscribe(() => {
      this.router.navigate(['users'])
    })
  }

  private loadUserData(id: number) {
    this.userService.getUserById(id).subscribe((user) => {
      this.userForm.patchValue(user);
    });
  }

  private fixDate(date: any) {
    const d = new Date(date);
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().split('T')[0];
  }

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private toast: HotToastService, private userService: UserService, private router: Router) {
    this.userForm = this.buildForm();
    console.log('user form');
  }

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.userId) {
      this.isUpdate = true;
      this.loadUserData(this.userId)
    } else {
      this.generateId()
    }
  }

  showHidePassword() {
    this.hidePassword = !this.hidePassword;
  }

  saveUser() {
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
      newUser.updatedDate = this.fixDate(user.updatedDate);
      newUser.createdDate = this.fixDate(user.createdDate);
      console.log(newUser)
      if (this.isUpdate) {
        this.updateUserData(newUser);
      } else {
        this.createUser(newUser)
      }
    }
    )
  }

  cancel() {
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

  confirm() {
    this.dialogRef.close('confirm');
  }

  close() {
    this.dialogRef.close('cancel');
  }
}