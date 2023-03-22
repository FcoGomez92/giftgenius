export const errorMessages = {
  app: {
    emptyParam: 'Twitter username must be provided.'
  },
  generic:
    'Something went wrong. Please retry your requests after a brief wait.',
  openAI: {
    prompt: 'Prompt too long.',
    429: 'Our servers are experiencing high traffic. Please retry your requests after a brief wait and contact us if the issue persists.',
    500: 'Issue with OpenAI servers. Please retry your requests after a brief wait.'
  },
  twitter: {
    user404: 'The user requested does not exist or have an account issue.',
    tweets404: "User tweets not found or can't be accesed.",
    429: 'Our servers are experiencing high traffic. Please retry your requests after a brief wait and contact us if the issue persists.',
    500: 'Issue with Twitter servers. Please retry your requests after a brief wait.'
  }
}
