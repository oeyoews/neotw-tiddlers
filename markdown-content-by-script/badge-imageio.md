\define badge(label:"label", message:"message")
  <div class="inline-block bg-gray-400 px-2 py-1 text-xs font-semibold text-gray-900 m-0 mb-1 capitalize">$label$</div>
  <div class="inline-block bg-green-500 px-2 py-1 text-xs font-semibold text-white mb-1 mr-1 capitalize">$message$</div>
\end

<div class="flex items-center flex-wrap">
<<badge one two>>
<<badge thr sec>>
</div>