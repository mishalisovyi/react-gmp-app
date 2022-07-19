import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { renderHook, act } from '@testing-library/react-hooks';

import { useRouter } from './useRouter';

// Mock react-router-dom implementation

const navigateNative = jest.fn();
const setSearchParams = jest.fn();

const params = {
  foo: 'bar',
};

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),

  useNavigate() {
    return navigateNative;
  },

  useParams() {
    return params;
  },

  useSearchParams() {
    return [null, setSearchParams];
  },
}));

describe('getQueryParameters', () => {
  const locationHref = 'http://localhost:4000/search?genre=Adventure&sortBy=vote_count';
  const locationSearch = '?genre=Adventure&sortBy=vote_count';
  const locationPathname = '/search';

  const oldWindowLocation = window.location;

  function MemoryRouterWrapper({ children }: any) {
    return <MemoryRouter>{children}</MemoryRouter>;
  }

  // Make window.location configurable

  beforeAll(() => {
    Reflect.deleteProperty(window, 'location');

    window.location = Object.defineProperties(
      {},
      {
        ...Object.getOwnPropertyDescriptors(oldWindowLocation),
        assign: {
          configurable: true,
        },
      },
    ) as any;
  });

  // Mock window.location object

  beforeEach(() => {
    window.location = {
      href: locationHref,
      search: locationSearch,
      pathname: locationPathname,
    } as any;
  });

  // Restore window.location to the original non-mocked value

  afterAll(() => {
    window.location = oldWindowLocation;
  });

  it('should return correct query parameters', () => {
    const { result: { current } } = renderHook(() => useRouter(), { wrapper: MemoryRouterWrapper });

    expect(current.getQueryParameters()).toEqual({ genre: 'Adventure', sortBy: 'vote_count' });
  });

  it('should navigate to given URL', () => {
    const { result: { current } } = renderHook(() => useRouter(), { wrapper: MemoryRouterWrapper });

    const url = 'http://test.com';

    act(() => {
      current.navigate(url, { preserveQueryParameters: true });
    });

    expect(navigateNative).toHaveBeenCalledWith(`${url}${locationSearch}`, {});
  });

  it('should set query parameters', () => {
    const { result: { current } } = renderHook(() => useRouter(), { wrapper: MemoryRouterWrapper });

    jest.spyOn(current, 'navigate');

    act(() => {
      current.setQueryParameters({ foo: 'bar' });
    });

    expect(setSearchParams).toHaveBeenCalledWith({
      genre: 'Adventure',
      sortBy: 'vote_count',
      foo: 'bar',
    });

    expect(navigateNative).toHaveBeenCalled();
  });

  it('should remove query parameter', () => {
    const { result: { current } } = renderHook(() => useRouter(), { wrapper: MemoryRouterWrapper });

    act(() => {
      current.removeQueryParameters(['genre']);
    });

    expect(setSearchParams).toHaveBeenCalledWith({
      sortBy: 'vote_count',
    });

    expect(navigateNative).toHaveBeenCalled();
  });
});
