// Http.module.test.ts
import { http } from '../modules/Http.module';
import {api} from "../Api";
import {useApiStore} from "../ApiStore";
import 'jest-localstorage-mock'
import {ApiResponse} from "../ApiModels";


api.setDefaultClient('fetch');
api.setUseStore(false);
api.setApiBaseUrl({dev:'https://jsonplaceholder.typicode.com', test:'', prod:''});

describe('HTTP Module', () => {

    test('Modulo http GET '+api.getDefaultClient(), async () => {
        const reqConfigGET = new Map<string, any>();
        reqConfigGET.set('responseType', 'arraybuffer');
        reqConfigGET.set('queryParams', {postId: "1"});
        reqConfigGET.set('pathParams', {id: 1});

        let result = await api.http.get('/posts/1', reqConfigGET);

        expect(result).not.toBeUndefined();
        expect(typeof result).toBe("object");
        expect(result.data).toEqual({
            "userId": 1,
            "id": 1,
            "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
            "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
        });
    });

    test('Modulo http DELETE '+api.getDefaultClient(), async () => {
        const reqConfigDELETE = new Map<string, any>();
        reqConfigDELETE.set('pathParams', {id: 1});

        let result = await api.http.delete('/posts/1', reqConfigDELETE);

        expect(result).not.toBeUndefined();
        expect(typeof result).toBe("object");
        expect(result.data).toEqual({});

    });

    test('Modulo http HEAD'+api.getDefaultClient(), async () => {
        const reqConfigHEAD = new Map<string, any>();
        reqConfigHEAD.set('responseType', 'arraybuffer');
        reqConfigHEAD.set('queryParams', {postId: "1"});

        let result = await api.http.head('/comments', reqConfigHEAD);

        expect(result).not.toBeUndefined();
        // Aggiungi ulteriori asserzioni se necessario
    });

    test('Modulo http POST '+api.getDefaultClient(), async () => {
        const reqConfigPOST = new Map<string, any>();
        reqConfigPOST.set('pathParams', {id: 1});
        reqConfigPOST.set('data', {postId: 1});

        let result = await api.http.post('/posts', reqConfigPOST);

        expect(result).not.toBeUndefined();
        // Aggiungi ulteriori asserzioni se necessario
    });

    test('Modulo http PUT '+api.getDefaultClient(), async () => {
        const reqConfigPUT = new Map<string, any>();
        reqConfigPUT.set('pathParams', {id: 1});
        reqConfigPUT.set('data', {postId: 1});

        let result = await api.http.put('/posts/1', reqConfigPUT);

        expect(result).not.toBeUndefined();
        // Aggiungi ulteriori asserzioni se necessario
    });

    test('Modulo http PATCH '+api.getDefaultClient(), async () => {
        const reqConfigPATCH = new Map<string, any>();
        reqConfigPATCH.set('pathParams', {id: 1});
        reqConfigPATCH.set('data', {postId: 1});

        let result = await api.http.patch('/posts/1', reqConfigPATCH);

        expect(result).not.toBeUndefined();
        // Aggiungi ulteriori asserzioni se necessario
    });
});
