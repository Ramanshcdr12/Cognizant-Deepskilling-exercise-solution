import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { NgIf, NgClass, NgForOf } from '@angular/common';

// Custom Synchronous Validator
export function noCourseCode(control: AbstractControl): ValidationErrors | null {
  const val = String(control.value || '');
  if (val.toUpperCase().startsWith('XX')) {
    return { noCourseCode: true };
  }
  return null;
}

// Custom Async Validator
export function simulateEmailCheck(control: AbstractControl): Promise<ValidationErrors | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const email = String(control.value || '');
      if (email.toLowerCase().includes('test@')) {
        resolve({ emailTaken: true });
      } else {
        resolve(null);
      }
    }, 800);
  });
}

@Component({
  selector: 'app-reactive-enrollment-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgClass, NgForOf],
  templateUrl: './reactive-enrollment-form.html',
  styleUrl: './reactive-enrollment-form.css'
})
export class ReactiveEnrollmentForm implements OnInit {
  enrollForm!: FormGroup;
  submitted = false;

  // Explanation of value vs getRawValue():
  /*
    DIFFERENCE BETWEEN value AND getRawValue():
    - enrollForm.value: Excludes the values of disabled controls. It only contains 
      values of controls that are enabled.
    - enrollForm.getRawValue(): Includes the values of all controls, regardless 
      of whether they are enabled or disabled.
  */

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.enrollForm = this.fb.group({
      studentName: ['', [Validators.required, Validators.minLength(3)]],
      studentEmail: [
        '',
        [Validators.required, Validators.email],
        [simulateEmailCheck]
      ],
      courseId: ['', [Validators.required, noCourseCode]],
      preferredSemester: ['Odd', Validators.required],
      agreeToTerms: [false, Validators.requiredTrue],
      additionalCourses: this.fb.array([])
    });
  }

  // Explanation of Typed Getter:
  /*
    WHY A TYPED GETTER IS PREFERRED OVER TEMPLATE CASTING:
    - Angular templates do not support type casting directly (like `as FormArray`).
    - Exposing `additionalCourses` via a getter allows us to perform type casting 
      in the TypeScript code, keeping the template HTML clean, readable, and free of 
      complex typescript expressions.
    - It enforces strict compile-time type-safety in IDE and build cycles.
  */
  get additionalCourses(): FormArray {
    return this.enrollForm.get('additionalCourses') as FormArray;
  }

  // Helper method to safely cast AbstractControl to FormControl in templates
  asFormControl(control: AbstractControl): FormControl {
    return control as FormControl;
  }

  addCourse(): void {
    this.additionalCourses.push(new FormControl('', Validators.required));
  }

  removeCourse(index: number): void {
    this.additionalCourses.removeAt(index);
  }

  onSubmit(): void {
    if (this.enrollForm.valid) {
      console.log('Form Value (enabled only):', this.enrollForm.value);
      console.log('Form Raw Value (all controls):', this.enrollForm.getRawValue());
      this.submitted = true;
    }
  }

  resetForm(): void {
    this.enrollForm.reset({
      preferredSemester: 'Odd',
      agreeToTerms: false
    });
    this.additionalCourses.clear();
    this.submitted = false;
  }
}
