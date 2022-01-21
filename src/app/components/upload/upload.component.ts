import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  SimpleChanges,
  EventEmitter,
  Output,
  OnChanges,
} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AttachmentFileService } from 'src/app/@core/services/attachmentFile.service';
import { map, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { NbToastrService, NbComponentStatus } from '@nebular/theme';
import { IProject } from 'src/app/@core/data/project';

@Component({
  selector: 'ngx-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit, OnChanges {
  @ViewChild('fileDropRef', { static: false }) fileDropEl: ElementRef;
  @Input() newProject = false;
  @Input() project: IProject;
  @Output() uploadEvent = new EventEmitter();

  files: any[] = [];
  uploadForm: FormGroup;

  showForm = true;

  // USADO COMO STATUS PARA O ADICIONAR / REMOVER
  fileLoading = false;

  constructor(
    private attachmentFileService: AttachmentFileService,
    private formBuilder: FormBuilder,
    private toastrService: NbToastrService
  ) {}

  ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({
      file: [''],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.project.firstChange) {
      if (this.project.status.id === 's3' || this.project.status.id === 's5') {
        this.showForm = false;
      }
      if (this.newProject) {
        this.newProject = false;
        this.handleUpload();
      }
      if (!this.newProject) {
        // eslint-disable-next-line no-underscore-dangle
        this.files = this.project.attachmentList;
      }
    }
  }

  getLink(fileID): string {
    return this.attachmentFileService.getLink(fileID);
  }
  /**
   * on file drop handler
   */
  onFileDropped($event) {
    this.prepareFilesList($event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(files) {
    this.prepareFilesList(files);
  }

  /**
   * Delete file from files list
   *
   * @param index (File index)
   */
  deleteFile(index: number, fileId: string) {
    this.fileLoading = true;
    if (this.newProject) {
      this.files.splice(index, 1);
    } else {
      this.attachmentFileService.deleteFile(fileId, 'project', this.project.id).subscribe(
        (data) => {
          this.showToast('success', data.msg);
          this.uploadEvent.emit('uploadEvent');
          this.fileLoading = false;
          this.files.splice(index, 1);
          // console.log(data);
        },
        (err) => {
          this.fileLoading = false;
          console.log(err);
        }
      );
    }
  }

  showToast(status: NbComponentStatus, message: string) {
    this.toastrService.show('', message, { status });
  }

  /**
   * Convert Files list to normal array list
   *
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    // console.log(files);
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
      this.uploadForm.get('file').setValue(item);
    }
    this.handleUpload();

    this.fileDropEl.nativeElement.value = '';
  }

  handleUpload() {
    this.files.forEach((item) => {
      if (this.project !== undefined && item.progress === 0) {
        try {
          this.uploadFile(item);
        } catch (error) {
          console.warn('File upload failed.');
          console.error(error);
        }
      }
    });
  }

  /**
   * format bytes
   *
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  uploadFile(file) {
    // const formData = new FormData();
    // formData.append('file', this.uploadForm.get('file').value);

    file.inProgress = true;

    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      // console.log(reader.result);

      const arrayBuffer = reader.result;
      const data = this.uint8ToString(new Uint8Array(arrayBuffer as ArrayBuffer));

      this.attachmentFileService
        .uploadFile('project', this.project.id, file, data)
        .pipe(
          map((event) => {
            if (event.status === 'progress') {
              file.progress = event.msg;
            }
            if (event.statusCode === 200) {
              this.showToast('success', event.msg);
              this.uploadEvent.emit('uploadEvent');
            }
          }),
          catchError((error: HttpErrorResponse) => {
            file.inProgress = false;
            return of(`${file.name} upload failed.`);
          })
        )
        .subscribe((event: any) => {
          if (typeof event === 'object') {
            // console.log(event.body);
          }
        });
    };
  }

  uint8ToString(buf) {
    let i: number;
    let length: number;
    let out = '';
    for (i = 0, length = buf.length; i < length; i += 1) {
      out += String.fromCharCode(buf[i]);
    }
    return out;
  }
}
