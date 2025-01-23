export default class User{
    #id
    #name
    #email
    #password
    #imgUrl
    #count
    constructor(id, name, email, password, imgUrl,count){
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.imgUrl = imgUrl;
        this.count=count;
        
    }
    get id(){
        return this.#id;
    }
    set id(id){
        this.#id = id;
    }
    get name(){
        return this.#name;
    }
    set name(name){
        this.#name = name;
    }
    get email(){
        return this.#email;
    }
    set email(email){
        this.#email = email;
    }
    get password(){
        return this.#password;
    }
    set password(password){
        this.#password = password;
    }
    get imgUrl(){
        return this.#imgUrl;
    }
    set imgUrl(imgUrl){
        this.#imgUrl = imgUrl;
    }
    get count(){
        return this.#count;
    }
    set count(count){
        this.#count = count;
    }


    toJSON(){
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            password: this.password,
            imgUrl: this.imgUrl,
            count:this.count,

            


        };
    }

    static fromJSON(userJSON){
        const user = new User();
        user.id = userJSON.id;
        user.name = userJSON.name;
        user.email = userJSON.email;
        user.password = userJSON.password;
        user.imgUrl = userJSON.imgUrl;
        user.count = userJSON.count;
        return user;
    }

    
}