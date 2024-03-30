```ts
export function GET(request: Request) {
  const d = {
    a: 'hi nex',
  };
  return new Response(JSON.stringify(d), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*', // allow cors
    },
  });
}
```