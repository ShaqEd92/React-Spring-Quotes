import { handleResponse, handleError } from "./apiUtils";
const baseUrl = "/quotes/";

export function getQuotes() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}

export function getQuote(id) {
  return fetch(baseUrl + id)
    .then(handleResponse)
    .catch(handleError);
}

export function getQuotesForTag(tag) {
  return fetch(`/quotes/tag/${tag}`).then(handleResponse).catch(handleError);
}

export function getQuotesForAuthor(author) {
  return fetch(`/quotes/author/${author}`)
    .then(handleResponse)
    .catch(handleError);
}

export function saveQuote(quoteWithTags) {
  return fetch(baseUrl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(quoteWithTags),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function editQuote(quote) {
  return fetch(baseUrl + quote.id, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(quote),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteQuote(id) {
  return fetch(baseUrl + id, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
