import { Drivers, Storage } from '@ionic/storage';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';

const store = new Storage({
    name: '_wallet',
    driverOrder: [CordovaSQLiteDriver._driver, Drivers.IndexedDB, Drivers.LocalStorage]
  });

store.defineDriver(CordovaSQLiteDriver);
store.create()

 export default store