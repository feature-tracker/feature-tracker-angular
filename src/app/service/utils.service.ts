import {Injectable} from '@angular/core';
import {Table} from 'primeng/table';
import {FilterMetadata} from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {

  hasAnyFiltersApplied(table: Table) {
    const filters = table.filters
    let filterApplied = false;
    Object.keys(filters).forEach(key => {
      let filter = filters[key] as FilterMetadata[];
      if(filter.length > 0 && filter[0].value !== null) {
        filterApplied = true;
      }
    })
    return filterApplied;
  }
}
