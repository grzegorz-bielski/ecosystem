<template>
   <div>
        <CanvasResponsive>
            <Triangle/>
        </CanvasResponsive>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import CanvasResponsive from '@/modules/ecosystem/components/CanvasResponsive.vue';
import Triangle from '@/modules/ecosystem/components/Triangle.vue';

import { Vector } from '@/modules/ecosystem/services/Vector';
import { getRand, animate } from '@/modules/ecosystem/helpers';
import { RenderTypes } from '@/modules/ecosystem/models/ecosystemModels';
import { Ship } from '@/modules/ecosystem/services/entities';

@Component({
    components: {
        CanvasResponsive,
        Triangle,
    },
})
export default class Asteroids2 extends Vue {}
</script>
