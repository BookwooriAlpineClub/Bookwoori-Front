import useLoaderData from '@src/hooks/useRoaderData';

const RouterExampleDetailPage = () => {
  const { id } = useLoaderData<{ id: string }>();

  return <h1>Router Example Detail Page: {id}</h1>;
};

export default RouterExampleDetailPage;
