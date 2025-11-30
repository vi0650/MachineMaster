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
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterOutlet } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { MatAccordion, MatExpansionModule, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';

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
    MatExpansionModule
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
    MatListItem
  ]
})
export class NgUIModule { }
