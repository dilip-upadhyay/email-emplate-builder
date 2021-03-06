import { Component, OnInit, Inject } from '@angular/core';
import { EmailVariableService } from './email-variable.service';
import { IEmailVariable } from './iemail-variable';

import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseNewComponent, Globals, PickerDialogService, ErrorService } from 'projects/fast-code-core/src/public_api';// 'fastCodeCore';
import { IEmailVariableType } from './iemail-variable-type';
import { EmailVariablTypeService } from './email-variable.type.service';

@Component({
	selector: 'app-email-variable-new',
	templateUrl: './email-variable-new.component.html',
	styleUrls: ['./email-variable-new.component.scss']
})
export class EmailVariableNewComponent extends BaseNewComponent<IEmailVariable> implements OnInit {

	title: string = "New Email Merge Field";
	entityName: string = 'EmailVariable';
	emailVariableType: IEmailVariableType[];
	constructor(
		public formBuilder: FormBuilder,
		public router: Router,
		public route: ActivatedRoute,
		public dialog: MatDialog,
		public dialogRef: MatDialogRef<EmailVariableNewComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		public global: Globals,
		public pickerDialogService: PickerDialogService,
		public dataService: EmailVariableService,
		public variableTypedataService: EmailVariablTypeService,
		public errorService: ErrorService
	) {
		super(formBuilder, router, route, dialog, dialogRef, data, global, pickerDialogService, dataService, errorService);
	}

	ngOnInit() {
		this.itemForm = this.formBuilder.group({
			propertyName: ['', Validators.required],
			propertyType: ['', Validators.required],
			defaultValue: [''],
		});
		super.ngOnInit();
		this.checkPassedData();
		this.variableTypedataService.getAll().subscribe(data => {
			this.emailVariableType = data;
		});
	}


	// convenience getter for easy access to form fields


}
