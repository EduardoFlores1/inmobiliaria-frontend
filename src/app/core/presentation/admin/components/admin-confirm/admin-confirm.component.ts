import { Component, Inject } from '@angular/core';

import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-admin-confirm',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatIconModule
  ],
  templateUrl: './admin-confirm.component.html',
  styleUrl: './admin-confirm.component.scss'
})
export class AdminConfirmComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private dialogRef: MatDialogRef<AdminConfirmComponent>) {}

  actionHandler() {
    this.dialogRef.close('accept');
  }
}
