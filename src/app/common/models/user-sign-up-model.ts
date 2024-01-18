import { USER_AVATAR } from "../constants/AppEnums";

export class UserSignUpModel{
    public userEmail: string = "";
    public userName: string = "";
    public userPassword: string = "";
    public userConfirmPassword: string = "";
    public avatar:USER_AVATAR = USER_AVATAR.AVATAR1;
}