\import [$:/core/ui/PageMacros](#%24%3A/core/ui/PageMacros) [all[shadows+tiddlers]tag[$:/tags/Macro]!has[draft.of]]
\rules only filteredtranscludeinline transcludeinline macrocallinline
<div class="tc-remove-when-wiki-loaded">

<center>
  <div class="h-screen p-4 bg-white rounded shadow-md skeleton w-1/2">
    <div class="animate-pulse flex space-x-4">
      <div class="flex-1 py-1">
        <div class="w-3/4 h-4 bg-gray-300 rounded"></div>
        <div class="mt-2 w-5/6 h-3 bg-gray-300 rounded"></div>
        <div class="mt-2 w-3/4 h-4 bg-gray-300 rounded"></div>
      </div>
    </div>
    <div class="animate-pulse flex space-x-4">
      <div class="flex-1 py-1">
        <div class="w-3/4 h-4 bg-gray-300 rounded"></div>
        <div class="mt-2 w-5/6 h-3 bg-gray-300 rounded"></div>
        <div class="mt-2 w-3/4 h-4 bg-gray-300 rounded"></div>
      </div>
    </div>
  </div>
</center>

<style scoped>
  .w-1\/2 {
    width: 50%;
  }
  .h-screen {
    height: 100vh !important;
  }
  .p-4 {
    padding: 1rem;
  }

  .bg-white {
    background-color: #fff;
  }

  .rounded {
    border-radius: 0.25rem;
  }

  .shadow-md {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  .skeleton {
    background-color: #f2f2f2;
  }

  .animate-pulse {
    animation-duration: 1s;
    animation-fill-mode: both;
    animation-iteration-count: infinite;
    animation-name: pulse;
    animation-timing-function: ease-in-out;
  }

  .flex {
    display: flex;
  }

  .space-x-4 {
    margin-right: 1rem;
  }

  .flex-1 {
    flex: 1;
  }

  .py-1 {
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
  }

  .w-3\/4 {
    width: 75%;
  }

  .h-4 {
    height: 1rem;
  }

  .bg-gray-300 {
    background-color: #e2e8f0;
  }

  .rounded {
    border-radius: 0.25rem;
  }

  .mt-2 {
    margin-top: 0.5rem;
  }

  .w-5\/6 {
    width: 83.333333%;
  }

  .h-3 {
    height: 0.75rem;
  }

  @keyframes pulse {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }
</style>

</div>