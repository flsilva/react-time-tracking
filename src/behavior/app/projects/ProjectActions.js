import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  getProjectById,
  getCollectionByQueries,
} from './ProjectReducers';
import { getUser } from '../auth/AuthReducers';
import { getFetcher } from '../api/ApiConfig';
import { extractApiErrors } from '../api/ApiErrors';

export const ADD_PROJECT = 'ADD_PROJECT';
export const ADD_PROJECT_START = 'ADD_PROJECT_START';
export const ADD_PROJECT_SUCCESS = 'ADD_PROJECT_SUCCESS';
export const ADD_PROJECT_ERROR = 'ADD_PROJECT_ERROR';

export const GET_PROJECT = 'GET_PROJECT';
export const GET_PROJECT_START = 'GET_PROJECT_START';
export const GET_PROJECT_SUCCESS = 'GET_PROJECT_SUCCESS';
export const GET_PROJECT_ERROR = 'GET_PROJECT_ERROR';

export const GET_PROJECTS = 'GET_PROJECTS';
export const GET_PROJECTS_START = 'GET_PROJECTS_START';
export const GET_PROJECTS_SUCCESS = 'GET_PROJECTS_SUCCESS';
export const GET_PROJECTS_ERROR = 'GET_PROJECTS_ERROR';

export const UPDATE_PROJECT = 'UPDATE_PROJECT';
export const UPDATE_PROJECT_START = 'UPDATE_PROJECT_START';
export const UPDATE_PROJECT_SUCCESS = 'UPDATE_PROJECT_SUCCESS';
export const UPDATE_PROJECT_ERROR = 'UPDATE_PROJECT_ERROR';

export const CLEAR_DATABASE = 'projects/CLEAR_DATABASE';
export const UPDATE_DATABASE = 'UPDATE_DATABASE';

export const addProject = (data, successCb) => ({
  type: ADD_PROJECT,
  payload: {
    data,
  },
  meta: { successCb },
});
const addProjectStart = () => ({ type: ADD_PROJECT_START });
const addProjectSuccess = payload => ({ type: ADD_PROJECT_SUCCESS, payload });
const addProjectError = payload => ({ type: ADD_PROJECT_ERROR, payload });

export const getProject = (id, query, killCache) => (
  { type: GET_PROJECT, payload: { id, query }, meta: { killCache } }
);
const getProjectStart = () => ({ type: GET_PROJECT_START });
const getProjectSuccess = payload => ({ type: GET_PROJECT_SUCCESS, payload });
const getProjectError = payload => ({ type: GET_PROJECT_ERROR, payload });

export const getProjects = (query, killCache) => (
  { type: GET_PROJECTS, payload: { query }, meta: { killCache } }
);
const getProjectsStart = () => ({ type: GET_PROJECTS_START });
const getProjectsSuccess = payload => ({ type: GET_PROJECTS_SUCCESS, payload });
const getProjectsError = payload => ({ type: GET_PROJECTS_ERROR, payload });

export const updateProject = (id, data, successCb) => ({
  type: UPDATE_PROJECT,
  payload: {
    id,
    data,
  },
  meta: { successCb },
});
const updateProjectStart = () => ({ type: UPDATE_PROJECT_START });
const updateProjectSuccess = payload => ({ type: UPDATE_PROJECT_SUCCESS, payload });
const updateProjectError = payload => ({ type: UPDATE_PROJECT_ERROR, payload });

const clearDatabase = () => ({ type: CLEAR_DATABASE });
const updateDatabase = payload => ({ type: UPDATE_DATABASE, payload });

const addProjectPromise = (data, userId) => {
  const normalizedData = {
    data: {
      type: 'projects',
      attributes: data,
      relationships: {
        author: {
          data: {
            id: userId,
            type: 'users',
          },
        },
      },
    },
  };

  const opts = {
    body: JSON.stringify(normalizedData),
    method: 'POST',
  };

  const path = 'projects';

  const payload = {
    opts,
    path,
  };

  return getFetcher().fetch(payload);
};

function* addProjectSaga(action) {
  if (!action) throw new Error('Argument <action> must not be null.');
  if (!action.payload) throw new Error('Argument <action.payload> must not be null.');
  if (!action.payload.data) {
    throw new Error('Argument <action.payload.data> must not be null.');
  }

  try {
    yield put(addProjectStart());

    const user = yield select(getUser);
    const data = yield call(addProjectPromise, action.payload.data, user.id);

    yield put(clearDatabase());
    yield put(updateDatabase({ data }));
    yield put(addProjectSuccess({ data }));
    if (action.meta.successCb) action.meta.successCb();
  } catch (error) {
    yield put(addProjectError(extractApiErrors(error)));
  }
}

const getProjectsPromise = (query) => {
  const opts = {
    method: 'GET',
  };

  const path = `projects/${query}`;

  const payload = {
    opts,
    path,
  };

  return getFetcher().fetch(payload);
};

function* getProjectsSaga(action) {
  if (!action) throw new Error('Argument <action> must not be null.');
  if (!action.payload) throw new Error('Argument <action.payload> must not be null.');
  if (!action.payload.query) {
    throw new Error('Argument <action.payload.query> must not be null.');
  }

  if (!action.meta.killCache) {
    const cachedProjects = yield select(
      getCollectionByQueries,
      [action.payload.query],
    );

    if (cachedProjects && cachedProjects.length) return;
  }

  try {
    yield put(getProjectsStart());

    const data = yield call(getProjectsPromise, action.payload.query);

    yield put(updateDatabase({ data }));
    yield put(getProjectsSuccess({ data, query: action.payload.query }));
  } catch (error) {
    yield put(getProjectsError(extractApiErrors(error)));
  }
}

const getProjectPromise = (id, query = '') => {
  const opts = {
    method: 'GET',
  };

  const path = `projects/${id}${query}`;

  const payload = {
    opts,
    path,
  };

  return getFetcher().fetch(payload);
};

function* getProjectSaga(action) {
  if (!action) throw new Error('Argument <action> must not be null.');
  if (!action.payload) throw new Error('Argument <action.payload> must not be null.');
  if (!action.payload.id) {
    throw new Error('Argument <action.payload.id> must not be null.');
  }

  if (!action.meta.killCache) {
    const cachedProject = yield select(getProjectById, action.payload.id, action.payload.query);

    if (cachedProject) {
      yield put(getProjectSuccess(cachedProject));
      return;
    }
  }

  try {
    yield put(getProjectStart());

    const data = yield call(getProjectPromise, action.payload.id, action.payload.query);

    yield put(updateDatabase({ data }));
    yield put(getProjectSuccess({ data }));
  } catch (error) {
    yield put(getProjectError(extractApiErrors(error)));
  }
}

const updateProjectPromise = (id, data) => {
  const normalizedData = {
    data: {
      id,
      type: 'projects',
      attributes: data,
    },
  };

  const opts = {
    body: JSON.stringify(normalizedData),
    method: 'PATCH',
  };

  const path = `projects/${id}`;

  const payload = {
    opts,
    path,
  };

  return getFetcher().fetch(payload);
};

function* updateProjectSaga(action) {
  if (!action) throw new Error('Argument <action> must not be null.');
  if (!action.payload) throw new Error('Argument <action.payload> must not be null.');
  if (!action.payload.id) {
    throw new Error('Argument <action.payload.id> must not be null.');
  }
  if (!action.payload.data) {
    throw new Error('Argument <action.payload.data> must not be null.');
  }

  try {
    yield put(updateProjectStart());

    const data = yield call(updateProjectPromise, action.payload.id, action.payload.data);

    yield put(updateDatabase({ data }));
    yield put(updateProjectSuccess({ data }));
    if (action.meta.successCb) action.meta.successCb();
  } catch (error) {
    yield put(updateProjectError(extractApiErrors(error)));
  }
}

export function* bindActionsToSagas() {
  yield takeLatest(ADD_PROJECT, addProjectSaga);
  yield takeLatest(GET_PROJECT, getProjectSaga);
  yield takeLatest(GET_PROJECTS, getProjectsSaga);
  yield takeLatest(UPDATE_PROJECT, updateProjectSaga);
}
