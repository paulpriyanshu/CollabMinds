export interface SignupFormat{
    name: string;
    email: string;
    number: string;
    password: string;
    confirmPassword: string;
}
export interface RegisterFormat{
    name: string;
    email: string;
    number: string;
    password: string;

}
export interface SliderAction{
    isOpen: boolean;
    onClose:() => void;
}
export interface MenuCardTypes{
    page:string;
    children:string;
}
export interface userPictureType{ 
    name:string; 
    username:string;
    subscribers:string;
    videos:string; 
    image:string; 
    description:string;
}
export interface truncateTextType{
    text:string;
    length:number;
}