export class AccountModel {
    public id: number | null;
    public activated: boolean;
    public authorities: string[];
    public email: string;
    public firstName: string | null;
    public langKey: string;
    public lastName: string | null;
    public login: string;
    public imageUrl: string | null;

  constructor(
    id: number ,
    activated: boolean,
    authorities: string[],
    email: string,
    firstName: string | null,
    langKey: string,
    lastName: string | null,
    login: string,
    imageUrl: string | null
  ) {
    this.id = id
    this.activated= activated
    this.authorities = authorities
    this.email = email
    this.firstName = firstName
    this.langKey = langKey
    this.lastName = lastName
    this.login = login
    this.imageUrl = imageUrl
  }
}
