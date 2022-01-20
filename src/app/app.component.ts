import { Component, OnInit, ViewChild ,ElementRef } from '@angular/core';
import { sampleData } from './datasource';
import { ColumnMenuOpenEventArgs, PageSettingsModel,SortSettingsModel } from '@syncfusion/ej2-angular-grids';
import { WebsocketServiceService } from './websocket-service.service';
import { EditSettingsModel, ToolbarItems, TreeGridComponent } from '@syncfusion/ej2-angular-treegrid';
import { MenuItemModel , ContextMenu } from '@syncfusion/ej2-angular-navigations';
import { enableRipple } from '@syncfusion/ej2-base';
import { getValue, isNullOrUndefined } from '@syncfusion/ej2-base';
import { BeforeOpenCloseEventArgs } from '@syncfusion/ej2-inputs';
import { MenuEventArgs } from '@syncfusion/ej2-navigations';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { EmitType } from '@syncfusion/ej2-base';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  // templateUrl: './app.component.html',
  // template: `` ,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'test-task-FE';
  public editSettings: EditSettingsModel;
  public toolbarOptions: ToolbarItems[];
  public data: Object[];
  public pageSettings: PageSettingsModel;
  public sortSettings: SortSettingsModel;
  public contextMenuItems: Object[];
  @ViewChild('treegrid')
  public treeGridObj: TreeGridComponent;
  public closeOnEscape: boolean =false;



  @ViewChild('ejDialog') ejDialog: DialogComponent;
  // Create element reference for dialog target element.
  @ViewChild('container', { read: ElementRef, static: true }) container: ElementRef;
  // The Dialog shows within the target element.
  public targetElement: HTMLElement;

  @ViewChild('Dialog')
  public dialogObj: DialogComponent;
  public form: FormGroup;






  constructor(private websocketServiceService:WebsocketServiceService ,public formBuilder: FormBuilder){

  }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      email: [null, Validators.required],
      contact: [null, Validators.required],
      upload: [null, Validators.required],
    });
    console.log("here");
    this.initilaizeTarget();
      this.websocketServiceService.listen("test event").subscribe((data : [])=>{

        this.data = data;

        console.log("here", data)
      })
      this.editSettings = {allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog'};
      this.toolbarOptions = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
      this.sortSettings = { columns: [{ field: 'taskName', direction: 'Ascending' }, { field: 'taskID', direction: 'Descending' }]  };
      // this.contextMenuItems = ['AutoFit', 'AutoFitAll', 'SortAscending', 'SortDescending',  'Edit',                     'Delete', 'Save', 'Cancel', 'PdfExport', 'ExcelExport', 'CsvExport'            ,                 'FirstPage', 'PrevPage', 'LastPage', 'NextPage'];
      
      this.contextMenuItems =  [
        { text: 'Collapse the Row', target: '.e-content', id: 'collapserow'},
        { text: 'Expand the Row', target: '.e-content', id: 'expandrow'},
        { text: 'Insert', target: '.e-content', id: 'Insert', click: this.columnMenuOpen(3)},
        { text: 'Insert', target: '.e-headercontent', id: 'Insert1' },
        { text: 'Delete', target: '.e-headercontent', id: 'Delete2', click: this.columnMenuOpen(3) }
    ];
      
      this.pageSettings = { pageSize: 6 };
  
    }

    validateAllFormFields(formGroup: FormGroup) {
      Object.keys(formGroup.controls).forEach(field => {
        const control = formGroup.get(field);
        if (control instanceof FormControl) {
          control.markAsTouched({ onlySelf: true });
        } else if (control instanceof FormGroup) {
          this.validateAllFormFields(control);
        }
      });
    }

    contextMenuClick(args?: MenuEventArgs): void {
      console.log("here", args);
      let abc = args
      this.treeGridObj.getColumnByField('taskID');
      if (args.item.id === 'Insert1') {
        console.log("insert call",abc);
        
          this.treeGridObj.collapseRow(<HTMLTableRowElement>(this.treeGridObj.getSelectedRows()[0]));
      } 
      else if (args.item.id === 'Insert') {
        console.log("insert call",abc['rowInfo']['rowData']);
        
          this.treeGridObj.collapseRow(<HTMLTableRowElement>(this.treeGridObj.getSelectedRows()[0]));
      } else {
          this.treeGridObj.expandRow(<HTMLTableRowElement>(this.treeGridObj.getSelectedRows()[0]));
          }
  }

  columnMenuOpen(arg1){
  console.log("sadsadasdasd");
      

    }
    columnMenuClick(arg2?: MenuEventArgs){
      console.log(arg2);

    }


      // Initialize the Dialog component's target element.
  public initilaizeTarget: EmitType<object> = () => {
    this.targetElement = this.container.nativeElement.parentElement;
      }
    
      // Hide the Dialog when click the footer button.
      public hideDialog: EmitType<object> = () => {
      this.ejDialog.hide();
      }
    
      // Enables the footer buttons
      public buttons: Object = [
    {
      'click': this.hideDialog.bind(this),
      // Accessing button component properties by buttonModel property
        buttonModel:{
        content: 'OK',
        // Enables the primary button
        isPrimary: true
      }
    },
    {
      'click': this.hideDialog.bind(this),
      buttonModel: {
        content: 'Cancel'
      }
    }
      ];
    
      // Sample level code to handle the button click action
      public onOpenDialog = function(event: any): void {
      // Call the show method to open the Dialog
      this.ejDialog.show();
      };
}
