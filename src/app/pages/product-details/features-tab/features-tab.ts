import {Component, inject, input, OnInit, SimpleChanges} from '@angular/core';
import {FeatureService} from '../../../service/feature.service';
import {FeatureDto, ReleaseDto} from '../../../models/feature.model';
import {NgIf} from '@angular/common';
import {AuthService} from '../../../service/auth.service';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {Table, TableModule} from 'primeng/table';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {TabsModule} from 'primeng/tabs';
import {InputText} from 'primeng/inputtext';
import {Select} from 'primeng/select';
import {Textarea} from 'primeng/textarea';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {UserDto} from '../../../models/user.model';

@Component({
  selector: 'app-features-tab',
  imports: [
    NgIf,
    RouterLink,
    TableModule,
    CardModule,
    ButtonModule,
    TabsModule,
    InputText,
    ReactiveFormsModule,
    Select,
    FormsModule,
    Textarea,
  ],
  templateUrl: './features-tab.html',
  standalone: true,
})
export class FeaturesTab implements OnInit {
  authService = inject(AuthService);
  featureService = inject(FeatureService);
  router = inject(ActivatedRoute);
  fb = inject(FormBuilder);

  error: string | null = null;

  productCode = input("");
  allUsers = input<UserDto[]>([]);
  releases = input<ReleaseDto[]>([])

  featureStatuses = [
    {label: 'New', value: 'NEW'},
    {label: 'In Progress', value: 'IN_PROGRESS'},
    {label: 'On Hold', value: 'ON_HOLD'},
    {label: 'Released', value: 'RELEASED'},
  ];

  features: FeatureDto[] = []

  showCreateFeatureForm = false;
  showEditFeatureForm = false;

  createFeatureForm = this.fb.group({
    code: ['', [Validators.required]],
    title: ['', [Validators.required]],
    description: ['', []],
    releaseCode: ['', []],
    assignedTo: ['', []],
  });

  editFeatureForm = this.fb.group({
    code: ['', [Validators.required]],
    title: ['', [Validators.required]],
    description: ['', []],
    status: ['', [Validators.required]],
    releaseCode: ['', []],
    assignedTo: ['', []],
  });

  ngOnInit(): void {
    this.loadProductFeatures();
  }

  ngOnChanges(changes: SimpleChanges) {
    const product = changes['productCode'];
    if (product === undefined) {
      return;
    }
    const oldValue = product.previousValue;
    const newValue = product.currentValue;
    if (oldValue !== newValue) {
      this.loadProductFeatures();
    }
  }

  clearFilters(table: Table) {
    table.clear()
  }

  loadProductFeatures() {
    this.featureService.getProductFeatures(this.productCode()).subscribe((features) => {
      this.features = features;
    })
  }

  getFullNameByUsername(username: string): String {
    let user = this.allUsers().find(user => user.username == username)
    return user?.fullName ?? username;
  }

  showCreateFeatureFormHandler() {
    this.hideAllForms();
    this.showCreateFeatureForm = true;
  }

  hideAllForms() {
    this.showCreateFeatureForm = false;
    this.showEditFeatureForm = false;
  }

  handleCreateFeature() {
    this.featureService.createFeature({
      productCode: this.productCode(),
      code: this.createFeatureForm.value.code || "",
      title: this.createFeatureForm.value.title || "",
      description: this.createFeatureForm.value.description || "",
      releaseCode: this.createFeatureForm.value.releaseCode || null,
      assignedTo: this.createFeatureForm.value.assignedTo || null,
    }).subscribe({
      next: response => {
        this.loadProductFeatures();
        this.showCreateFeatureForm = false;
        this.createFeatureForm.reset();
      },
      error: () => {
        this.error = "Failed to create feature."
      }
    });
  }

  editFeature(feature: FeatureDto) {
    this.hideAllForms();
    this.showEditFeatureForm = true;
    this.editFeatureForm.patchValue({
      code: feature.code,
      title: feature.title,
      description: feature.description,
      status: feature.status,
      releaseCode: feature.releaseCode,
      assignedTo: feature.assignedTo,
    });
  }

  handleUpdateFeature() {
    this.featureService.updateFeature(
      this.editFeatureForm.value.code || "",
      {
        title: this.editFeatureForm.value.title || "",
        description: this.editFeatureForm.value.description || "",
        status: this.editFeatureForm.value.status || "",
        releaseCode: this.editFeatureForm.value.releaseCode || null,
        assignedTo: this.editFeatureForm.value.assignedTo || null,
      }).subscribe({
      next: response => {
        this.hideAllForms();
        this.loadProductFeatures();
      },
      error: () => {
        this.error = "Failed to update feature."
      }
    });
  }
}
