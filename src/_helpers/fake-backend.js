// array in local storage for registered users
let users = JSON.parse(localStorage.getItem('users')) || [];
let user = JSON.parse(localStorage.getItem('user')) || [];

export function configureFakeBackend() {
    let realFetch = window.fetch;
    window.fetch = function (url, opts) {
        const { method, headers } = opts;
        const body = opts.body && JSON.parse(opts.body);

        return new Promise((resolve, reject) => {
            setTimeout(handleRoute, 500);

            function handleRoute() {
                switch (true) {
                    case url.endsWith('/users/authenticate') && method === 'POST':
                        return authenticate();
                    case url.endsWith('/users/register') && method === 'POST':
                        return register();
                    case url.endsWith('/users') && method === 'GET':
                        return getUsers();
                    case url.match(/\/users\/\d+$/) && method === 'DELETE':
                        return deleteUser();
                    case url.match(/\/users\/\d+$/) && method === 'GET':
                        return getUser();
                    case url.match(/\/users\/\d+$/) && method === 'PUT':
                        return updateUser();
                    default:
                        // pass through any requests not handled above
                        return realFetch(url, opts)
                            .then(response => resolve(response))
                            .catch(error => reject(error));
                }
            }

            // route functions

            function authenticate() {
                const { username, password } = body;
                const user = users.find(x => x.username === username && x.password === password);
                if (!user) return error('Username or password is incorrect');
                return ok({
                    id: user.id,
                    name: user.name,
                    age: user.age,
                    email: user.email,
                    address: user.address,
                    token: 'fake-jwt-token'
                });
            }

            function register() {
                const user = body;

                if (users.find(x => x.email == user.email)) {
                    return error(`Email  ${user.email} is already taken`);
                }

                // assign user id and a few other properties then save
                user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
                users.push(user);
                localStorage.setItem('users', JSON.stringify(users));

                return ok();
            }

            function getUsers() {
                return ok(users);
            }

            function deleteUser() {
                users = users.filter(x => x.id !== idFromUrl());
                localStorage.setItem('users', JSON.stringify(users));
                return ok();
            }

            function getUser() {
                user = users.filter(x => x.id === idFromUrl());
                localStorage.setItem('user', JSON.stringify(user));
                return ok(user);
            }

            function updateUser() {
                let temUser = JSON.parse(localStorage.getItem('user'))
                users.map((user, index)=>{
                    if(user.id === idFromUrl()){
                        user.name = temUser.name;
                        user.address = temUser.address;
                        user.age = temUser.age;
                        user.email = temUser.email;
                    }
                })
                localStorage.setItem('users', JSON.stringify(users));
                return ok(user);
            }
            // helper functions

            function ok(body) {
                resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(body)) });
            }

            function error(message) {
                resolve({ status: 400, text: () => Promise.resolve(JSON.stringify({ message })) });
            }

            function idFromUrl() {
                const urlParts = url.split('/');
                return parseInt(urlParts[urlParts.length - 1]);
            }
        });
    }
}