import { useReducer, Reducer, useCallback } from 'react';

interface FetchApiState<T> {
  isLoading: boolean;
  isError: boolean;
  data?: T;
}

interface FetchApiAction<T> {
  type: string;
  payload?: T;
}

function fetchApiReducer<T>(state: FetchApiState<T>, action: FetchApiAction<T>) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };

    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };

    case 'FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
        data: action.payload,
      };

    default:
      return state;
  }
}

function useFetchApi<DataResquest, DataResponse>(
  request: (v: DataResquest) => Promise<DataResponse>,
): [ FetchApiState<DataResponse>, (v: DataResquest) => Promise<DataResponse | undefined>] {
  const [
    state,
    dispatch,
  ] = useReducer<Reducer< FetchApiState<DataResponse>, FetchApiAction<DataResponse> >>(
    fetchApiReducer, {
      isError: false,
      isLoading: false,
      data: undefined,
    },
  );

  const setFetch = useCallback(async (dataRequest: DataResquest) => {
    try {
      dispatch({ type: 'FETCH_REQUEST' });
      const data = await request(dataRequest);

      dispatch({ type: 'FETCH_SUCCESS', payload: data });

      return data;
    } catch ({ response }) {
      dispatch({ type: 'FETCH_FAILURE', payload: response?.data });
      return undefined;
    }
  }, [request]);


  return [state, setFetch];
}

export default useFetchApi;
