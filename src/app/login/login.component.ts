import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  validateForm!: FormGroup;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      phone: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

  /**
   * 登录 btn
   */
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.valid) {
      this.http.get(`${environment.gateway}/user/login/?phone=${this.validateForm.value.phone}&password=${this.validateForm.value.password}`, ).subscribe((res: any) => {});
    }
  }


  /**
   * 注册
   */
  createAcc(): void {
    this.router.navigate([`/createAcc`]);

  }
}
