<template>
  <li class="tw-flex">
    <div
      class="tw-relative tw-inline-flex tw-items-center tw-justify-center tw-flex-shrink-0 tw-w-4 tw-h-4 tw-mt-1 tw-mr-3 tw-text-white tw-bg-gray-400 tw-rounded-full"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        class="tw-w-3 tw-h-3"
      >
        <path
          fillRule="evenodd"
          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
          clipRule="evenodd"
        />
      </svg>
    </div>
    <slot />
  </li>
</template>
