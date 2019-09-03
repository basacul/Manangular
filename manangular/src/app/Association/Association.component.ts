/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AssociationService } from './Association.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-association',
  templateUrl: './Association.component.html',
  styleUrls: ['./Association.component.css'],
  providers: [AssociationService]
})
export class AssociationComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  associationId = new FormControl('', Validators.required);
  approved = new FormControl('', Validators.required);
  messages = new FormControl('', Validators.required);
  link = new FormControl('', Validators.required);
  to = new FormControl('', Validators.required);
  from = new FormControl('', Validators.required);
  item = new FormControl('', Validators.required);

  constructor(public serviceAssociation: AssociationService, fb: FormBuilder) {
    this.myForm = fb.group({
      associationId: this.associationId,
      approved: this.approved,
      messages: this.messages,
      link: this.link,
      to: this.to,
      from: this.from,
      item: this.item
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceAssociation.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'care.openhealth.mana.Association',
      'associationId': this.associationId.value,
      'approved': this.approved.value,
      'messages': this.messages.value,
      'link': this.link.value,
      'to': this.to.value,
      'from': this.from.value,
      'item': this.item.value
    };

    this.myForm.setValue({
      'associationId': null,
      'approved': null,
      'messages': null,
      'link': null,
      'to': null,
      'from': null,
      'item': null
    });

    return this.serviceAssociation.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'associationId': null,
        'approved': null,
        'messages': null,
        'link': null,
        'to': null,
        'from': null,
        'item': null
      });
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
          this.errorMessage = error;
      }
    });
  }


  updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'care.openhealth.mana.Association',
      'approved': this.approved.value,
      'messages': this.messages.value,
      'link': this.link.value,
      'to': this.to.value,
      'from': this.from.value,
      'item': this.item.value
    };

    return this.serviceAssociation.updateAsset(form.get('associationId').value, this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }


  deleteAsset(): Promise<any> {

    return this.serviceAssociation.deleteAsset(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceAssociation.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'associationId': null,
        'approved': null,
        'messages': null,
        'link': null,
        'to': null,
        'from': null,
        'item': null
      };

      if (result.associationId) {
        formObject.associationId = result.associationId;
      } else {
        formObject.associationId = null;
      }

      if (result.approved) {
        formObject.approved = result.approved;
      } else {
        formObject.approved = null;
      }

      if (result.messages) {
        formObject.messages = result.messages;
      } else {
        formObject.messages = null;
      }

      if (result.link) {
        formObject.link = result.link;
      } else {
        formObject.link = null;
      }

      if (result.to) {
        formObject.to = result.to;
      } else {
        formObject.to = null;
      }

      if (result.from) {
        formObject.from = result.from;
      } else {
        formObject.from = null;
      }

      if (result.item) {
        formObject.item = result.item;
      } else {
        formObject.item = null;
      }

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  resetForm(): void {
    this.myForm.setValue({
      'associationId': null,
      'approved': null,
      'messages': null,
      'link': null,
      'to': null,
      'from': null,
      'item': null
      });
  }

}
