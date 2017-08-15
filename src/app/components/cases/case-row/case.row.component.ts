import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { Case } from '../../../store/models/case.model';

import { Log } from '../../../decorators/log.decorator';

import 'rxjs/add/operator/take';

@Component({
  selector: 'app-case-row',
  templateUrl: './case.row.component.pug',
  styleUrls: ['./case.row.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@Log()
export class CaseRowComponent {

  @Input('singleCase') public singleCase: Case;

  @Output() public onEdit = new EventEmitter<Case>();
  @Output() public onDelete = new EventEmitter<Case>();


  // tslint:disable-next-line:no-inferrable-types
  public deleteModal: boolean = false;
  // tslint:disable-next-line:no-inferrable-types
  public editModal: boolean = false;

  public editCase(singleCase: Case): void {
    this.editModal = true;
  }

  public editCaseResult(result: Case | boolean): void {
    this.editModal = false;

    if (result !== false) {
      this.onEdit.emit(<Case> result);
    }
  }

  public deleteCase(): void {
    this.deleteModal = true;
  }

  public deleteCaseResult(result: boolean): void {
    this.deleteModal = false;

    if (result) {
      this.onDelete.emit(this.singleCase)
    }
  }
}
