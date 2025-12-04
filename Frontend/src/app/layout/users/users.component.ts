import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgUIModule } from '../../shared/ng-ui.module';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { HotToastService } from '@ngxpert/hot-toast';
import { User, UserRole } from '../../core/models/user';
import { UserService } from '../../core/services/user.service';
import { hotToastObserve } from '../../core/utils/toast-observer';

@Component({
  selector: 'app-users',
  standalone: false,
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {

  userForm: FormGroup;
  hidePassword = false;

  users: User[] = [];
  roles = Object.values(UserRole);
  // roles = [
  //   { value: UserRole.Admin, label: 'Administrator' },
  //   { value: UserRole.User, label: 'Standard User' },
  //   { value: UserRole.Manager, label: 'Team Manager' }
  // ];


  constructor(private fb: FormBuilder, private toast: HotToastService, private userService: UserService) {
    this.userForm = this.fb.group({
      userId: [this.generatedCustId([]), Validators.required],
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

  generatedCustId(existingId: number[]): number {
    let id: number;
    do {
      const uuid = uuidv4();
      const numeric = uuid.replace(/\D/g, '');
      id = Number(numeric.substring(0, 5) || Math.floor(10000 + Math.random() * 9000));
    } while (existingId.includes(id))
    return id;
  }

  saveForm() {
    const user: User = this.userForm.value as User;

    if (this.userForm.invalid) {
      this.toast.error('fill the all fields')
      return
    };

    if (this.userForm.valid) {
      const newUser = { ...user }
      console.log(newUser);
      this.userService.addUser(newUser).pipe(
        hotToastObserve(this.toast, {
          loading: "Just a Second....",
          success: (res: any) => `User ${res.userName} Saved!`,
          error: (err) => {
            if (err.status === 0) return "Data not Saved, Server is Sleeping! 😪";
            if (err.status === 401) return "Invalid Data! 🤔";
            return "Something Crashed! 😱";
          }
        }),
      )
        .subscribe({
          next: (res: any) => {
            console.log("successfully saved ....", res);
            // this.toast.success('Successfully saved!!',{ dismissible: true, position: 'bottom-center' });
          }
        })
      
    }
    this.userForm.reset();
    // window.location.reload();
  }

}
