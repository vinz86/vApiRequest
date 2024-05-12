<script setup lang="ts">
import { onMounted} from 'vue'
import { generateStoreDataKey } from 'vapirequest/src/ApiUtils';
import type { ApiObject } from 'vapirequest/src/ApiModels';
import {useNuxtApp} from "#app";

const {$api} = useNuxtApp() as unknown as ApiObject;
const {$useApiStore} = useNuxtApp() as unknown as any;

onMounted(async ()=> {
  const callConfig = {
    defaultClient: 'axios',
    defaultEnvironment: 'dev',
    useStore: false,
    apiBaseUrl: {
      dev: 'https://jsonplaceholder.typicode.com',
      test: 'http://localhost:5173',
      prod: 'http://localhost:5173'
    },
    apiPrefix: {dev: '', test: '', prod: ''},
    tokenKey: 'tokenApi',
    authType: 'basic'
  }

  await httpTest(callConfig);

})

async function httpTest(callConfig: any) {
  try {
    let reqConfigGET = {responseType: 'arraybuffer', queryParams: {postId: "1"}, pathParams: {id: 1}};
    let reqConfigPOST = {pathParams: {id: 1}, data: {postId: 1}};
    let reqConfigPATCH = {pathParams: {id: 1}, data: {postId: 1, appostId: 1}};
    let reqConfigPUT = {pathParams: {id: 1}, data: {postId: 1, rimpostId: 1}};
    let reqConfigDELETE = {pathParams: {id: 1}};

    $api.setDefaultClient(callConfig.defaultClient || 'fetch');
    $api.setUseStore(callConfig.useStore || true);
    $api.setDefaultEnvironment(callConfig.defaultEnvironment || true);
    $api.setApiBaseUrl(callConfig.apiBaseUrl || true);
    $api.setApiPrefix(callConfig.apiPrefix || true);
    $api.setTokenKey(callConfig.tokenKey || true);
    $api.setAuthType(callConfig.authType || true);

    // GET
    console.info('GET');
    let testGET = await $api.http.get('posts/{id}', reqConfigGET);
    let urlStoreGET = $api.getRequestUrl('/posts/1', reqConfigGET.queryParams);
    let storeGET = $useApiStore().getData({module: 'http', method: 'get', endpoint: urlStoreGET});
    console.log('  Risposta GET:', testGET);
    console.log('  Key Store GET:', generateStoreDataKey(urlStoreGET, "GET", {}));
    console.log('  Store GET:', storeGET);
    console.log('');

    // HEAD
    console.info('HEAD');
    let testHEAD = await $api.http.head('comments', reqConfigGET);
    console.log('  Risposta HEAD:', testHEAD);
    console.log('');

    // POST
    console.info('POST');
    let testPOST = await $api.http.post('posts', reqConfigPOST);
    let urlStorePOST = $api.getRequestUrl('/posts', {});
    let storePOST = $useApiStore().getData({
      module: 'http',
      method: 'post',
      endpoint: urlStorePOST,
      payload: reqConfigPOST.data
    });
    console.log('  Risposta POST:', testPOST);
    console.log('  Key Store POST:', generateStoreDataKey(urlStorePOST, "POST", reqConfigPOST.data || {}));
    console.log('  Store POST:', storePOST);
    console.log('');

    // PATCH
    console.info('PATCH');
    let testPATCH = await $api.http.patch('posts/{id}', reqConfigPATCH);
    let urlStorePATCH = $api.getRequestUrl('/posts/1', {});
    let storePATCH = $useApiStore().getData({
      module: 'http',
      method: 'patch',
      endpoint: urlStorePATCH,
      payload: reqConfigPATCH.data
    });
    console.log('  Risposta PATCH:', testPATCH);
    console.log('  Key Store PATCH:', generateStoreDataKey(urlStorePATCH, "PATCH", reqConfigPATCH.data || {}));
    console.log('  Store PATCH:', storePATCH);
    console.log('');

    // PUT
    console.info('PUT');
    let testPUT = await $api.http.put('posts/{id}', reqConfigPUT);
    let urlStorePUT = $api.getRequestUrl('/posts/1', {});
    let storePUT = $useApiStore().getData({
      module: 'http',
      method: 'put',
      endpoint: urlStorePUT,
      payload: reqConfigPUT.data
    });
    console.log('  Risposta PUT:', testPUT);
    console.log('  Key Store PUT:', generateStoreDataKey(urlStorePUT, "PUT", reqConfigPUT.data || {}));
    console.log('  Store PUT:', storePUT);
    console.log('');

    // DELETE
    console.info('DELETE');
    let testDELETE = await $api.http.delete('posts/{id}', reqConfigDELETE);
    console.log('  Risposta DELETE:', testDELETE);
    console.log('');

    // Tutti i dati dallo store
    const testStoreAll = await $useApiStore().getAllData('http')
    console.log('testStoreAll:', testStoreAll);
  }
  catch (error) {
    console.error(`Errore durante l'esecuzione di httpTest(callConfig)`, error);
  }
}
</script>

<template>
  <div>
<!--    <NuxtWelcome />-->
   Guarda la console (F12)
  </div>
</template>
