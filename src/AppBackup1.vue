<template>
  <div class="p-4 lg:flex lg:h-screen">
    <!-- Drawer -->
    <div class="card flex justify-start lg:hidden">
      <Drawer v-model:visible="visible">
        <template #container="{ closeCallback }">
          <div class="flex flex-col h-full">
            <div class="flex items-center justify-between px-6 pt-4 shrink-0">
              <span class="inline-flex items-center gap-2">
                <svg
                  width="35"
                  height="40"
                  viewBox="0 0 35 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M25.87 18.05L23.16 17.45L25.27 20.46V29.78L32.49 23.76V13.53L29.18 14.73L25.87 18.04V18.05ZM25.27 35.49L29.18 31.58V27.67L25.27 30.98V35.49ZM20.16 17.14H20.03H20.17H20.16ZM30.1 5.19L34.89 4.81L33.08 12.33L24.1 15.67L30.08 5.2L30.1 5.19ZM5.72 14.74L2.41 13.54V23.77L9.63 29.79V20.47L11.74 17.46L9.03 18.06L5.72 14.75V14.74ZM9.63 30.98L5.72 27.67V31.58L9.63 35.49V30.98ZM4.8 5.2L10.78 15.67L1.81 12.33L0 4.81L4.79 5.19L4.8 5.2ZM24.37 21.05V34.59L22.56 37.29L20.46 39.4H14.44L12.34 37.29L10.53 34.59V21.05L12.42 18.23L17.45 26.8L22.48 18.23L24.37 21.05ZM22.85 0L22.57 0.69L17.45 13.08L12.33 0.69L12.05 0H22.85Z"
                    fill="var(--p-primary-color)"
                  />
                  <path
                    d="M30.69 4.21L24.37 4.81L22.57 0.69L22.86 0H26.48L30.69 4.21ZM23.75 5.67L22.66 3.08L18.05 14.24V17.14H19.7H20.03H20.16H20.2L24.1 15.7L30.11 5.19L23.75 5.67ZM4.21002 4.21L10.53 4.81L12.33 0.69L12.05 0H8.43002L4.22002 4.21H4.21002ZM21.9 17.4L20.6 18.2H14.3L13 17.4L12.4 18.2L12.42 18.23L17.45 26.8L22.48 18.23L22.5 18.2L21.9 17.4ZM4.79002 5.19L10.8 15.7L14.7 17.14H14.74H15.2H16.85V14.24L12.24 3.09L11.15 5.68L4.79002 5.2V5.19Z"
                    fill="var(--p-text-color)"
                  />
                </svg>
                <span class="font-semibold text-2xl text-primary"
                  >Your Logo</span
                >
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
                    <span class="font-medium">FAVORITES</span>
                    <i class="pi pi-chevron-down"></i>
                  </div>
                  <ul class="list-none p-0 m-0 overflow-hidden">
                    <li>
                      <a
                        v-ripple
                        class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
                      >
                        <i class="pi pi-home mr-2"></i>
                        <span class="font-medium">Dashboard</span>
                      </a>
                    </li>
                    <li>
                      <a
                        v-ripple
                        class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
                      >
                        <i class="pi pi-bookmark mr-2"></i>
                        <span class="font-medium">Bookmarks</span>
                      </a>
                    </li>
                    <li>
                      <a
                        v-ripple
                        v-styleclass="{
                          selector: '@next',
                          enterFromClass: 'hidden',
                          enterActiveClass: 'animate-slidedown',
                          leaveToClass: 'hidden',
                          leaveActiveClass: 'animate-slideup',
                        }"
                        class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
                      >
                        <i class="pi pi-chart-line mr-2"></i>
                        <span class="font-medium">Reports</span>
                        <i class="pi pi-chevron-down ml-auto"></i>
                      </a>
                      <ul
                        class="list-none py-0 pl-4 pr-0 m-0 hidden overflow-y-hidden transition-all duration-[400ms] ease-in-out"
                      >
                        <li>
                          <a
                            v-ripple
                            v-styleclass="{
                              selector: '@next',
                              enterFromClass: 'hidden',
                              enterActiveClass: 'animate-slidedown',
                              leaveToClass: 'hidden',
                              leaveActiveClass: 'animate-slideup',
                            }"
                            class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
                          >
                            <i class="pi pi-chart-line mr-2"></i>
                            <span class="font-medium">Revenue</span>
                            <i class="pi pi-chevron-down ml-auto"></i>
                          </a>
                          <ul
                            class="list-none py-0 pl-4 pr-0 m-0 hidden overflow-y-hidden transition-all duration-[400ms] ease-in-out"
                          >
                            <li>
                              <a
                                v-ripple
                                class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
                              >
                                <i class="pi pi-table mr-2"></i>
                                <span class="font-medium">View</span>
                              </a>
                            </li>
                            <li>
                              <a
                                v-ripple
                                class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
                              >
                                <i class="pi pi-search mr-2"></i>
                                <span class="font-medium">Search</span>
                              </a>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <a
                            v-ripple
                            class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
                          >
                            <i class="pi pi-chart-line mr-2"></i>
                            <span class="font-medium">Expenses</span>
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a
                        v-ripple
                        class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
                      >
                        <i class="pi pi-users mr-2"></i>
                        <span class="font-medium">Team</span>
                      </a>
                    </li>
                    <li>
                      <a
                        v-ripple
                        class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
                      >
                        <i class="pi pi-comments mr-2"></i>
                        <span class="font-medium">Messages</span>
                        <span
                          class="inline-flex items-center justify-center ml-auto bg-primary text-primary-contrast rounded-full"
                          style="min-width: 1.5rem; height: 1.5rem"
                          >3</span
                        >
                      </a>
                    </li>
                    <li>
                      <a
                        v-ripple
                        class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
                      >
                        <i class="pi pi-calendar mr-2"></i>
                        <span class="font-medium">Calendar</span>
                      </a>
                    </li>
                    <li>
                      <a
                        v-ripple
                        class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
                      >
                        <i class="pi pi-cog mr-2"></i>
                        <span class="font-medium">Settings</span>
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
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
                    <span class="font-medium">APPLICATION</span>
                    <i class="pi pi-chevron-down"></i>
                  </div>
                  <ul class="list-none p-0 m-0 overflow-hidden">
                    <li>
                      <a
                        v-ripple
                        class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
                      >
                        <i class="pi pi-folder mr-2"></i>
                        <span class="font-medium">Projects</span>
                      </a>
                    </li>
                    <li>
                      <a
                        v-ripple
                        class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
                      >
                        <i class="pi pi-chart-bar mr-2"></i>
                        <span class="font-medium">Performance</span>
                      </a>
                    </li>
                    <li>
                      <a
                        v-ripple
                        class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
                      >
                        <i class="pi pi-cog mr-2"></i>
                        <span class="font-medium">Settings</span>
                      </a>
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
                <Avatar
                  image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
                  shape="circle"
                />
                <span class="font-bold">Amy Elsner</span>
              </a>
            </div>
          </div>
        </template>
      </Drawer>
      <Button icon="pi pi-bars" @click="visible = true" />
    </div>

    <!-- Sidebar -->
    <!-- <div class="hidden lg:card lg:flex lg:justify-center lg:flex lg:flex-col">
      <Menu
        :model="items"
        class="h-full w-full md:w-60"
        pt:root:class="!border-0"
      >
        <template #start>
          <span class="inline-flex items-center gap-1 px-2 py-2">
            <svg
              width="35"
              height="40"
              viewBox="0 0 35 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="h-8"
            >
              <path
                d="M25.87 18.05L23.16 17.45L25.27 20.46V29.78L32.49 23.76V13.53L29.18 14.73L25.87 18.04V18.05ZM25.27 35.49L29.18 31.58V27.67L25.27 30.98V35.49ZM20.16 17.14H20.03H20.17H20.16ZM30.1 5.19L34.89 4.81L33.08 12.33L24.1 15.67L30.08 5.2L30.1 5.19ZM5.72 14.74L2.41 13.54V23.77L9.63 29.79V20.47L11.74 17.46L9.03 18.06L5.72 14.75V14.74ZM9.63 30.98L5.72 27.67V31.58L9.63 35.49V30.98ZM4.8 5.2L10.78 15.67L1.81 12.33L0 4.81L4.79 5.19L4.8 5.2ZM24.37 21.05V34.59L22.56 37.29L20.46 39.4H14.44L12.34 37.29L10.53 34.59V21.05L12.42 18.23L17.45 26.8L22.48 18.23L24.37 21.05ZM22.85 0L22.57 0.69L17.45 13.08L12.33 0.69L12.05 0H22.85Z"
                fill="var(--p-primary-color)"
              />
              <path
                d="M30.69 4.21L24.37 4.81L22.57 0.69L22.86 0H26.48L30.69 4.21ZM23.75 5.67L22.66 3.08L18.05 14.24V17.14H19.7H20.03H20.16H20.2L24.1 15.7L30.11 5.19L23.75 5.67ZM4.21002 4.21L10.53 4.81L12.33 0.69L12.05 0H8.43002L4.22002 4.21H4.21002ZM21.9 17.4L20.6 18.2H14.3L13 17.4L12.4 18.2L12.42 18.23L17.45 26.8L22.48 18.23L22.5 18.2L21.9 17.4ZM4.79002 5.19L10.8 15.7L14.7 17.14H14.74H15.2H16.85V14.24L12.24 3.09L11.15 5.68L4.79002 5.2V5.19Z"
                fill="var(--p-text-color)"
              />
            </svg>
            <span class="text-xl font-semibold"
              >PRIME<span class="text-primary">APP</span></span
            >
          </span>
        </template>
        <template #submenulabel="{ item }">
          <span class="text-primary font-bold">{{ item.label }}</span>
        </template>
        <template #item="{ item, props }">
          <template v-if="item.path">
            <RouterLink
              :to="item.path"
              v-ripple
              class="flex items-center"
              v-bind="props.action"
            >
              <span :class="item.icon" />
              <span>{{ item.label }}</span>
              <Badge v-if="item.badge" class="ml-auto" :value="item.badge" />
              <span
                v-if="item.shortcut"
                class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1"
                >{{ item.shortcut }}</span
              >
            </RouterLink>
          </template>
          <template v-else>
            <span class="flex items-center" v-bind="props.action">
              <span :class="item.icon" />
              <span>{{ item.label }}</span>
            </span>
          </template>
          <template v-if="item.spacer">
            <div class="flex-grow" />
          </template>
        </template>
        <template #end>
          <button
            v-ripple
            class="relative overflow-hidden w-full border-0 bg-transparent flex items-start p-2 pl-4 hover:bg-surface-100 dark:hover:bg-surface-800 rounded-none cursor-pointer transition-colors duration-200"
          >
            <Avatar
              image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
              class="mr-2"
              shape="circle"
            />
            <span class="inline-flex flex-col items-start">
              <span class="font-bold">Amy Elsner</span>
              <span class="text-sm">Admin</span>
            </span>
          </button>
        </template>
      </Menu>
    </div> -->

    <div
      class="flex flex-col h-screen transition-all duration-300"
      :class="collapsed ? 'w-16' : 'w-60'"
    >
      <!-- HEADER -->
      <div class="flex items-center justify-between px-3 py-2 border-b">
        <span v-if="!collapsed" class="text-xl font-semibold">
          PRIME<span class="text-primary">APP</span>
        </span>
        <button
          @click="collapsed = !collapsed"
          class="p-1 rounded hover:bg-surface-100"
          v-tooltip.bottom="collapsed ? 'Expand' : 'Collapse'"
        >
          <i
            class="pi"
            :class="
              collapsed ? 'pi-angle-double-right' : 'pi-angle-double-left'
            "
          ></i>
        </button>
      </div>

      <!-- MENU scrollable -->
      <div class="flex-1 overflow-y-auto overflow-x-hidden">
        <Menu :model="displayItems" class="flex flex-col w-full !border-0">
          <template #submenulabel="{ item }">
            <span v-if="item.label" class="text-primary font-bold">{{
              item.label
            }}</span>
          </template>

          <template #item="{ item, props }">
            <a
              v-ripple
              class="flex items-center px-3 py-2 transition-all"
              :class="collapsed ? 'justify-start' : 'gap-2'"
              v-bind="props.action"
              v-tooltip.right="collapsed ? item.label : item.label"
            >
              <i :class="item.icon"></i>
              <div v-if="!collapsed">
                <span v-if="item.label">{{ item.label }}</span>
                <Badge v-if="item.badge" class="ml-auto" :value="item.badge" />
              </div>
            </a>
          </template>
        </Menu>
      </div>

      <!-- FOOTER sticky -->
      <div class="border-t p-3">
        <button
          v-ripple
          class="relative overflow-hidden w-full border-0 bg-transparent flex items-center gap-2 hover:bg-surface-100 rounded cursor-pointer transition-colors duration-200"
          v-tooltip.right="collapsed ? 'Amy Elsner (Admin)' : null"
        >
          <Avatar
            image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
            shape="circle"
          />
          <span v-if="!collapsed" class="inline-flex flex-col items-start">
            <span class="font-bold">Amy Elsner</span>
            <span class="text-sm">Admin</span>
          </span>
        </button>
      </div>
    </div>

    <RouterView />
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
// import { ref, onMounted } from "vue";

const visible = ref(false);
// const isDesktop = ref(false);

// const checkScreen = () => {
//   isDesktop.value = window.innerWidth >= 1024; // tailwind lg breakpoint = 1024px
//   if (isDesktop.value) {
//     visible.value = true; // auto tampil di desktop
//   } else {
//     visible.value = false; // default hidden di mobile
//   }
// };

// onMounted(() => {
//   checkScreen();
//   window.addEventListener("resize", checkScreen);
// });

// const items = ref([
//   {
//     separator: false,
//   },
//   {
//     label: "Documents",
//     items: [
//       {
//         label: "Home",
//         icon: "pi pi-plus",
//         shortcut: "⌘+N",
//         path: "/",
//       },
//       {
//         label: "About",
//         icon: "pi pi-search",
//         shortcut: "⌘+S",
//         path: "/about",
//       },
//     ],
//   },
//   {
//     label: "Profile",
//     items: [
//       {
//         label: "Settings",
//         icon: "pi pi-cog",
//         shortcut: "⌘+O",
//         path: "/",
//       },
//       {
//         label: "Messages",
//         icon: "pi pi-inbox",
//         badge: 2,
//         path: "/",
//       },
//       {
//         label: "Logout",
//         icon: "pi pi-sign-out",
//         shortcut: "⌘+Q",
//         path: "/",
//       },
//     ],
//   },
//   {
//     spacer: true,
//   },
// ]);

import { ref, computed } from "vue";

const collapsed = ref(false);

const items = ref([
  {
    label: "Documents",
    icon: "pi pi-folder",
    items: [
      { label: "New", icon: "pi pi-plus", shortcut: "⌘+N", path: "/" },
      {
        label: "Search",
        icon: "pi pi-search",
        shortcut: "⌘+S",
        path: "/about",
      },
    ],
  },
  {
    label: "Profile",
    icon: "pi pi-user",
    items: [
      { label: "Settings", icon: "pi pi-cog", path: "/" },
      { label: "Messages", icon: "pi pi-inbox", badge: 2, path: "/" },
      { label: "Logout", icon: "pi pi-sign-out", shortcut: "⌘+Q", path: "/" },
    ],
  },
]);

// label kosong kalau collapsed
const displayItems = computed(() =>
  items.value.map((group) => ({
    ...group,
    label: collapsed.value ? "" : group.label,
    items: group.items.map((i) => ({
      ...i,
      label: collapsed.value ? "" : i.label,
    })),
  }))
);
</script>
