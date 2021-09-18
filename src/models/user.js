import { types, Instance, SnapshotOut, flow } from 'mobx-state-tree';
import { APIURL } from '../constants/urls';

const UserInfo = types.model('UserInfo', {
    id: types.number,
    role_id: types.number,
    name: types.string,
    email: types.string,
    mobile_number: types.string,
    email_verified_at: types.maybeNull(types.string),
    status: types.string,
    image: types.string,
    created_at: types.string,
    updated_at: types.string,
});

export const User = types
    .model('User', {
        token: '',
        user: types.maybe(UserInfo),
    })
    .actions((self) => ({
        logIn: flow(function* (phone, password) {
            console.log(phone+' and '+password)
            const formdata = new FormData();
            formdata.append('password', password);
            formdata.append('phone', phone);
      
            const requestOptions = {
              method: 'POST',
              body: formdata,
              redirect: 'follow',
            };
            try {
                 console.log(APIURL + 'login')
              const res = yield fetch(APIURL + 'login', requestOptions);
              if (res.status !== 200) {
                console.log(res.status);
                throw new Error('Invalid Login Info');
              }
              const json = yield res.json();
              self.token = json.response.token;
              self.user = json.response.user;
              return json.response.user.name;
            } catch (error) {
              throw error;
            }
          }),
        
        signUp: flow(function* (name, phone, password) {
            const formdata = new FormData();
            formdata.append('password', password);
            formdata.append('phone', phone);
            formdata.append('name', name);

            console.log(formdata);

            const requestOptions = {
                method: 'POST',
                body: formdata,
                redirect: 'follow',
            };
            try {
                const res = yield fetch(APIURL + 'register', requestOptions);
                if (res.status !== 200) {
                    const { response } = yield res.json();
                    throw new Error(`${res.status} | ${res.statusText} | ${response}`);
                }
                const json = yield res.json();
                self.token = json.response.token;
                const userData = {
                    ...json.response.user,
                    email_verified_at: null,
                    image: 'default.png',
                    status: '0',
                };
                console.log(userData);
                self.user = userData;
                return json.response.user.name;
            } catch (error) {
                throw error;
            }
        }),
        logout() {
            self.token = '';
            self.user = undefined;
        },
    }))
    .views((self) => ({
        get isLoggedIn() {
            return !!self.token;
        },
    }));