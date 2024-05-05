<script setup lang="ts">
import { inject } from 'vue'

const api: any = inject('api');
const useApiStore: any = inject('useApiStore');

// Prova Http con store
async function provaModuloHttpStore() {
  try {
    api.setUseStore(true);
    api.setDefaultClient('fetch')
    api.setApiBaseUrl({test:"", prod:'', dev: 'https://jsonplaceholder.typicode.com' });

    let response = await api.todos.getTodo({pathParams: { id: 1 }});
    let testStore = await useApiStore().getData({ module: 'todos', endpoint:'/todos/1'});
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
  } catch (error) {
    console.error('Errore durante la chiamata:', error);
  }
}

provaModuloHttpStore();

</script>

<template>
  <main>
    &nbsp;
  </main>
</template>
