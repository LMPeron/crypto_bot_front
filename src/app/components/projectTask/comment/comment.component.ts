import { ProjectTaskService } from 'src/app/@core/services/projectTask.service';
import { IProjectTask } from 'src/app/@core/data/projectTask';
import PtBrLocale from 'date-fns/locale/pt-BR';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IComment } from 'src/app/@core/data/comment';
import { formatDistanceToNow } from 'date-fns';

@Component({
  selector: 'ngx-comment-task',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentTaskComponent implements OnInit, OnChanges {
  submited = false;
  commentForm: FormGroup;
  showForm = true;

  @Input() projectTask: IProjectTask;

  @Output() newCommentEvent = new EventEmitter();
  comments: IComment[] = new Array();
  showComment: true;
  constructor(
    private projectTaskService: ProjectTaskService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.commentForm = this.formBuilder.group({
      body: ['', [Validators.required, Validators.maxLength(1000)]],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
      if (this.projectTask.status.id === 's3' || this.projectTask.status.id === 's5') {
        this.showForm = false;
      }

      this.comments = this.projectTask.commentList;

      this.comments.forEach((comment) => {
        // TEMPO QUE PASSOU DO EVENTO ATE AGR
        comment.distanceToNow = formatDistanceToNow(comment.date, {
          addSuffix: true,
          locale: PtBrLocale,
        });
      });


      // ALTERA ORDEM DE APARICAO DOS COMENTARIOS
      this.comments.sort((a, b) => b.date - a.date);
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.commentForm.controls;
  }

  addComment() {

    this.submited = true;

    // stop here if form is invalid
    if (this.commentForm.invalid) {
      return;
    }
    // const commentDraft = {
    //   author: this.authService.currentUserValue.name,
    //   date: new Date(),
    //   body: this.commentForm.value.body,
    //   type: 'project',
    // };

    const commentDraft = this.commentForm.value.body;

    this.projectTaskService.addComment(this.projectTask.id, commentDraft).subscribe(
      (data) => {
        this.submited = false;
        // console.log(data);
        this.commentForm.reset();

        this.newCommentEvent.emit('newComment');
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
