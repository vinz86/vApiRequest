<script setup lang="ts">
import { inject } from 'vue'
const api: any = inject('api');
const useApiStore: any = inject('useApiStore');
let testStore;
    /*
    // Prova Http con store
    async function testApi() {
      try {
        api.setUseStore(true);
        api.setDefaultClient('axios')
        api.setApiBaseUrl({test:"", prod:"", dev: 'https://jsonplaceholder.typicode.com' });

        let response = await api.todos.getTodo({pathParams: { id: 1 }});
        testStore = await useApiStore().getData({ module: 'todos', endpoint:'/todos/1'});
        console.log('Dato GET store:', testStore);
        console.log('Risposta GET:', response);

        const responseGetParams = await api.http.get('comments', { queryParams: { postId: "1" } });
        testStore = await useApiStore().getData({ module: 'http', endpoint: `/comments${api.getUrlParams({ postId: "1" })}` } );
        console.log('Dato GET store:', testStore);
        console.log('Risposta GET params:', responseGetParams);

        const responsePost = await api.http.post('posts', { data: { userId: 1, id: 1, title: 'delectus aut autem', completed: false } });
        console.log('Risposta POST', responsePost);

        const responsePatch = await api.http.patch('posts/1', { data: { userId: 1, id: 1, title: 'delectus aut autem', completed: false } });
        console.log('Risposta PATCH', responsePatch);

        const responsePut = await api.http.put('posts/1', { data: { userId: 1, id: 1, title: 'delectus aut autem', completed: false } });
        console.log('Risposta PUT', responsePut);

        const responseDelete = await api.http.delete('posts/1');
        console.log('Risposta DELETE:', responseDelete);

        testStore = await useApiStore().getAllData('http')
        console.log('getAllData http:', testStore);

        testStore = await useApiStore().getAllData('todos')
        console.log('getAllData todos:', testStore);

        useApiStore().clearData('http')
        testStore = await useApiStore().getAllData('http')
        console.log('getAllData store after clear:', testStore);

        // Simulo errore richiesta
        api.setDefaultClient('fetch')
        await api.http.get('commentjhnlks', { queryParams: { postId: "1", authenticate: true } });
        await api.todos.getTodo();

      } catch (error) {
        // Gestione degli errori globali
        console.log('Errore durante l\'esecuzione di testApi():' + error);
      }
    }
    */

// Prova Http con store
async function testApi() {
  try {
    api.setUseStore(true);
    api.setApiBaseUrl({test:"", prod:"", dev: 'https://jsonplaceholder.typicode.com' });

    //Test modulo
    let response = await api.todos.getTodo({pathParams: { id: 1 }});
    console.log('getTodo', response);


    // Test xhr
    api.setDefaultClient('xhr')
    const reqConfig = {
      queryParams: { postId: "1"},
      pathParams: { id: 1 },
      responseType: "arraybuffer"
    }

    const testXhr = await api.http.get('comments', reqConfig);
    console.log('test xhr', testXhr);
    //testStore = useApiStore().getData({ module: 'http', endpoint: `/comments${api.getUrlParams(reqConfig)`});
    //console.log('Dato GET store:', testStore);

    testStore = await useApiStore().getAllData('http')
    console.log('getAllData http:', testStore);

    // Test soap
    // api.setDefaultClient('soap')
    // api.setApiBaseUrl({test:"", prod:"", dev: '/public' });
    // api.setUseStore(true);
    // const testSoap = await api.http.post('xml/SoapData.xml', {action:'GetUserDetailsResponse'});
    // console.log('test soap', testSoap);


    api.setDefaultClient('fetch')
    api.setToken("TEST_TOKEN")
    const responsePost = await api.http.post('posts', { authenticate: true, data: { userId: 1, id: 1, title: 'delectus aut autem' } });
    console.log('Risposta POST', responsePost);

    // Simulo errore richiesta
    await api.http.get('commentjhnlks', {
      queryParams: { postId: "1"},
      pathParams: { id: 1 },
      authenticate: true
    });


  } catch (error) {
    // Gestione degli errori globali
    console.log('Errore durante l\'esecuzione di testApi():', error);
  }
}

testApi();

</script>

<template>
  <main>
  </main>
</template>
