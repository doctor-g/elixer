import { LitElement, html, css } from 'lit-element';

class ElixerApp extends LitElement {
  static get properties() {
    return {
      appTitle: { type: String },
    };
  }

  static get styles() {
    return [
      css`
        :host {
          display: block;
        }
      `
    ]
  }

  render() {
    return html`
      <h1>Hello</h1>      
    `;
  }

  constructor() {
    super();
  }

}

window.customElements.define('elixer-app', ElixerApp);
