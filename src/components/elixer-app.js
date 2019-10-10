import { LitElement, html, css } from 'lit-element';
import '@polymer/paper-checkbox/paper-checkbox.js';
import './score-table.js';

class ElixerApp extends LitElement {
  static get properties() {
    return {
      __conf: {
        type: Array
      },
      __nameOfTheWind: {
        type: Object
      }
    };
  }

  static get styles() {
    return [
      css`
        :host {
          display: block;
        }
        .booktitle {
          font-style: italic;
        }
      `
    ]
  }

  render() {
    return html`
      <score-table .rowConfig="${this.__conf}"></score-table> 
      <h2>Options</h2>
      <paper-checkbox @change=${this.__onNameOfTheWindCheck}>
        Use <span class="booktitle">Name of the Wind</span> Expansion
      </paper-checkbox>
    `;
  }

  __onNameOfTheWindCheck(event) {
    if (event.target.checked) {
      this.__conf = [...this.__conf, this.__nameOfTheWind];
    } else {
      this.__conf = this.__conf.splice(0, this.__conf.length-1);
    }
    console.log(event.target.checked);
  }

  constructor() {
    super();
    this.__conf = [
      'Triumph',
      'Tragedy',
      'Hero Cards',
      'Antihero Cards',
      'Experience',
      'Story Icons'
    ];
    this.__nameOfTheWind = 'Name Runes';
  }

}

window.customElements.define('elixer-app', ElixerApp);
