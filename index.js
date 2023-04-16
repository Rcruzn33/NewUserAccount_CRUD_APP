//let arr = []


class User {
    constructor(name) {
        this.name = name;
        this.accounts = [];
        }
    addAccount(userName, password) {
        const accountId = generateUniqueId();
        this.accounts.push(new Account(accountId, userName, password));
    }
}
class Account {
    constructor(id, userName, password) {
        this.id = id;
        this.userName = userName;
        this.password = password;
    }
}
//const account = new Account('myusername', 'mypassword', 1);

class UserSearch {
    static url = 'https://6431fe963e05ff8b371efb65.mockapi.io/user';
    static getAllUsers() {
        return $.get(this.url);
    }
    static getUser(id) {
        return $.get(this.url + `/${id}`);
    }
    static createUser(user) {
        return $.post(this.url, user);
    }
    static updateUser(user) {
        return $.ajax({
            url: this.url + `/${user.id}`,
            dataType: 'json',
            data: JSON.stringify(user),
            contentType: 'application/json',
            type: 'PUT'
        });
    }
    static deleteUser(id) {
        return $.ajax({
            url: this.url + `/${id}`,
            type: 'DELETE'
        });
    }
}
class DOMManager {
    static users;
    static getAllUsers() {
        UserSearch.getAllUsers().then(users => {
            this.render(users)
            console.log(users)
        });
    }
    /*static getAllUsers() {
        UserSearch.getAllUsers().then(users => console.log);
        }*/
    static createUser(name) {
        UserSearch.createUser(new User(name))
            .then(() => {
                return UserSearch.getAllUsers();
            })
            .then((users) => this.render(users));
    }
    static deleteUser(id) {
        UserSearch.deleteUser(id)
            .then(() => {
                return UserSearch.getAllUsers();
            })
            .then((users) => this.render(users));
    }
   static addAccount(id) {
        for (let user of this.users) {
            if (user.id == id) {
                user.accounts.push(new Account(id, $(`#${user.id}-account-userName`).val(), $(`#${user.id}-account-password`).val()));
                console.log(user.accounts)
                UserSearch.updateUser(user)
                    .then(() => {
                        return UserSearch.getAllUsers();
                    })
                    .then((users) => this.render(users))
            }
        }
    }

    /*static addAccount(id) {
        
        for (let user of this.users) {
            if (user.id == id) {
                //console.log($(`#${user.id}-account-userName`).val())
                //console.log($(`#${user.id}-account-password`).val())
                //User.addAccount(($(`#${user.id}-account-userName`).val()),($(`#${user.id}-account-password`).val()))       
                //User.addAccount("12131" , "dasasdas")  
                //console.log(user.accounts)
                user.accounts.push(new Account($(`#${user.id}-account-userName`).val(), $(`#${user.id}-account-password`).val()));               
                }
                $(`#${user.id}`).find('.card-body').append(
                    `<p>12131</p>`
                )
               // accounts.push(new Account($(`#${user.id}-account-userName`).val(), $(`#${user.id}-account-password`).val()));

            }
        }
    }*/
    static deleteAccount(userId, accountId) {
        for (let user of this.users) {
            if (user.id == userId) {
                for (let account of user.accounts) { 
                    if (account.id == accountId) {
                        user.accounts.splice(user.accounts.indexOf(account, 1));
                        UserSearch.updateUser(user)
                            .then(() => {
                                return UserSearch.getAllUsers();
                            })
                            .then((users) => this.render(users));
                    }
                }
            }
        }
    }
    /*static render(users) {
        this.users = users;
        $('#app').empty();
        for (let user of users) {
            $('#app').prepend(
         `<div id="${user._id}" class="card">
          <div class="card-header">
            <h2> ${user.name}</h2>
            <button class="btn btn-danger" onclick = "DOMManager.deleteUser('${user._id}')">Delete</button>
          </div>   
                <div class = "card-body">
                        <div class="card">
                            <div class="row">
                                <div class="col-sm">
                                <input type="text" id="${user._id}-account-userName" class ="form-control" placeholder="Username">
                                </div>
                                <div class="col-sm">
                                <input type="text" id="${user._id}-account-password" class="form-control" placeholder="Password">
                                </div>
                            </div>
                            <button id="${user._id}-new-account" onclick="DOMManager.addAccount('${user._id}')" class ="btn btn-primary form-control">Login</button>
                        </div>
                    </div>
                 </div><br>`
            );
            for(let account of user.accounts) {
                $(`#${user._id}`).find('.card-body').append(
                    `<P>
                    <span id="userName-${account._id}"><strong>Username:</strong> ${account.userName}</span>
                    <span id="password-${account._id}"><strong>Password:</strong> ${account.password}</span>
                    <button class="btn btn-danger" onclick="DOMManager.deleteAccount('${user._id}','${account._id}')"> Delete Account</button>`);
            }
        }
    }*/

    static render(users) {
        this.users = users;
        $('#app').empty();
        for (let user of users) {
            $('#app').prepend(
                `<div id="${user.id}" class="card">
                    <div class="card-header">
                    <h2> ${user.name}</h2>
                    <button class="btn btn-danger" onclick = "DOMManager.deleteUser('${user.id}')">Delete</button>
                    </div>   
                    <div class = "card-body">
                        <div class="card">
                            <div class="row">
                                <div class="col-sm">
                                <input type="text" id="${user.id}-account-userName" class ="form-control" placeholder="Username">
                                </div>
                                <div class="col-sm">
                                <input type="text" id="${user.id}-account-password" class="form-control" placeholder="Password">
                                </div>
                            </div>
                            <button id="${user.id}-new-account" onclick="DOMManager.addAccount('${user.id}')" class ="btn btn-primary form-control">Login</button>
                        </div>
                    </div>
                 </div><br>`
            );
          /* user.accounts.push({userName: "name" , password: "password1"})
           user.accounts.push({userName: "name2" , password: "password2"})

            console.log(user.accounts)*/
            for(let account of user.accounts) {
            
                $(`#${user.id}`).find('.card-body').append(
                    `<P>
                    <span id="userName-${account.id}"><strong>Username:</strong> ${account.userName}</span>
                    <span id="password-${account.id}"><strong>Password:</strong> ${account.password}</span>
                    <button class="btn btn-danger" onclick="DOMManager.deleteAccount('${user.id}','${account.id}')"> Delete Account</button>
                    </P>`);
                } 
        }
    }


}
$('#create-new-user').on('click', function () {
    DOMManager.createUser($('#new-user-name').val());
    $('#new-user-name').val('');
});
DOMManager.getAllUsers();

