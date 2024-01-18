import { USER_AVATAR } from "../constants/AppEnums";

export class UserDetailsModel{
    public userEmail: string = "";
    public userName: string = "";
    public userGUID: string = "";
    public avatar:USER_AVATAR = USER_AVATAR.AVATAR1;
}