import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButton, MatButtonModule, MatFabButton, MatIconButton, MatMiniFabButton } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { MatCard, MatCardContent, MatCardFooter, MatCardHeader, MatCardModule, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatError, MatFormField, MatHint, MatInput, MatInputModule, MatLabel, MatPrefix, MatSuffix } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenu, MatMenuItem, MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatDrawer, MatDrawerContainer, MatDrawerContent, MatSidenav, MatSidenavContainer, MatSidenavContent, MatSidenavModule } from '@angular/material/sidenav';
import { MatDivider, MatList, MatListItem, MatListModule, MatNavList } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogTitle } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatOption, MatSelect, MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterOutlet } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { MatAccordion, MatExpansionModule, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';
import { MatGridList, MatGridListModule, MatGridTile } from '@angular/material/grid-list';
import { MatDatepicker, MatDatepickerInput, MatDatepickerModule, MatDatepickerToggle } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterOutlet,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDividerModule,
    MatAccordion,
    MatExpansionModule,
    MatDialogModule,
    MatGridListModule,
    MatSelectModule,
    MatDatepickerModule
  ],
  exports: [
    MatIcon,
    MatFormField,
    MatButton,
    MatLabel,
    MatCardContent,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatHint,
    MatError,
    MatInput,
    MatPrefix,
    MatSuffix,
    MatFabButton,
    MatMiniFabButton,
    MatCardFooter,
    MatDivider,
    MatToolbar,
    MatIconButton,
    MatSidenav,
    MatDrawer,
    MatDrawerContent,
    MatSidenavContent,
    MatDrawerContainer,
    MatSidenavContainer,
    MatNavList,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatList,
    MatListItem,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatGridList,
    MatGridTile,
    MatSelect,
    MatOption,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle
  ],
  providers:[provideNativeDateAdapter()]
})

export class NgUIModule { }
