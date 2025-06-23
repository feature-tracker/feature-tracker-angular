import {inject, Injectable} from '@angular/core';
import {Table} from 'primeng/table';
import {FilterMetadata, MessageService} from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  messageService = inject(MessageService);

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

  showInfo(message: string) {
    this.messageService.add({ severity: 'info', summary: 'Info', detail: message, life: 3000 });
  }

  showError(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message, life: 3000 });
  }
}
