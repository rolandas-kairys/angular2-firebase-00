import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import 'rxjs/add/operator/map';
import { Business } from './Business';
import { Category } from './Category';

@Injectable()
export class FirebaseService {

    businesses: FirebaseListObservable<Business[]>;
    categories: FirebaseListObservable<Category[]>;

    constructor(private _af: AngularFire){}

    getBusinesses(category: string = null){
      if(category != null){ // 1 - if there is category passed in, it narrows by category
      this.businesses = this._af.database.list('/businesses', {
        query: {
          orderByChild: 'category',
          equalTo: category
            }
          }) as FirebaseListObservable<Business[]>
            }else{ // 2 - if not it just gives all list 
              this.businesses = this._af.database.list('/businesses') as
              FirebaseListObservable<Business[]>
                }
                return this.businesses; // RESULT 1 OR 2
                  } // END OF getBusinesses

      getCategories(){
      this.categories = this._af.database.list('/categories') as
        FirebaseListObservable<Category[]>
          return this.categories;
      }

  // step 5 - adding new data to db
      addBusiness(newBusiness){
        return this.businesses.push(newBusiness);
          }

  // step 6 - updating firebase db
       updateBusiness(key, updBusiness){
        return this.businesses.update(key, updBusiness);
          }

// step 7 - deleting from db
        deleteBusiness(key){
          return this.businesses.remove(key);
            } 

}// END OF FirebaseService


