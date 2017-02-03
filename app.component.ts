import { Component, OnInit } from '@angular/core';
//import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { FirebaseService } from './firebase.service';

import { Business } from './Business';
import { Category } from './Category';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], 
  providers: [ FirebaseService ]
})
export class AppComponent implements OnInit {
  businesses: Business[];
  categories: Category[];

  appState: string;
  activeKey: string;

  // step 6 
      activeCompany:string;
      activeCategory: string;
      activeYearsInBusiness:number;
      activeDescription:string
      activePhone:string;
      activeEmail:string;
      activeStreetAddress:string;
      activeCity:string;
      activeState:string;
      activeZipcode:string;


  constructor( private _firebaseServive: FirebaseService ){}
  
  ngOnInit(){
    this._firebaseServive.getBusinesses().subscribe( businesses => {
      this.businesses = businesses; 
        });

      this._firebaseServive.getCategories().subscribe( categories => {
        this.categories = categories; 
          });

            } // END OF ngOnInit

    //shows the details of the company 
    changeState(state, key){
      console.log('Changing state to: ' + state ); 
      if(key){
        this.activeKey = key;
        console.log( 'Key:' + key)
        }
        this.appState = state;
          }


// step 4
    filterCategory(category){
      this._firebaseServive.getBusinesses(category).subscribe(businesses => {
        this.businesses = businesses;
          });
            }

// step 5
    addBusiness( 
      company:string,
      category: string,
      years_in_business:number,
      description:string,
      phone:string,
      email:string,
      street_address:string,
      city:string,
      state:string,
      zipcode:string)
      {
        var created_at = new Date().toString();

        var newBusiness = {
          company:company,
          category: category,
          years_in_business:years_in_business,
          description:description,
          phone:phone,
          email:email,
          street_address:street_address,
          city:city,
          state:state,
          zipcode:zipcode, 
          created_at: created_at
            }

            console.log(newBusiness);

        this._firebaseServive.addBusiness(newBusiness); // pushes data to firebase db

        this.changeState('default', '0'); //closes the form window
    } // END OF ADDBUSINESS


// step 6 - Edit button functionality
    showEdit(business){
      this.changeState('edit', business.$key);
      this.activeCompany =     business.company;
      this.activeCategory =    business.category;
      this.activeYearsInBusiness =     business.years_in_business;
      this.activeDescription = business.description;
      this.activePhone  =     business.phone;
      this.activeEmail  =     business.email;
      this.activeStreetAddress =      business.street_address;
      this.activeCity =       business.city;
      this.activeState =      business.state;
      this.activeZipcode =    business.zipcode;}

// step 6 too 
    updateBusiness(){
      var updBusiness = {
          company:this.activeCompany,
          category:this.activeCategory,
          years_in_business:this.activeYearsInBusiness,
          description:this.activeDescription,
          phone:this.activePhone,
          email:this.activeEmail,
          street_address:this.activeStreetAddress,
          city:this.activeCity,
          state:this.activeState,
          zipcode:this.activeZipcode}
      
      this._firebaseServive.updateBusiness(this.activeKey, updBusiness);

      this.changeState('default', '0'); }


// step -7 delete some data with $key as a reference
      deleteBusiness(key){
        this._firebaseServive.deleteBusiness(key);
          this.changeState('default', '0');
            }

    
} // END OF CLASS

