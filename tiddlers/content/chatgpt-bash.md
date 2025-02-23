```bash
#!/bin/bash

API_KEY=$OPENAI_API_KEY
# Set the endpoint URL
ENDPOINT="https://api.openai.com/v1/engines/davinci-codex/completions"
# Set the prompt
PROMPT="$1"
# Set the parameters
PARAMETERS='{"prompt": "'"$PROMPT"'", "max_tokens": 60, "temperature": 0.5}'
# Send the request to the API
RESPONSE=$(curl -s -X POST -H "Content-Type: application/json" -H "Authorization: Bearer $API_KEY" -d "$PARAMETERS" $ENDPOINT)
# Parse the response and print the generated text
echo $RESPONSE | jq -r '.choices[0].text'
```