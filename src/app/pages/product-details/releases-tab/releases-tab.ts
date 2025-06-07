import {Component, inject, input, OnInit, output} from '@angular/core';
import {FeatureService} from '../../../service/feature.service';
import {ReleaseDto} from '../../../models/feature.model';
import {NgIf} from '@angular/common';
import {AuthService} from '../../../service/auth.service';
import {ActivatedRoute} from "@angular/router";
import {TableModule} from 'primeng/table';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {TabsModule} from 'primeng/tabs';
import {InputText} from 'primeng/inputtext';
import {Select} from 'primeng/select';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {UserDto} from '../../../models/user.model';

@Component({
  selector: 'app-releases-tab',
  imports: [
    NgIf,
    TableModule,
    CardModule,
    ButtonModule,
    TabsModule,
    InputText,
    ReactiveFormsModule,
    Select,
  ],
  templateUrl: './releases-tab.html',
  standalone: true,
})
export class ReleasesTab implements OnInit {
  authService = inject(AuthService);
  featureService = inject(FeatureService);
  router = inject(ActivatedRoute);
  fb = inject(FormBuilder);

  productCode = input("");
  allUsers = input<UserDto[]>([]);
  releases = input<ReleaseDto[]>([])

  releasesChanged = output()

  error: string | null = null;
  createReleaseForm = this.fb.group({
    code: ['', [Validators.required]],
    description: ['', [Validators.required]],
  });

  releaseStatuses = [
    {label: 'Draft', value: 'DRAFT'},
    {label: 'Released', value: 'RELEASED'},
  ];

  showCreateReleaseForm = false;
  showEditReleaseForm = false;

  editReleaseForm = this.fb.group({
    code: ['', [Validators.required]],
    description: ['', [Validators.required]],
    status: ['', [Validators.required]],
  });

  ngOnInit(): void {
  }

  showCreateReleaseFormHandler() {
    this.hideAllForms();
    this.showCreateReleaseForm = true;
  }

  hideAllForms() {
    this.showCreateReleaseForm = false;
    this.showEditReleaseForm = false;
  }

  handleCreateRelease() {
    this.featureService.createRelease({
      productCode: this.productCode(),
      code: this.createReleaseForm.value.code || "",
      description: this.createReleaseForm.value.description || "",
    }).subscribe({
      next: response => {
        //console.log("response:", response)
        this.showCreateReleaseForm = false;
        this.createReleaseForm.reset();
        this.releasesChanged.emit()
      },
      error: () => {
        this.error = "Failed to create release."
      }
    });
  }

  editRelease(release: ReleaseDto) {
    this.hideAllForms();
    this.showEditReleaseForm = true;
    this.editReleaseForm.patchValue({
      code: release.code,
      description: release.description,
      status: release.status,
    });
  }

  handleUpdateRelease() {
    this.featureService.updateRelease(
      this.editReleaseForm.value.code || "",
      {
        description: this.editReleaseForm.value.description || "",
        status: this.editReleaseForm.value.status || "",
      }).subscribe({
      next: response => {
        this.hideAllForms();
        this.releasesChanged.emit()
      },
      error: () => {
        this.error = "Failed to update release."
      }
    });
  }

}
