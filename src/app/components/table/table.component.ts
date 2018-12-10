import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { TableItem } from 'src/app/shared/tableItem';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  id = 0;
  tableData = [];
  closeResult: string;

  form = this.fb.group({
    name: ['', Validators.required],
    code: ['', Validators.required],
    duration: ['', Validators.required],
    numberOfAccounts: ['', Validators.required],
    dateOfCreation: ['', Validators.required]
  });

  modalForm = this.fb.group({
    id: [''],
    name: ['', Validators.required],
    code: ['', Validators.required],
    duration: ['', Validators.required],
    numberOfAccounts: ['', Validators.required],
    dateOfCreation: ['', Validators.required]
  });

  onChange() {
    console.log(this.form.get('dateOfCreation'));
  }

  onSubmit() {
    const id = this.id;
    const name = this.form.get('name').value;
    const code = this.form.get('code').value;
    const duration = this.form.get('duration').value;
    const numberOfAccounts = this.form.get('numberOfAccounts').value;
    const dateOfCreation = this.form.get('dateOfCreation').value;

    const item: TableItem = {
      id,
      name,
      code,
      duration,
      numberOfAccounts,
      dateOfCreation
    };

    console.log(this.tableData);
    this.tableData.push(item);
    this.id++;
    this.clearForm();
  }

  onUpdate(item: TableItem, content) {
    this.modalForm.patchValue({
      id: item.id,
      name: item.name,
      code: item.code,
      duration: item.duration,
      numberOfAccounts: item.numberOfAccounts,
      dateOfCreation: item.dateOfCreation
    });

    this.open(content);
  }

  onModalSubmit() {
    const id = +this.modalForm.get('id').value;
    const name = this.modalForm.get('name').value;
    const code = this.modalForm.get('code').value;
    const duration = this.modalForm.get('duration').value;
    const numberOfAccounts = this.modalForm.get('numberOfAccounts').value;
    const dateOfCreation = this.modalForm.get('dateOfCreation').value;

    this.tableData[id].name = name;
    this.tableData[id].code = code;
    this.tableData[id].duration = duration;
    this.tableData[id].numberOfAccounts = numberOfAccounts;
    this.tableData[id].dateOfCreation = dateOfCreation;

    this.modalService.dismissAll();
  }

  onDelete(id) {
    // for (let i = 0; i < this.tableData.length; i++) {
    //   if (this.tableData[i].id === +id) {
    //     this.tableData.splice(i, 1);
    //   }
    // }

    // this.tableData.forEach((item: TableItem, i) => {
    //   if (item.id === +id) {
    //     this.tableData.splice(i, 1);
    //   }
    // });

    this.tableData = this.tableData.filter(item => item.id !== id);
  }

  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDissmissReason(reason)}`;
        }
      );
  }

  private clearForm() {
    this.form.patchValue({
      name: null,
      code: null,
      duration: null,
      numberOfAccounts: null,
      dateOfCreation: null,
    });
  }

  private getDissmissReason(reason) {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  constructor(private fb: FormBuilder, private modalService: NgbModal) {}

  ngOnInit() {}
}
