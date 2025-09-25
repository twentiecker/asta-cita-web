<script setup>
import { ref } from "vue";

const props = defineProps({
  summary: {
    type: String,
    required: true,
  },
});

const isShowMore = ref(false);
</script>

<template>
  <Card
    class="hover:shadow-xl hover:scale-[1.02] transition-all duration-300 rounded-xl !shadow-[5px_5px_10px_rgba(0,0,0,0.3)] dark:dark:!shadow-[5px_5px_10px_rgba(52,211,153,0.5)]"
  >
    <!-- Summary -->
    <template #subtitle>
      <p class="font-semibold leading-[1.4]">{{ summary }}</p>
      <Button
        label="[Show More]"
        size="small"
        severity="info"
        variant="text"
        @click="isShowMore = true"
        v-if="!isShowMore"
      />
    </template>

    <!-- Details -->
    <template #content>
      <div class="mt-4" v-if="isShowMore">
        <div class="leading-[1.4]">
          <!-- slot untuk details -->
          <slot name="details" />
        </div>
        <Button
          label="[Show Less]"
          size="small"
          severity="info"
          variant="text"
          @click="isShowMore = false"
        />
      </div>
    </template>
  </Card>
</template>
