import client from './client';

export const login = ({ identifier, password }) =>
    client.post('/auth/local', { identifier, password });

export const register = ({ identifier, password }) =>
    client.post('/auth/local/register', { identifier, password })

// export const TOKEN = ({ jwt }) =>
//     client.post('http://localhost:1337/auth/local', { jwt });

// export const check = () => client.get('/auth/local/check');

export const check = async ctx => {
    const { auth } = ctx.state;
    if(!auth) {
        ctx.status = 401;
        return;
    }
    ctx.body = auth;
};

export const logout = () => client.post('/auth/local/logout');