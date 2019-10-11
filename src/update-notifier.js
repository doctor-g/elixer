import {  LitElement, css, html } from 'lit-element';
import './snack-bar.js';

class UpdateNotifier extends LitElement {
  static get properties() {
    return {
      _updateFound: { type: Boolean }
    };
  }

  static get styles() {
    return [
      css`
        .reload {
          color: var(--app-light-text-color);
        }
        .reload svg {
          fill: var(--app-light-text-color);
          bottom: -.25em;
          position: relative;
        }
      `
    ];
  }

  render() {
    return html`
      <snack-bar ?active="${this._updateFound}">
        Update Available:
        <a class="reload" href @click="${this._reload}">
          Reload
          <svg width="24" height="24">
            <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"></path>
          </svg>
        </a>
      </snack-bar>
    `;
  }

  constructor() {
    super();
    this._updateFound = false;
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration().then((registration) => {
        if (registration) {
          registration.addEventListener('updatefound', () => {
            this._updateFound = true;
          });
        }
      });
    }
  }

  _reload() {
    window.location.reload();
  }
}

window.customElements.define('update-notifier', UpdateNotifier);
