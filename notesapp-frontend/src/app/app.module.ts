import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FilterPipe, NoteListComponent } from './note-list/note-list.component';
import { NoteService } from './note.service';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import {NgxPaginationModule} from 'ngx-pagination';
import { Ng2OrderModule } from 'ng2-order-pipe';


@NgModule({
  declarations: [
    AppComponent,
    NoteListComponent,
    HeaderComponent,
	FooterComponent,
	FilterPipe
    ],
  imports: [
    BrowserModule,
	FormsModule,
    HttpModule,
	NgxPaginationModule,
	Ng2OrderModule 
  ],
  providers: [NoteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
