--------------
Backend: https://waterwise-backend.onrender.com
Frontend: https://water-wise-frontend.vercel.app
--------------

const app = express();
app.use(
cors({
origin: ${CLIENT_DOMAIN},
credentials: true,
}),
);
app.use(cookieParser());

export const GenerateCookie = (session, res) => {
res.cookie(COOKIE.REFRESH_TOKEN, session.refreshToken, {
httpOnly: true,
sameSite: 'None',
expires: new Date(Date.now() + TIME_DURATION.THIRTY_DAYS),
secure: true,
});

res.cookie(COOKIE.SESSION_ID, session.id, {
httpOnly: true,
sameSite: 'None',
expires: new Date(Date.now() + TIME_DURATION.THIRTY_DAYS),
secure: true,
});
};
export const resAccessOriginHeaders = (res) => {
res.header('Access-Control-Allow-Origin', ${CLIENT_DOMAIN});
res.header('Access-Control-Allow-Credentials', 'true');
};

import { selectUserToken } from 'src/redux/users/selectors.js';
import axios from 'axios';
import CONSTANTS from 'src/components/Constants/constants.js';
import store from 'src/redux/store.js';

export const Axios = axios.create({
baseURL: CONSTANTS.AXIOS.baseURL,
});

export const AxiosWithCredentials = axios.create({
baseURL: CONSTANTS.AXIOS.baseURL,
withCredentials: true,
});

AxiosWithCredentials.interceptors.request.use(
config => {
const state = store.getState();
const token = selectUserToken(state);
if (token) {
config.headers.Authorization = Bearer ${token};
}
return config;
},
error => {
return Promise.reject(error);
},
);

где CONSTANTS.AXIOS.baseURL = https://waterwise-backend.onrender.com

Настройка Backend
Настройка CORS и CookieParser:

javascript
Copy code
const app = express();
app.use(
cors({
origin: `${CLIENT_DOMAIN}`, // Указание разрешенного источника
credentials: true, // Разрешение отправки учетных данных (cookies)
})
);
app.use(cookieParser());
Генерация Cookies:

javascript
Copy code
export const GenerateCookie = (session, res) => {
res.cookie(COOKIE.REFRESH_TOKEN, session.refreshToken, {
httpOnly: true,
sameSite: 'None',
expires: new Date(Date.now() + TIME_DURATION.THIRTY_DAYS),
secure: true, // Устанавливаем куки только по HTTPS
});

res.cookie(COOKIE.SESSION_ID, session.id, {
httpOnly: true,
sameSite: 'None',
expires: new Date(Date.now() + TIME_DURATION.THIRTY_DAYS),
secure: true, // Устанавливаем куки только по HTTPS
});
};
Настройка заголовков для CORS:

javascript
Copy code
export const resAccessOriginHeaders = (res) => {
res.header('Access-Control-Allow-Origin', `${CLIENT_DOMAIN}`);
res.header('Access-Control-Allow-Credentials', 'true');
};
Настройка Frontend
Создание экземпляров Axios:

javascript
Copy code
import { selectUserToken } from 'src/redux/users/selectors.js';
import axios from 'axios';
import CONSTANTS from 'src/components/Constants/constants.js';
import store from 'src/redux/store.js';

export const Axios = axios.create({
baseURL: CONSTANTS.AXIOS.baseURL,
});

export const AxiosWithCredentials = axios.create({
baseURL: CONSTANTS.AXIOS.baseURL,
withCredentials: true, // Разрешение отправки cookies
});

AxiosWithCredentials.interceptors.request.use(
config => {
const state = store.getState();
const token = selectUserToken(state);
if (token) {
config.headers.Authorization = `Bearer ${token}`;
}
return config;
},
error => {
return Promise.reject(error);
},
);
CONSTANTS.AXIOS.baseURL:

javascript
Copy code
CONSTANTS.AXIOS.baseURL = 'https://waterwise-backend.onrender.com';

CORS:

В express вы настроили CORS так, чтобы разрешать запросы с вашего фронтенд-домена (https://water-wise-frontend.vercel.app).
credentials: true позволяет отправлять куки и другие учетные данные в кросс-доменных запросах.
Cookies:

В функции GenerateCookie вы установили sameSite: 'None' и secure: true, что позволяет отправлять куки в кросс-доменных запросах только через HTTPS.
Axios:

Вы создали экземпляр AxiosWithCredentials с withCredentials: true, что позволяет отправлять куки с запросами.
Вы настроили интерцептор, который добавляет токен авторизации к заголовкам запросов, если он доступен в состоянии Redux.

---

Backend: https://waterwise-backend.onrender.com
Frontend: http://localhost:5173

---

const app = express();
app.use(
cors({
origin: ${CLIENT_DOMAIN},
credentials: true,
}),
);
app.use(cookieParser());

export const GenerateCookie = (session, res) => {
res.cookie(COOKIE.REFRESH_TOKEN, session.refreshToken, {
httpOnly: true,
sameSite: 'None',
expires: new Date(Date.now() + TIME_DURATION.THIRTY_DAYS),
secure: false,
});

res.cookie(COOKIE.SESSION_ID, session.id, {
httpOnly: true,
sameSite: 'None',
expires: new Date(Date.now() + TIME_DURATION.THIRTY_DAYS),
secure: false,
});
};
export const resAccessOriginHeaders = (res) => {
res.header('Access-Control-Allow-Origin', ${CLIENT_DOMAIN});
res.header('Access-Control-Allow-Credentials', 'true');
};

import { selectUserToken } from 'src/redux/users/selectors.js';
import axios from 'axios';
import CONSTANTS from 'src/components/Constants/constants.js';
import store from 'src/redux/store.js';

export const Axios = axios.create({
baseURL: CONSTANTS.AXIOS.baseURL,
});

export const AxiosWithCredentials = axios.create({
baseURL: CONSTANTS.AXIOS.baseURL,
withCredentials: true,
});

AxiosWithCredentials.interceptors.request.use(
config => {
const state = store.getState();
const token = selectUserToken(state);
if (token) {
config.headers.Authorization = Bearer ${token};
}
return config;
},
error => {
return Promise.reject(error);
},
);

где CONSTANTS.AXIOS.baseURL = https://waterwise-backend.onrender.com

Настройка Backend
Настройка CORS и CookieParser:

javascript
Copy code
const app = express();
app.use(
cors({
origin: 'http://localhost:5173', // Указание вашего локального источника
credentials: true, // Разрешение отправки учетных данных (cookies)
})
);
app.use(cookieParser());
Генерация Cookies:

javascript
Copy code
export const GenerateCookie = (session, res) => {
res.cookie(COOKIE.REFRESH_TOKEN, session.refreshToken, {
httpOnly: true,
sameSite: 'None', // Позволяет отправку куки в кросс-доменных запросах
expires: new Date(Date.now() + TIME_DURATION.THIRTY_DAYS),
secure: false, // Устанавливаем secure на false для локальной разработки
});

res.cookie(COOKIE.SESSION_ID, session.id, {
httpOnly: true,
sameSite: 'None', // Позволяет отправку куки в кросс-доменных запросах
expires: new Date(Date.now() + TIME_DURATION.THIRTY_DAYS),
secure: false, // Устанавливаем secure на false для локальной разработки
});
};
Настройка заголовков для CORS:

javascript
Copy code
export const resAccessOriginHeaders = (res) => {
res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
res.header('Access-Control-Allow-Credentials', 'true');
};
Настройка Frontend

Создание экземпляров Axios:

javascript
Copy code
import { selectUserToken } from 'src/redux/users/selectors.js';
import axios from 'axios';
import CONSTANTS from 'src/components/Constants/constants.js';
import store from 'src/redux/store.js';

export const Axios = axios.create({
baseURL: CONSTANTS.AXIOS.baseURL,
});

export const AxiosWithCredentials = axios.create({
baseURL: CONSTANTS.AXIOS.baseURL,
withCredentials: true, // Разрешение отправки cookies
});

AxiosWithCredentials.interceptors.request.use(
config => {
const state = store.getState();
const token = selectUserToken(state);
if (token) {
config.headers.Authorization = `Bearer ${token}`;
}
return config;
},
error => {
return Promise.reject(error);
},
);

CONSTANTS.AXIOS.baseURL:

javascript
Copy code
CONSTANTS.AXIOS.baseURL = 'https://waterwise-backend.onrender.com';
Проверка конфигурации
CORS:

В express вы настроили CORS так, чтобы разрешать запросы с вашего локального фронтенд-домена (http://localhost:5173).
credentials: true позволяет отправлять куки и другие учетные данные в кросс-доменных запросах.
Cookies:

В функции GenerateCookie вы установили sameSite: 'None', что позволяет отправлять куки в кросс-доменных запросах.
Для локальной разработки вы установили secure: false, что корректно, так как ваши запросы будут отправляться по HTTP.
Axios:

Вы создали экземпляр AxiosWithCredentials с withCredentials: true, что позволяет отправлять куки с запросами.
Вы настроили интерцептор, который добавляет токен авторизации к заголовкам запросов, если он доступен в состоянии Redux.

middleware for backend - res.headers

const setCorsHeaders = (res) => {
res.header('Access-Control-Allow-Origin', CLIENT_DOMAIN);
res.header('Access-Control-Allow-Credentials', 'true');
};

app.use((req, res, next) => {
setCorsHeaders(res);
next();
});

---

Backend: http://localhost:3000
Frontend: http://localhost:5173

---

Настройка Backend
Настройка CORS и CookieParser:
javascript
Copy code
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const CLIENT_DOMAIN = 'http://localhost:5173';

app.use(cors({
origin: CLIENT_DOMAIN, // Указание вашего локального источника
credentials: true, // Разрешение отправки учетных данных (cookies)
}));

app.use(cookieParser());

const setCorsHeaders = (res) => {
res.header('Access-Control-Allow-Origin', CLIENT_DOMAIN);
res.header('Access-Control-Allow-Credentials', 'true');
};

app.use((req, res, next) => {
setCorsHeaders(res);
next();
});

// Пример маршрута
app.get('/some-route', (req, res) => {
setCorsHeaders(res); // Опционально, если уже использован middleware выше
res.send('Hello World');
});

// Пример функции для генерации куки
const GenerateCookie = (session, res) => {
res.cookie('REFRESH*TOKEN', session.refreshToken, {
httpOnly: true,
sameSite: 'None', // Позволяет отправку куки в кросс-доменных запросах
expires: new Date(Date.now() + 30 * 24 _ 60 _ 60 \_ 1000), // 30 дней
secure: false, // Устанавливаем secure на false для локальной разработки
});

res.cookie('SESSION*ID', session.id, {
httpOnly: true,
sameSite: 'None', // Позволяет отправку куки в кросс-доменных запросах
expires: new Date(Date.now() + 30 * 24 _ 60 _ 60 \_ 1000), // 30 дней
secure: false, // Устанавливаем secure на false для локальной разработки
});
};

// Пример использования функции GenerateCookie
app.get('/set-cookie', (req, res) => {
const session = { refreshToken: 'some-refresh-token', id: 'session-id' };
GenerateCookie(session, res);
res.send('Cookies set');
});

app.listen(3000, () => {
console.log('Server is running on port 3000');
});
Настройка Frontend
Создание экземпляров Axios:

javascript
Copy code
import { selectUserToken } from 'src/redux/users/selectors.js';
import axios from 'axios';
import CONSTANTS from 'src/components/Constants/constants.js';
import store from 'src/redux/store.js';

export const Axios = axios.create({
baseURL: CONSTANTS.AXIOS.baseURL,
});

export const AxiosWithCredentials = axios.create({
baseURL: CONSTANTS.AXIOS.baseURL,
withCredentials: true, // Разрешение отправки cookies
});

AxiosWithCredentials.interceptors.request.use(
config => {
const state = store.getState();
const token = selectUserToken(state);
if (token) {
config.headers.Authorization = `Bearer ${token}`;
}
return config;
},
error => {
return Promise.reject(error);
},
);
CONSTANTS.AXIOS.baseURL:

javascript
Copy code
CONSTANTS.AXIOS.baseURL = 'http://localhost:3000';
Проверка конфигурации
CORS:

В express вы настроили CORS так, чтобы разрешать запросы с вашего локального фронтенд-домена (http://localhost:5173).
credentials: true позволяет отправлять куки и другие учетные данные в кросс-доменных запросах.
Cookies:

В функции GenerateCookie вы установили sameSite: 'None', что позволяет отправлять куки в кросс-доменных запросах.
Для локальной разработки вы установили secure: false, что корректно, так как ваши запросы будут отправляться по HTTP.
Axios:

Вы создали экземпляр AxiosWithCredentials с withCredentials: true, что позволяет отправлять куки с запросами.
Вы настроили интерцептор, который добавляет токен авторизации к заголовкам запросов, если он доступен в состоянии Redux.

---

## date local service

Для того чтобы функции startOfDay и endOfDay работали корректно с вашими данными и не приводили к неожиданным сдвигам из-за часового пояса, вы должны создать объекты Date из строки с указанием часового пояса. В вашем случае, если время приходит в формате '2024-07-02T22:02:27-04:00', это указывает на часовой пояс UTC-4.

Для корректной работы, вам нужно создать даты с правильным часовым поясом, чтобы startOfDay и endOfDay возвращали ожидаемые значения. Однако, учитывая, что функции startOfDay и endOfDay из библиотеки date-fns не поддерживают работу с часовыми поясами напрямую, решением может быть конвертация времени в локальное время перед использованием этих функций, исходя из вашего часового пояса (приложения), который, по всей видимости, находится в UTC.

Изменение функций startOfDay и endOfDay
Вам нужно использовать функцию parseISO для создания объекта Date из вашей ISO строки и затем использовать этот объект Date в функциях startOfDay и endOfDay.

javascript
Copy code
const getDailyWaterVolume = async ({ userId, chosenDate }) => {
console.log('chosenDate in service', chosenDate);

// Создаем объект Date из ISO строки, преобразуя в локальное время сервера
const dateObj = new Date(chosenDate);

const start = startOfDay(dateObj);
const end = endOfDay(dateObj);

console.log('start', start.toISOString());
console.log('end', end.toISOString());

try {
const dailyItems = await Models.WaterModel.find({
userId,
date: { $gte: start, $lte: end },
}, {
createdAt: 0,
updatedAt: 0,
});
console.log('dailyItems', dailyItems);
return dailyItems;
} catch (error) {
console.error('Error retrieving daily water volumes in service:', error);
}
};
Это изменение гарантирует, что временные метки начала и конца дня будут соответствовать локальному времени сервера, исходя из времени, предоставленного в запросе, без неожиданных сдвигов из-за часовых поясов.
