/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TestfolderComponent } from './testfolder.component';

describe('TestfolderComponent', () => {
  let component: TestfolderComponent;
  let fixture: ComponentFixture<TestfolderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestfolderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestfolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
