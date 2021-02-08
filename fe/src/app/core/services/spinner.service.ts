import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';
import { defer, NEVER } from 'rxjs';
import { finalize, share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SpinnerOverlayService {
    
    private spinnerRef: OverlayRef = this.cdkSpinnerCreate();
    
    constructor(private overlay: Overlay) {}

    private cdkSpinnerCreate() {
        return this.overlay.create({
               hasBackdrop: true,
               backdropClass: 'dark-backdrop',
               positionStrategy: this.overlay.position()
                .global()
                .centerHorizontally()
                .centerVertically()
        })
    }

    showSpinner() {
        this.spinnerRef.attach(new ComponentPortal(SpinnerComponent))
    }
    
    stopSpinner() {
        this.spinnerRef.detach();
    }

    public readonly spinner$ = defer(() => {
        this.showSpinner();
        return NEVER.pipe(
          finalize(() => {
            this.stopSpinner();
          })
        );
    }).pipe(share());

}