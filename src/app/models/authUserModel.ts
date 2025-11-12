import { remove } from "ol/array";
import { IdNameModel } from "./idNameModel";
import { removeCharacters } from "../utilities/general";

export class AuthUserModel {
  //created properties in the constructor  
  public isLoggedIn: boolean=false;
  public apiUrl:string = '';

  //received properties in the data parameter
  public user: number = -1;
  public party: number = -1;
  public username: string ='';
  public token: string ='';
  public expiry: Date = new Date('1500/01/01');
  public groups: IdNameModel[] =[]
  public opened_sessions: number = -1

  constructor(data: Partial<AuthUserModel>){

    Object.assign(this, data);

    let groups:IdNameModel[]=[];

    //Convert groups (plane json objects) to IdNameModel instances
    this.groups.forEach((group)=>{
      groups.push(new IdNameModel(group.id, group.name));
    });
    this.groups=groups;
    
    if (this.opened_sessions > 0){
      this.isLoggedIn = true;
    }else
      this.isLoggedIn = false;
  }

  getGroupsAsString(): string{
    let names: string='';
    this.groups.forEach((group)=>{
      names += group.name + ',';
    });
    return removeCharacters(names,1);
  }

  getGroupsAsArrayOfStrings(): string[]{
    let names: string[]=[];
    this.groups.forEach((group)=>{
      names.push(group.name);
    });
    return names;
  }
  
  getToken(): string{
    if (this.token != ''){
      return 'Token ' + this.token;
    } else {
      return ''
    }
  }
}