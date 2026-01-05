import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
  signal,
  computed,
  inject,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ZardButtonComponent } from './shared/components/button/button.component';
import { environment } from 'src/environments/environment';
import { ShellContext } from '@templates-micro-frontends/bridge';

@Component({
  standalone: true,
  selector: 'mfe-angular-root',
  imports: [ZardButtonComponent],
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (cssHref()) {
    <link rel="stylesheet" [href]="cssHref()!" />
    }

    <div class="space-y-3">
      <div class="text-lg font-semibold">MFE Angular + ZardUI (Shadow)</div>
      <div class="muted">
        user: {{ ctx()?.user?.id ?? 'anonymous' }} | locale: {{ ctx()?.locale ?? '-' }} | theme:
        {{ ctx()?.theme ?? '-' }}
      </div>
      <div class="text-xs opacity-70">assetBase: {{ ctx()?.assetBase ?? '-' }}</div>

      <z-button (click)="go('/react')">Ir pra /react</z-button>
      <z-button (click)="go('/vue')">Ir pra /vue</z-button>
    </div>
  `,
})
export class MfeAngular {
  private readonly sanitizer = inject(DomSanitizer);

  private readonly ctxSig = signal<ShellContext | null>(null);

  readonly ctx = computed(() => this.ctxSig());

  readonly cssHref = computed<SafeResourceUrl | null>(() => {
    const c = this.ctxSig();
    const url = c?.assetBase
      ? `${c.assetBase}/mfe-shadow.css`
      : `${environment.origin}/mfe-tailwind.css`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  });

  @Input()
  set context(value: ShellContext) {
    this.ctxSig.set(value);
  }

  go(path: string) {
    this.ctxSig()?.capabilities?.navigate(path);
  }
}
