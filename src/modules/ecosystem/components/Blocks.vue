<template>
  <div>
   <ul>
       <!-- <li>
           <RandomBlock/>
       </li>
       <li>
           <ForceBlockOne/>
       </li>
       <li>
           <ForceBlockTwo/>
       </li> -->
        <!-- <li>
           <AngularOne/>
       </li> -->
       <li>
           <Asteroids/>
       </li>
   </ul>
  </div>
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
}
li {
    list-style-type: none;
    margin: 1rem;
}
</style>
