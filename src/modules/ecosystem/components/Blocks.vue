<template>
  <div>
   <ul>
       <li>
           <RandomBlock/>
       </li>
       <li>
           <ForceBlockOne/>
       </li>
       <li>
           <ForceBlockTwo/>
       </li>
   </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ForceBlockOne from '@/modules/ecosystem/components/ForceBlockOne.vue';
import ForceBlockTwo from '@/modules/ecosystem/components/ForceBlockTwo.vue';
import RandomBlock from '@/modules/ecosystem/components/RandomBlock.vue';

@Component({
    components: {
        RandomBlock,
        ForceBlockOne,
        ForceBlockTwo,
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
