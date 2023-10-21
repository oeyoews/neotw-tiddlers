```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Tailwind CSS Landing Page</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      tailwind.config = { corePlugins: { preflight: false } };
    </script>
  </head>

  <body class="m-0">
    <nav class="bg-gray-900 h-16">
      <div class="px-4">
        <div class="flex justify-between">
          <div class="text-white font-bold text-xl py-3">Neotw</div>
          <ul class="flex space-x-4">
            <li>
              <a href="#" class="text-gray-300 hover:text-white no-underline"
                >Home</a
              >
            </li>
            <li>
              <a href="#" class="text-gray-300 hover:text-white no-underline"
                >About</a
              >
            </li>
            <li>
              <a href="#" class="text-gray-300 hover:text-white no-underline"
                >Services</a
              >
            </li>
            <li>
              <a href="#" class="text-gray-300 hover:text-white no-underline"
                >Contact</a
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div
      class="min-h-screen flex flex-col justify-center items-center bg-[#F5F5EE]"
    >
      <h1 class="text-4xl font-bold mb-4">Welcome to Our Landing Page</h1>
      <p class="text-gray-600 text-lg mb-8">
        Thank you for visiting our website.
      </p>
      <a
        href="#"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded no-underline"
      >
        Get Started
      </a>
    </div>
  </body>
</html>
```