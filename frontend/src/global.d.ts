declare module "*.png" {
    const value: string;
    export default value;
  }
  
  declare module "*.jpg" {
    const value: string;
    export default value;
  }
  
  declare module "*.jpeg" {
    const value: string;
    export default value;
  }
  
  declare module "*.svg" {
    const value: string;
    export default value;
  }

  declare module 'redux-persist/lib/storage' {
    import { Storage } from 'redux-persist';
    const storage: Storage;
    export default storage;
  }
  