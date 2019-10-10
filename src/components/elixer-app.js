import { LitElement, html, css } from 'lit-element';
import './score-table.js';

class ElixerApp extends LitElement {
  static get properties() {
    return {
      conf: {
        type: Array
      }
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
      <score-table .rowConfig="${this.conf}"></score-table>  
    `;
  }

  constructor() {
    super();
    this.conf = [
      'Triumph',
      'Tragedy',
      'Hero Cards',
      'Antihero Cards',
      'Experience',
      'Story Icons'
    ];
  }

}

window.customElements.define('elixer-app', ElixerApp);
