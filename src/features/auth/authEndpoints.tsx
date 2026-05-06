import { Hono } from 'hono'
import { getCookie, setCookie, deleteCookie } from 'hono/cookie'
import Login from './components/Login'

const app = new Hono()

const SESSION_COOKIE = 'auth_session';
const SESSION_VALUE = 'authenticated';

app.get('/login', (c) => {
    const error = c.req.query('error');
    return c.html(<Login error={error} />)
})

app.post('/auth/login', async (c) => {
    const body = await c.req.parseBody();
    const pin = String(body.Pin ?? '');
    const expectedPin = process.env.PIN_CODE;

    if (!expectedPin || pin !== expectedPin) {
        return c.redirect('/login?error=Invalid+PIN');
    }

    setCookie(c, SESSION_COOKIE, SESSION_VALUE, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Lax',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/',
    });

    return c.redirect('/');
})

app.post('/auth/logout', (c) => {
    deleteCookie(c, SESSION_COOKIE, { path: '/' });
    return c.redirect('/login');
})

export function authMiddleware() {
    return async (c: any, next: any) => {
        const session = getCookie(c, SESSION_COOKIE);
        if (session !== SESSION_VALUE) {
            return c.redirect('/login');
        }
        await next();
    }
}

export default app;
