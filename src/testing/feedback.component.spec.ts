import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FeedbackComponent } from 'src/app/feedback/feedback.component';

describe('FeedbackComponent', () => {
  let component: FeedbackComponent;
  let fixture: ComponentFixture<FeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeedbackComponent],
      imports: [
        FormsModule,
        MatFormFieldModule,
        MatSelectModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatRadioModule,
        MatSnackBarModule,
        MatButtonModule,
        MatToolbarModule,
        HttpClientModule
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should create 6 mat-form-field, 1 mat-select, 1 mat-radio-group and 2 mat-button elements', () => {
    const formElement = fixture.debugElement.query(By.css('form'));
    expect(formElement.queryAll(By.css('mat-form-field')).length).toEqual(6);
    expect(formElement.queryAll(By.css('mat-form-field [matInput]')).length).toEqual(5);
    expect(formElement.queryAll(By.css('mat-select')).length).toEqual(1);
    expect(formElement.queryAll(By.css('mat-radio-group')).length).toEqual(1);
    expect(formElement.queryAll(By.css('.mat-button')).length).toEqual(2);
  })


  it('should display error messages when required form fields are empty', () => {
    const firstNameElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector("input[name='firstName']");
    const phoneElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector("input[name='phone']");
    const emailElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector("input[name='email']");
    const submitButton: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector("button[type='submit']");

    firstNameElement.dispatchEvent(new Event('blur'));
    phoneElement.dispatchEvent(new Event('blur'));
    emailElement.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    const errors = fixture.debugElement.queryAll(By.css("mat-error"));
    expect(errors.length).toEqual(3);
    expect(errors[0].nativeElement.innerHTML.trim().toLowerCase()).toEqual('first name is required');
    expect(errors[1].nativeElement.innerHTML.trim().toLowerCase()).toEqual('phone number is required');
    expect(errors[2].nativeElement.innerHTML.trim().toLowerCase()).toEqual('email id is required');
    expect(submitButton.disabled).toBeTruthy();

  })

  it('should accept valid values for firstName', () => {
    const firstNameElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector("input[name='firstName']");
    firstNameElement.value = 'john';
    firstNameElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    let errors = fixture.debugElement.queryAll(By.css("mat-error"));
    expect(errors.length).toEqual(0);
  });

  it('should display error messages when firstName have length less than 2 characters', () => {
    const firstNameElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector("input[name='firstName']");
    firstNameElement.value = 'h';
    firstNameElement.dispatchEvent(new Event('blur'));
    firstNameElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const errors = fixture.debugElement.queryAll(By.css("mat-error"));
    expect(errors.length).toEqual(1);
    expect(errors[0].nativeElement.innerHTML.trim().toLowerCase()).toEqual('first name minimum length is 2');
  
  });

  it('should have input field of type email and accept valid values', () => {
    const emailElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector("input[name='email']");
    emailElement.value = 'john@gmail.com';
    emailElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    
    const errors = fixture.debugElement.queryAll(By.css("mat-error"));
    expect(errors.length).toEqual(0);
  });

  it('should display error messages for invalid email values', () => {
    const emailElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector("input[name='email']");
    emailElement.value = 'suma';
    emailElement.dispatchEvent(new Event('blur'));
    emailElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const errors = fixture.debugElement.queryAll(By.css("mat-error"));
    expect(errors.length).toEqual(1);
    expect(errors[0].nativeElement.innerHTML.trim().toLowerCase()).toEqual('enter valid email id');
  })

  it('should accept valid values for phone number', () => {
    const phoneElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector("input[name='phone']");
    phoneElement.value = '8861003316';
    phoneElement.dispatchEvent(new Event('blur'));
    phoneElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    const errors = fixture.debugElement.queryAll(By.css("mat-error"));
    expect(errors.length).toEqual(0);
  });

  it('should give error messages for invalid values of phone number', () => {
    const phoneElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector("input[name='phone']");
    phoneElement.value = '333';
    phoneElement.dispatchEvent(new Event('blur'));
    phoneElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const errors = fixture.debugElement.queryAll(By.css("mat-error"));
    expect(errors.length).toEqual(1);
    expect(errors[0].nativeElement.innerHTML.trim().toLowerCase()).toEqual('enter valid phone number containing 10 digits starting with 7/8/9');
  });

  it('should enable submit button for valid values and call the function to submit the feedback', async () => {
    const firstNameElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector("input[name='firstName']");
    const phoneElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector("input[name='phone']");
    const emailElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector("input[name='email']");
    const submitButton: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector("button[type='submit']");

    firstNameElement.value = 'James';
    phoneElement.value = '9876543210';
    emailElement.value = 'james@gmail.com';

    firstNameElement.dispatchEvent(new Event('input'));
    emailElement.dispatchEvent(new Event('input'));
    phoneElement.dispatchEvent(new Event('input'));
    const trigger = fixture.debugElement.query(By.css('.mat-select-trigger')).nativeElement;
    trigger.click();
    const radio_trigger = fixture.debugElement.query(By.css('mat-radio-group[name="rating"]')).nativeElement;
    radio_trigger.click();
    fixture.detectChanges();

    expect(submitButton.disabled).not.toBeFalse();
    const compiled = fixture.debugElement.nativeElement;
    expect(fixture.debugElement.query(By.css('button[type="submit"]'))
      .triggerEventHandler('submit', compiled)).toBeUndefined();
  })
});
