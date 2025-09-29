<template>
  <div
    class="card mx-6 mb-12 pl-4 py-3 sticky top-0 z-50 bg-[var(--p-panel-background)] m-2 rounded-lg !shadow-[5px_5px_10px_rgba(0,0,0,0.3)] dark:!shadow-[5px_5px_10px_rgba(52,211,153,0.3)]"
  >
    <Drawer v-model:visible="visible">
      <template #container="{ closeCallback }">
        <div class="flex flex-col h-full">
          <div class="flex items-center justify-between px-6 pt-4 shrink-0">
            <span class="inline-flex items-center gap-2">
              <Image src="/logo.png" alt="Image" width="43" />
              <span class="font-semibold text-2xl text-primary">ASTA CITA</span>
            </span>
            <span>
              <Button
                type="button"
                @click="closeCallback"
                icon="pi pi-times"
                rounded
                variant="outlined"
              ></Button>
            </span>
          </div>
          <div class="overflow-y-auto">
            <ul class="list-none p-4 m-0">
              <li>
                <div
                  v-ripple
                  v-styleclass="{
                    selector: '@next',
                    enterFromClass: 'hidden',
                    enterActiveClass: 'animate-slidedown',
                    leaveToClass: 'hidden',
                    leaveActiveClass: 'animate-slideup',
                  }"
                  class="p-4 flex items-center justify-between text-surface-500 dark:text-surface-400 cursor-pointer p-ripple"
                >
                  <span class="font-medium">DASHBOARD</span>
                  <i class="pi pi-chevron-down"></i>
                </div>
                <ul class="list-none p-0 m-0 overflow-hidden">
                  <li>
                    <router-link to="/" @click="closeCallback">
                      <a
                        v-ripple
                        class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
                      >
                        <i class="pi pi-chart-bar mr-2"></i>
                        <span class="font-medium">Gambaran Perekonomian</span>
                      </a>
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/asta1" @click="closeCallback">
                      <a
                        v-ripple
                        class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
                      >
                        <i class="pi pi-users mr-2"></i>
                        <span class="font-medium"
                          >Ideologi, Demokrasi, HAM</span
                        >
                      </a>
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/" @click="closeCallback">
                      <a
                        v-ripple
                        class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
                      >
                        <i class="pi pi-shield mr-2"></i>
                        <span class="font-medium">Pertahanan & Swasembada</span>
                      </a>
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/" @click="closeCallback">
                      <a
                        v-ripple
                        class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
                      >
                        <i class="pi pi-briefcase mr-2"></i>
                        <span class="font-medium"
                          >Lapangan Kerja & Infrastruktur</span
                        >
                      </a>
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/" @click="closeCallback">
                      <a
                        v-ripple
                        class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
                      >
                        <i class="pi pi-graduation-cap mr-2"></i>
                        <span class="font-medium"
                          >SDM, Pendidikan, Kesehatan</span
                        >
                      </a>
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/" @click="closeCallback">
                      <a
                        v-ripple
                        class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
                      >
                        <i class="pi pi-cog mr-2"></i>
                        <span class="font-medium"
                          >Hilirisasi & Industrialisasi</span
                        >
                      </a>
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/" @click="closeCallback">
                      <a
                        v-ripple
                        class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
                      >
                        <i class="pi pi-home mr-2"></i>
                        <span class="font-medium">Pembangunan Desa</span>
                      </a>
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/" @click="closeCallback">
                      <a
                        v-ripple
                        class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
                      >
                        <i class="pi pi-book mr-2"></i>
                        <span class="font-medium"
                          >Reformasi Politik & Hukum</span
                        >
                      </a>
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/" @click="closeCallback">
                      <a
                        v-ripple
                        class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
                      >
                        <i class="pi pi-globe mr-2"></i>
                        <span class="font-medium">Lingkungan & Toleransi</span>
                      </a>
                    </router-link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div class="mt-auto">
            <hr
              class="mb-4 mx-4 border-t border-0 border-surface-200 dark:border-surface-700"
            />
            <a
              v-ripple
              class="m-4 flex items-center cursor-pointer p-4 gap-2 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
            >
              <Avatar image="logo-dpn.png" shape="circle" />
              <span class="font-bold">Dewan Pertahanan Nasional</span>
            </a>
          </div>
        </div>
      </template>
    </Drawer>
    <div class="flex">
      <Button icon="pi pi-bars" @click="visible = true" />
      <span class="inline-flex items-center gap-2 ml-6">
        <Image src="/logo.png" alt="Image" width="43" />
        <span class="font-semibold text-2xl text-primary">ASTA CITA</span>
      </span>
    </div>
  </div>
  <RouterView />
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
import { ref } from "vue";

const visible = ref(false);
</script>
