import { PostService } from './../../post.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators } from '@angular/forms';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Router } from '@angular/router';

const requreAndMinLengthValidator = Validators.compose([
  Validators.required,
  Validators.minLength(10),
]);

@Component({
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  form = this.formBuilder.group({
    title: this.formBuilder.control(null, Validators.required),
    description: this.formBuilder.control(null),
    // body: this.formBuilder.control(null, [
    //   Validators.required,
    //   Validators.minLength(10),
    // ]),
    body: this.formBuilder.control(null, requreAndMinLengthValidator),
    tags: this.formBuilder.array([
      this.formBuilder.control('HTML'),
      this.formBuilder.control('CSS'),
    ]),
  });

  get tags(): FormArray {
    return this.form.get('tags') as FormArray;
  }

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private postService: PostService
  ) {}

  ngOnInit(): void {}

  addTag(tag: string) {
    this.tags.push(this.formBuilder.control(tag));
  }

  removeTag(index: number) {
    this.tags.removeAt(index);
  }

  createPost() {
    this.postService.createArticle(this.form.value).subscribe(() => {
      this.router.navigateByUrl('/');
    });
  }
}
