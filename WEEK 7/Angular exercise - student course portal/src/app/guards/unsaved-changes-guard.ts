import { CanDeactivateFn } from '@angular/router';

export interface HasUnsavedChanges {
  enrollForm?: {
    dirty: boolean;
  };
}

export const unsavedChangesGuard: CanDeactivateFn<HasUnsavedChanges> = (
  component,
  currentRoute,
  currentState,
  nextState
) => {
  // If the form exists and is dirty, prompt the user before navigating away
  if (component.enrollForm?.dirty) {
    return window.confirm('You have unsaved changes. Leave?');
  }
  return true;
};
