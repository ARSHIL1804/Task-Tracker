import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig}  from '@angular/material/dialog';
import { DIALOG_BUTTONS } from '../common/constants/AppEnums';
import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { CustomDialogComponent } from '../common/components/custom-dialog/custom-dialog.component';
@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private dialog: MatDialog
  ) { 

  }

  public showDialog(
    dialogContent: string,
    dialogTitle: string,
    buttonArray: DIALOG_BUTTONS[],
    isError:boolean = false
  ){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { 
      dialogTitle: dialogTitle,
      dialogContent: dialogContent,
      buttonArray: buttonArray,
    };
    dialogConfig.autoFocus = true;
    dialogConfig.role = 'alertdialog';
    dialogConfig.scrollStrategy = new NoopScrollStrategy()
    dialogConfig.disableClose = true;
    dialogConfig.width='400px';


    return this.dialog.open(CustomDialogComponent, dialogConfig);
  }
}
