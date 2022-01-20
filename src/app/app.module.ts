import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TreeGridModule , EditService , ToolbarService , ContextMenuService  } from '@syncfusion/ej2-angular-treegrid';
import { PageService, SortService,  ResizeService, FilterService } from '@syncfusion/ej2-angular-treegrid';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { ContextMenuModule } from '@syncfusion/ej2-angular-navigations';
import { enableRipple } from '@syncfusion/ej2-base';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UploaderModule } from '@syncfusion/ej2-angular-inputs';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,DialogModule,UploaderModule, ReactiveFormsModule,
    AppRoutingModule,TreeGridModule  , FormsModule , ButtonModule , DropDownListAllModule , ContextMenuModule
  ],
  providers: [PageService, SortService,  ResizeService, FilterService, EditService, ToolbarService, ContextMenuService],
  bootstrap: [AppComponent]
})
export class AppModule { }
