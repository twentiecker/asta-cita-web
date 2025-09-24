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
    class="hover:shadow-xl hover:scale-[1.02] transition-all duration-300 rounded-xl"
  >
    <!-- Summary -->
    <template #subtitle>
      <p class="font-semibold leading-[1.4]">{{ summary }}</p>
      <Button
        label="[Show More]"
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
          severity="info"
          variant="text"
          @click="isShowMore = false"
        />
      </div>
    </template>
  </Card>
</template>
