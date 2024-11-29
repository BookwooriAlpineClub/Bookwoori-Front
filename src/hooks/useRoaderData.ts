import { useLoaderData as useRouterLoaderData } from 'react-router-dom';

export default function useLoaderData<T>() {
  return useRouterLoaderData() as T;
}
