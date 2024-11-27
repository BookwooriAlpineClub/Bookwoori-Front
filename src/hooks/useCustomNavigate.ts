const useCustomNavigate = () => {
  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return navigate;
};

export default useCustomNavigate;