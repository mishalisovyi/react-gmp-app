import { SelectListValue } from 'common/interfaces';

export interface MoviesListRequestParameters {
  sortField?: SelectListValue;
  genreFilter?: string;
  searchTerm?: string;
}
