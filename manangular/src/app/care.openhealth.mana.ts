import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace care.openhealth.mana{
   export class User extends Participant {
      manaId: string;
      role: Role;
   }
   export class Item extends Asset {
      itemId: string;
      description: string;
      role: Role;
      link: string;
      owner: User;
   }
   export enum Role {
      CLIENT,
      PROVIDER,
      INSURANCE,
   }
   export class Association extends Asset {
      associationId: string;
      approved: boolean;
      messages: Message[];
      link: string;
      to: User;
      from: User;
      item: Item;
   }
   export class Message {
      date: Date;
      message: string;
   }
   export class CreateAssociation extends Transaction {
      to: User;
      from: User;
      item: Item;
      message: string;
      associationId: string;
   }
   export class UpdateAssociation extends Transaction {
      association: Association;
      item: Item;
      message: string;
      link: string;
   }
   export class GrantAssociation extends Transaction {
      association: Association;
      message: string;
      link: string;
   }
   export class RevokeAssociation extends Transaction {
      association: Association;
      message: string;
   }
   export class AssociationCreatedEvent extends Event {
      associationId: string;
   }
   export class AssociationUpdated extends Event {
      associationId: string;
   }
   export class AssociationGrantedEvent extends Event {
      associationId: string;
   }
   export class AssociationRevokedEvent extends Event {
      associationId: string;
   }
   export class CreateItem extends Transaction {
      description: string;
      role: Role;
      link: string;
      itemId: string;
      owner: User;
   }
   export class RemoveItem extends Transaction {
      item: Item;
   }
   export class ItemCreatedEvent extends Event {
      itemId: string;
   }
   export class ItemRemovedEvent extends Event {
      itemId: string;
   }
// }
