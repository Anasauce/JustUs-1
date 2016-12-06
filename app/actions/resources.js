/* eslint consistent-return: 0, no-else-return: 0*/
import { polyfill } from 'es6-promise';
import request from 'axios';
import md5 from 'spark-md5';
import * as types from 'types';

polyfill();

export function makeResourceRequest(method, id, data, api = '/resource') {
  return request[method](api + (id ? ('/' + id) : ''), data);
}

export function increment(id) {
  return { type: types.INCREMENT_COUNT, id };
}

export function decrement(id) {
  return { type: types.DECREMENT_COUNT, id };
}

export function destroy(id) {
  return { type: types.DESTROY_TOPIC, id };
}


export function typing(text) {
  return {
    type: types.TYPING,
    newResource: text
  };
}

/*
 * @param data
 * @return a simple JS object
 */
export function createResourceRequest(data) {
  return {
    type: types.CREATE_TOPIC_REQUEST,
    id: data.id,
    count: data.count,
    text: data.text
  };
}

export function createResourceSuccess() {
  return {
    type: types.CREATE_TOPIC_SUCCESS
  };
}

export function createResourceFailure(data) {
  return {
    type: types.CREATE_TOPIC_FAILURE,
    id: data.id,
    error: data.error
  };
}

export function createResourceDuplicate() {
  return {
    type: types.CREATE_TOPIC_DUPLICATE
  };
}

// This action creator returns a function,
// which will get executed by Redux-Thunk middleware
// This function does not need to be pure, and thus allowed
// to have side effects, including executing asynchronous API calls.
export function createResource(text) {
  return (dispatch, getState) => {
    // If the text box is empty
    if (text.trim().length <= 0) return;

    const id = md5.hash(text);
    // Redux thunk's middleware receives the store methods `dispatch`
    // and `getState` as parameters
    const { resource } = getState();
    const data = {
      count: 1,
      id,
      text
    };

    // Conditional dispatch
    // If the resource already exists, make sure we emit a dispatch event
    if (resource.resources.filter(resourceItem => resourceItem.id === id).length > 0) {
      // Currently there is no reducer that changes state for this
      // For production you would ideally have a message reducer that
      // notifies the user of a duplicate resource
      return dispatch(createResourceDuplicate());
    }

    // First dispatch an optimistic update
    dispatch(createResourceRequest(data));

    return makeResourceRequest('post', id, data)
      .then(res => {
        if (res.status === 200) {
          // We can actually dispatch a CREATE_TOPIC_SUCCESS
          // on success, but I've opted to leave that out
          // since we already did an optimistic update
          // We could return res.json();
          return dispatch(createResourceSuccess());
        }
      })
      .catch(() => {
        return dispatch(createResourceFailure({ id, error: 'Oops! Something went wrong and we couldn\'t create your resource'}));
      });
  };
}

export function incrementCount(id) {
  return dispatch => {
    return makeResourceRequest('put', id, {
        isFull: false,
        isIncrement: true
      })
      .then(() => dispatch(increment(id)))
      .catch(() => dispatch(createResourceFailure({id, error: 'Oops! Something went wrong and we couldn\'t add your splash'})));
  };
}

export function decrementCount(id) {
  return dispatch => {
    return makeResourceRequest('put', id, {
        isFull: false,
        isIncrement: false
      })
      .then(() => dispatch(decrement(id)))
      .catch(() => dispatch(createResourceFailure({id, error: 'Oops! Something went wrong and we couldn\'t add your splash'})));
  };
}

export function destroyResource(id) {
  return dispatch => {
    return makeResourceRequest('delete', id)
      .then(() => dispatch(destroy(id)))
      .catch(() => dispatch(createResourceFailure({id,
        error: 'Oops! Something went wrong and we couldn\'t add your splash'})));
  };
}
