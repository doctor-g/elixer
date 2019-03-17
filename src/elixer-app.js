import { PolymerElement, html } from '@polymer/polymer';
import './score-table.js';
import './sw-update-toast.js';

/**
 * @customElement
 * @polymer
 */
class ElixerApp extends PolymerElement {

  static get template() {
    return html`
    <style>
      :host {
        display: block;
      }
    </style>
    <score-table scoring=[[traditional]]></score-table>
    <sw-update-toast></sw-update-toast>
  `;
  }

  static get properties() {
    return {
      traditional: {
        type: Array,
        readOnly: true,
        value: function() {
          return [
            {
              name: 'Triumph'
            },
            {
              name: 'Tragedy'
            },
            {
              name: 'Experience'
            },
            {
              name: 'Hero Cards'
            },
            {
              name: 'Antihero Cards'
            },
            {
              name: 'Story Icons'
            }
          ];
        }
      }
    };
  }
}

window.customElements.define('elixer-app', ElixerApp);