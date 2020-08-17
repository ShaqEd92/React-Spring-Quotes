import { handleResponse, handleError } from "./apiUtils";
const baseUrl = "/tags/";

export function getTags() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}

export function getOtherTags(id) {
  return fetch("/tags/quote/" + id).then(handleResponse).catch(handleError);
}

export function getTag(id) {
  return fetch(baseUrl + id)
    .then(handleResponse)
    .catch(handleError);
}

export function deleteTag(id) {
  return fetch(baseUrl + id, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
