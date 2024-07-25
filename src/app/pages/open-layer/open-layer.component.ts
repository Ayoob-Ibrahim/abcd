import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations'
import { opencloseanimation } from '../../animation/animation';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { nospaceallowed, validatorcls } from '../../validator/nospace.validators';
import { asyncvalidatorcls } from '../../validator/async.validators';
@Component({
  selector: 'app-open-layer',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './open-layer.component.html',
  styleUrl: './open-layer.component.scss',
  animations: opencloseanimation
})
export class OpenLayerComponent implements OnInit {
  profileform: FormGroup;

  ngOnInit(): void {
    this.profileform = new FormGroup({
      firstName: new FormControl('Ayoob', [Validators.required, nospaceallowed]),
      lastName: new FormControl('Ibrahim'),
      country: new FormControl('usa'),
      username: new FormControl('', [Validators.required, validatorcls.nospaceallowed,] ,asyncvalidatorcls.check4userName),
      skills: new FormArray([
        new FormControl('')
      ]),
    })
  }

  onSubmit(): void {
    console.log(this.profileform)
  }

  addskills(): void {
    (<FormArray>this.profileform.get('skills')).push(new FormControl(''));
  }
}
