import expect from 'expect';
import md5 from 'spark-md5';
import reducer from 'reducers/resource';
import * as types from 'types';

describe('Resources reducer', () => {
  const s = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  function createResource() {
    return Array(5).join().split(',')
    .map(() => {
      return s.charAt(Math.floor(Math.random() * s.length));
    })
    .join('');
  }

  const resource = createResource();

  function createData() {
    return {
      text: createResource(),
      id: md5.hash(createResource()),
      count: Math.floor(Math.random() * 100)
    };
  }

  const data = createData();

  function createResources(x) {
    const arr = [];
    for (let i = 0; i < x; i++) {
      arr.push(createData());
    }
    return arr;
  }

  it('Should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(
      {
        resources: [],
        newResource: ''
      }
    );
  });

  it('Should add a new resource to an empty initial state', () => {
    expect(
      reducer(undefined, {
        type: types.CREATE_TOPIC_REQUEST,
        id: data.id,
        count: 1,
        text: resource
      })
    ).toEqual({
        resources: [
          {
            id: data.id,
            count: 1,
            text: resource
          }
        ],
        newResource: ''
    });
  });

  it('Should handle TYPING', () => {
    expect(
      reducer(undefined, {
        type: types.TYPING,
        newResource: resource
      })
    ).toEqual({
        resources: [],
        newResource: resource
    });
  });

  it('Should handle CREATE_REQUEST', () => {
    expect(
      reducer(undefined, {
        type: types.CREATE_REQUEST
      })
    ).toEqual({
        resources: [],
        newResource: ''
    });
  });

  it('Should handle REQUEST_SUCCESS', () => {
    expect(
      reducer(undefined, {
        type: types.REQUEST_SUCCESS,
        data: resource
      })
    ).toEqual({
        resources: resource,
        newResource: ''
    });
  });

  it('Should handle CREATE_TOPIC_REQUEST', () => {
    const resources = createResources(20);
    const newResources = [...resources, data];
    expect(
      reducer({
        resources
      },
      {
        type: types.CREATE_TOPIC_REQUEST,
        id: data.id,
        count: data.count,
        text: data.text

      })
    ).toEqual({
        newResource: '',
        resources: newResources
    });
  });

  it('should handle CREATE_TOPIC_FAILURE', () => {
    const resources = createResources(20);
    resources.push(data);
    const newResources = [...resources];
    expect(
      reducer({
        resources,
        newResource: resource
      },
      {
        type: types.CREATE_TOPIC_FAILURE,
        id: data.id
      })
    ).toEqual({
        resources: newResources.pop() && newResources,
        newResource: resource
    });
  });

  it('should handle DESTROY_TOPIC', () => {
    const resources = createResources(20);
    resources.push(data);
    const newResources = [...resources];
    expect(
      reducer({
        resources,
        newResource: resource
      },
      {
        type: types.DESTROY_TOPIC,
        id: resources[resources.length - 1].id,
      })
    ).toEqual({
        resources: newResources.pop() && newResources,
        newResource: resource
    });
  });

  it('should handle INCREMENT_COUNT', () => {
    const resources = createResources(20);
    const newResources = [...resources];
    resources.push(data);
    const newData = Object.assign({}, data);
    newData.count++;
    newResources.push(newData);

    expect(
      reducer({
        resources,
        newResource: resource
      },
      {
        type: types.INCREMENT_COUNT,
        id: resources[resources.length - 1].id,
      })
    ).toEqual({
        resources: newResources,
        newResource: resource
    });
  });

  it('should handle DECREMENT_COUNT', () => {
    const resources = createResources(20);
    const newResources = [...resources];
    resources.push(data);
    const newData = Object.assign({}, data);
    newData.count--;
    newResources.push(newData);

    expect(
      reducer({
        resources,
        newResource: resource
      },
      {
        type: types.DECREMENT_COUNT,
        id: resources[resources.length - 1].id,
      })
    ).toEqual({
        resources: newResources,
        newResource: resource
    });
  });
});
