import React from 'react'
import ReactDOM from 'react-dom/client'
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'
import { ApolloProvider } from '@apollo/client/react'
import App from './App.jsx'
import './App.css'

async function enableMocking() {
  if (!import.meta.env.DEV) {
    return
  }
  const { worker } = await import('./mocks/browser')
  return worker.start({
    onUnhandledRequest: 'bypass'
  })
}

const client = new ApolloClient({
  link: new HttpLink({ uri: '/graphql' }),
  cache: new InMemoryCache()
})

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </React.StrictMode>
  )
})