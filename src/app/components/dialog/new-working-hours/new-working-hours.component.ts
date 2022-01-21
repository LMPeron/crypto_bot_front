import { IProject } from 'src/app/@core/data/project';
import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'ngx-new-working-hours',
  templateUrl: './new-working-hours.component.html',
  styleUrls: ['./new-working-hours.component.scss'],
})
export class NewWorkingHoursComponent implements OnInit {
  @Input() projectTask: Partial<IProject>;
  @Input() title: string;
  @Input() context: {};
  constructor(
    protected dialogRef: NbDialogRef<NewWorkingHoursComponent>,
    private deviceService: DeviceDetectorService
  ) {}
  deviceInfo = null;
  ngOnInit(): void {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    console.log(this.deviceInfo);
  }
  cancel() {
    this.dialogRef.close();
  }

  submit() {
    this.dialogRef.close('new');
  }
  close() {
    this.dialogRef.close();
  }

  newEvent(e: Event) {
    this.submit();
  }
}
