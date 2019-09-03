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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { ItemComponent } from './Item/Item.component';
import { AssociationComponent } from './Association/Association.component';

import { UserComponent } from './User/User.component';

import { CreateAssociationComponent } from './CreateAssociation/CreateAssociation.component';
import { UpdateAssociationComponent } from './UpdateAssociation/UpdateAssociation.component';
import { GrantAssociationComponent } from './GrantAssociation/GrantAssociation.component';
import { RevokeAssociationComponent } from './RevokeAssociation/RevokeAssociation.component';
import { CreateItemComponent } from './CreateItem/CreateItem.component';
import { RemoveItemComponent } from './RemoveItem/RemoveItem.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Item', component: ItemComponent },
  { path: 'Association', component: AssociationComponent },
  { path: 'User', component: UserComponent },
  { path: 'CreateAssociation', component: CreateAssociationComponent },
  { path: 'UpdateAssociation', component: UpdateAssociationComponent },
  { path: 'GrantAssociation', component: GrantAssociationComponent },
  { path: 'RevokeAssociation', component: RevokeAssociationComponent },
  { path: 'CreateItem', component: CreateItemComponent },
  { path: 'RemoveItem', component: RemoveItemComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
 providers: []
})
export class AppRoutingModule { }
