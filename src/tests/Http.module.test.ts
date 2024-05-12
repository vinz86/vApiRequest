// Http.module.test.ts
import { http } from '../modules/Http.module';
import {api} from "../Api";
import {useApiStore} from "../ApiStore";
import 'jest-localstorage-mock'
import {ApiResponse} from "../ApiModels";


api.setDefaultClient('axios');
api.setUseStore(true);
api.setApiBaseUrl({dev:'https://jsonplaceholder.typicode.com', test:'', prod:''});

describe('HTTP Module', () => {

    test('Modulo http GET '+api.getDefaultClient(), async () => {
        const reqConfig = {
            queryParams: {},
            pathParams: {id:1}
        };

        let result = await api.http.get('/posts/1', reqConfig);
        let urlStore = api.getRequestUrl('/posts/1', reqConfig.queryParams);
        let resultStore = useApiStore().getData({module: 'http', method: 'GET', endpoint: urlStore, payload: {}});

        expect(result).not.toBeUndefined();
        expect(typeof result).toBe("object");
        expect(result.data).toEqual({
            "userId": 1,
            "id": 1,
            "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
            "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
        });
        if(api.getUseStore()) {
            expect(resultStore).toEqual(result.data);
        }
    });

    test('Modulo http HEAD '+api.getDefaultClient(), async () => {
        const reqConfig = {
            queryParams: {test:1},
            pathParams: {id:1}
        };

        let result = await api.http.head('/comments', reqConfig);

        expect(result).not.toBeUndefined();
        expect(result.data).toEqual("")
        // Aggiungi ulteriori asserzioni se necessario
    });

    test('Modulo http POST '+api.getDefaultClient(), async () => {
        const reqConfig = {
            queryParams: {},
            pathParams: {id:1},
            data: {postId: 123}
        };

        let result = await api.http.post('/comments', reqConfig);
        let urlStore = api.getRequestUrl('/comments', reqConfig.queryParams);
        let resultStore = useApiStore().getData({module: 'http', method: 'POST', endpoint: urlStore, payload: reqConfig.data});

        expect(result).not.toBeUndefined();
        expect(typeof result).toBe("object");
        if(api.getUseStore()) {
            expect(resultStore).toEqual(result.data);
        }
    });

    test('Modulo http PUT '+api.getDefaultClient(), async () => {
        const reqConfig = {
            queryParams: {},
            pathParams: {id:1},
            data: {postId: 13}
        };

        let result = await api.http.put('/posts/1', reqConfig);
        let urlStore = api.getRequestUrl('/posts/1', reqConfig.queryParams);
        let resultStore = useApiStore().getData({module: 'http', method: 'PUT', endpoint: urlStore, payload: reqConfig.data});

        expect(result).not.toBeUndefined();
        expect(typeof result).toBe("object");
        if(api.getUseStore()) {
            expect(resultStore).toEqual(result.data);
        }
    });

    test('Modulo http PATCH '+api.getDefaultClient(), async () => {
        const reqConfig = {
            queryParams: {},
            pathParams: {id:1},
            data: {postId: 13, body: 'text'}
        };

        let result = await api.http.patch('/posts/2', reqConfig);
        let urlStore = api.getRequestUrl('/posts/2', reqConfig.queryParams);
        let resultStore = useApiStore().getData({module: 'http', method: 'PATCH', endpoint: urlStore, payload: reqConfig.data});

        expect(result).not.toBeUndefined();
        expect(typeof result).toBe("object");
        if(api.getUseStore()) {
            expect(resultStore).toEqual(result.data);
        }
    });

    test('Modulo http DELETE '+api.getDefaultClient(), async () => {
        const reqConfig = {}

        let result = await api.http.delete('/posts/1', reqConfig);

        expect(result).not.toBeUndefined();
        expect(typeof result).toBe("object");
        expect(result.data).toEqual({});

    });
});
