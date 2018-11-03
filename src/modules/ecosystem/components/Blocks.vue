<template>

  <Asteroids/>
   <!-- <RandomBlock/> -->
   <!-- <ForceBlockOne/> -->
   <!-- <ForceBlockTwo/> -->
    <!-- <AngularOne/> -->
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import ForceBlockOne from '@/modules/ecosystem/components/ForceBlockOne.vue';
import ForceBlockTwo from '@/modules/ecosystem/components/ForceBlockTwo.vue';
import RandomBlock from '@/modules/ecosystem/components/RandomBlock.vue';
import AngularOne from '@/modules/ecosystem/components/AngularOne.vue';
import Asteroids from '@/modules/ecosystem/components/Asteroids.vue';

@Component({
    components: {
        RandomBlock,
        ForceBlockOne,
        ForceBlockTwo,
        AngularOne,
        Asteroids,
    },
})
export default class Blocks extends Vue {}
</script>

<style scoped>
ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    margin: 0;
    padding: 0;
}
li {
    list-style-type: none;
    margin: 1rem 0;
    width: 100%;
}
</style>
