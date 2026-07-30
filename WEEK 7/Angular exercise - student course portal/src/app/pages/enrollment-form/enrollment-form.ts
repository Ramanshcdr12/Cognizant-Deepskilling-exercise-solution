import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-enrollment-form',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './enrollment-form.html',
  styleUrl: './enrollment-form.css'
})
export class EnrollmentForm {
  model = {
    studentName: '',
    studentEmail: '',
    courseId: null as number | null,
    preferredSemester: 'Odd',
    agreeToTerms: false
  };

  submitted = false;

  onSubmit(form: NgForm): void {
    if (form.valid) {
      console.log('Form Value:', form.value);
      console.log('Form Validity:', form.valid);
      this.submitted = true;
    }
  }

  resetForm(form: NgForm): void {
    form.resetForm({
      preferredSemester: 'Odd',
      agreeToTerms: false
    });
    this.submitted = false;
  }
}
