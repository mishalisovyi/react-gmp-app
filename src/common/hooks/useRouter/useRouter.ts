import {
  NavigateOptions,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';

interface NavigationExtras extends NavigateOptions {
  preserveQueryParameters: boolean
}

export function useRouter() {
  const navigateNative = useNavigate();
  const params = useParams();
  const [, setSearchParams] = useSearchParams();

  const getQueryParameters = () => {
    return Object.fromEntries(new URL(window.location.href).searchParams.entries());
  };

  const navigate = (url: string, extras: NavigationExtras) => {
    const { preserveQueryParameters, ...navigateOptions } = extras;

    navigateNative(`${url}${preserveQueryParameters ? `${window.location.search}` : ''}`, navigateOptions);
  };

  const setQueryParameters = (parameters: { [key: string]: any }) => {
    const originalPathName = window.location.pathname;

    setSearchParams({
      ...getQueryParameters(),
      ...parameters,
    });
    navigate(originalPathName, { preserveQueryParameters: true });
  };

  const removeQueryParameters = (parameters: string[]) => {
    const originalPathName = window.location.pathname;
    const queryParameters = getQueryParameters();

    parameters.forEach((parameter) => {
      delete queryParameters[parameter];
    });

    setSearchParams({ ...queryParameters });

    navigate(originalPathName, { preserveQueryParameters: true });
  };

  return {
    params,
    getQueryParameters,
    setQueryParameters,
    removeQueryParameters,
    navigate,
  };
}
