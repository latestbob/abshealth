export interface ISpecialist {
    title:string;
    firstname:string;
    lastname: string;
    email:string;
  
    gender?:string | null;
    aos?:string | null;
    fee?:number | null;

    profileImage:string | null;
   
    uuid:string;

    isActive?:boolean;
   password?:string | null;
    createdAt?:Date;
    updatedAt?:Date | null;
   
    


}