<template>
  <div>
   <ul>
       <li>
           <WalkerBlock></WalkerBlock>
       </li>
       <li>
           <MoverBlock></MoverBlock>
       </li>
   </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import WalkerBlock from '@/modules/ecosystem/components/WalkerBlock.vue';
import MoverBlock from '@/modules/ecosystem/components/MoverBlock.vue';

@Component({
    components: {
        WalkerBlock,
        MoverBlock,
    },
})
export default class Blocks extends Vue {}
</script>
