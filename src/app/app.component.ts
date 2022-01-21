import { Component, OnInit, ViewChild, ElementRef , AfterViewInit} from '@angular/core';
import { sampleData } from './datasource';
import {
  ColumnMenuOpenEventArgs,
  PageSettingsModel,
  SortSettingsModel,
} from '@syncfusion/ej2-angular-grids';
import { WebsocketServiceService } from './websocket-service.service';
import {
  EditSettingsModel,
  ToolbarItems,
  TreeGridComponent,
  VirtualScrollService
} from '@syncfusion/ej2-angular-treegrid';
import {
  MenuItemModel,
  ContextMenu,
} from '@syncfusion/ej2-angular-navigations';
import { enableRipple } from '@syncfusion/ej2-base';
import { getValue, isNullOrUndefined } from '@syncfusion/ej2-base';
import { BeforeOpenCloseEventArgs } from '@syncfusion/ej2-inputs';
import { MenuEventArgs } from '@syncfusion/ej2-navigations';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { EmitType } from '@syncfusion/ej2-base';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-root',
  // templateUrl: './app.component.html',
  // template: `` ,
  providers: [VirtualScrollService],

  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit , AfterViewInit{
  title = 'test-task-FE';
    buttonName: any;

  public editSettings: EditSettingsModel;
  public toolbarOptions: ToolbarItems[];
  public data: Object[];
  public pageSettings: PageSettingsModel;
  public sortSettings: SortSettingsModel;
  public selectionSettings: Object;

  public contextMenuItems: Object[];
  @ViewChild('treegrid')
  public treeGridObj: TreeGridComponent;
  public closeOnEscape: boolean = false;
  public visible1: boolean = false;
//   data2= [
//     {   field: "TaskID" , headerText:"Player Jersey"  },
//     {   field: "FIELD1" , headerText:"Player Name"  },
//     {   field: "FIELD2" , headerText:"Year"  },
//     {   field: "FIELD3" , headerText:"Stint"  },
//     {   field: "FIELD4" , headerText:"TMID"  }

// ]
  @ViewChild('ejDialog') ejDialog: DialogComponent;
  // Create element reference for dialog target element.
  @ViewChild('container', { read: ElementRef, static: true })
  container: ElementRef;

  @ViewChild('treegrid')
  // public treegrid: TreeGridComponent;
  // The Dialog shows within the target element.
  public targetElement: HTMLElement;

  @ViewChild('Dialog')
  public dialogObj: DialogComponent;
  public form: FormGroup;
  copiedRecord: any;

  constructor(
    private websocketServiceService: WebsocketServiceService,
    public formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {

    this.selectionSettings = { type: 'Multiple' };

    this.form = this.formBuilder.group({
      taskID: [null, Validators.required],
      taskName: [null, Validators.required],
      startDate: [null, Validators.required],
      duration: [null, Validators.required],
    });
    console.log('here');


    this.initilaizeTarget();


    this.websocketServiceService.listen('test event').subscribe((data: []) => {
      this.data = data;
      console.log("dataaa", this.data);
      
    });


    this.editSettings = {
      // allowEditing: true,
      // allowAdding: true,
      // allowDeleting: true,
      // mode: 'Dialog',
    };

    this.toolbarOptions = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];

    this.sortSettings = {
      columns: [
        { field: 'taskName', direction: 'Ascending' },
        { field: 'taskID', direction: 'Ascending' },
      ],
    };

    this.contextMenuItems = [

      { text: 'AddNext', target: '.e-content', id: 'addnext' },
      { text: 'AddChild', target: '.e-content', id: 'addchild' },
      { text: 'DelRow', target: '.e-content', id: 'delrow' },
      { text: 'EditRow', target: '.e-content', id: 'editrow' },
      { text: 'MultiSelect', target: '.e-content', id: 'multiselect' },
      { text: 'CopyRows', target: '.e-content', id: 'copyrows' },
      { text: 'CutRows', target: '.e-content', id: 'cutrows' },
      { text: 'PasteNext', target: '.e-content', id: 'pastenext' },
      { text: 'PasteChild', target: '.e-content', id: 'pastechild' },



      { text: 'EditCol', target: '.e-headercontent', id: 'editcol' },
      { text: 'NewCol', target: '.e-headercontent', id: 'newcol' },
      { text: 'DelCol', target: '.e-headercontent', id: 'delcol' },
      { text: 'ChooseCol', target: '.e-headercontent', id: 'choosecol' },
      { text: 'FreezeCol', target: '.e-headercontent', id: 'freezecol' },
      { text: 'FilterCol', target: '.e-headercontent', id: 'filtercol' },
      { text: 'MultiSort', target: '.e-headercontent', id: 'multisort' },



    ];

    // this.pageSettings = { pageSize: 10};
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
        this.treeGridObj.selectionSettings.type = 'Multiple';
    this.treeGridObj.selectionSettings.mode = "Row";
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }


  contextMenuClick(args?: MenuEventArgs): void {

    console.log('here', args);

    let rowinfo = args['rowInfo']['rowData']

    // let check =  this.treeGridObj.getColumnByField('taskID');
    // console.log("check",check);
    // this.treeGridObj.collapseRow(
    //   <HTMLTableRowElement>this.treeGridObj.getSelectedRows()[0]
    // );
    
  if (args.item.id === 'addnext') {
      console.log('addnext');
      this.buttonName = "Save"

    } 
    else if (args.item.id === 'addchild') {
      this.buttonName = "Save"

      console.log('addchild call');
    } 
    else if (args.item.id === 'delrow') {

      console.log('delrow call');

    }    
    else if (args.item.id === 'editrow') {

      this.formPatchValue(rowinfo)
      this.buttonName = "Update"
      console.log('editrow call');

    }    
    else if (args.item.id === 'multiselect') {

      console.log('multiselect call');

    }    
    else if (args.item.id === 'copyrows') {

      console.log('copyrows call');

      this.copiedRecord =args['rowInfo']['rowData'];
      this.copiedRecord.taskData.TaskID = this.data.length + 1;

    }    
    else if (args.item.id === 'cutrows') {

      console.log('cutrows call' ,args['rowInfo']['rowData']['index']);

    } 
    else if (args.item.id === 'pastenext') {
      console.log(this.copiedRecord);
      console.log(args['rowInfo']['rowData']['index']);
      
      // this.treeGridObj.addRecord(this.copiedRecord.taskData,1,args['rowInfo']['rowData']['index']);
      console.log('pastenext call');

    } 
    else if (args.item.id === 'pastechild') {

      console.log('pastechild call');

    } 

///FOR COLUMNSSSSSSSSSSSSSS
    else if (args.item.id === 'editcol') {

      console.log('editcol call');

    } 


    else if (args.item.id === 'newcol') {

      console.log('newcol call');

    } 

    else if (args.item.id === 'delcol') {

      console.log('delcol call');

    } 

    else if (args.item.id === 'choosecol') {

      console.log('choosecol call');

    } 

    else if (args.item.id === 'freezecol') {

      console.log('freezecol call');

    } 

    else if (args.item.id === 'filtercol') {

      console.log('filtercol call');

    } 

    else if (args.item.id === 'multisort') {

      console.log('multisort call');

    } 

    else if (args.item.id === 'pastechild') {

      console.log('pastechild call');

    } 

    else if (args.item.id === 'pastechild') {

      console.log('pastechild call');

    } 







    else {

    }
  }

  formPatchValue(value:any){

    console.log(value);
    
    this.form.patchValue({
    taskID: value.TaskID,
    taskName:value.FIELD1,
    startDate: new Date(value.startDate),
    duration: value.duration,
   })
  //Date is still not patched
   console.log( new Date(value.startDate));
       this.onOpenDialog()
  }
  

  // Initialize the Dialog component's target element.
  public initilaizeTarget: EmitType<object> = () => {
    this.targetElement = this.container.nativeElement.parentElement;
  };

  // Hide the Dialog when click the footer button.
  public hideDialog: EmitType<object> = () => {

    console.log("here");
    
    this.ejDialog.hide();
  };

  // Enables the footer buttons
  public buttons: Object = [
    {
      click:  this.hideDialog.bind(this),
      // Accessing button component properties by buttonModel property
      buttonModel: {
        content: "Save",
        // Enables the primary button
        isPrimary: true,
      },
    },
    {
      click: this.hideDialog.bind(this),
      buttonModel: {
        content: 'Cancel',
      },
    },
  ];

  // Sample level code to handle the button click action
  public onOpenDialog = function (): void {
    // Call the show method to open the Dialog
    this.ejDialog.show();
  };

  saveData(){
    console.log("here");
    
   
  }
  
}
