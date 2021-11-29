<template>
    <router-view></router-view>
</template>

<script>
import { TestService } from '@/common/services/test.service.ts';
export default {
    name : 'App',
    mounted () {
        console.log('init');
        TestService.testFn();
    }
}
</script>

<style>

</style>