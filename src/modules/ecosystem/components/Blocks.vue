<template>
  <div>
   <ul>
       <li>
           <WalkerBlock></WalkerBlock>
       </li>
   </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import WalkerBlock from '@/modules/ecosystem/components/WalkerBlock.vue';

@Component({
    components: {
        WalkerBlock,
    },
})
export default class Blocks extends Vue {}
</script>
