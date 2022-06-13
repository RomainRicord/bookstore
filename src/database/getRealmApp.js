import Realm from 'realm';
import { BookSchema_ } from '../schema/BookSchema';

export const realm = new Realm({schema: [BookSchema_], deleteRealmIfMigrationNeeded: true});