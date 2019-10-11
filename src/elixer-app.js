import { LitElement, html, css } from 'lit-element';
import '@polymer/paper-checkbox/paper-checkbox.js';
import './score-table.js';
import './update-notifier.js';

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

          --app-primary-color: #e91e63;
          --app-secondary-color: #293237;
          --app-dark-text-color: var(--app-secondary-color);
          --app-light-text-color: white;
        }
        .booktitle {
          font-style: italic;
        }
        .storyicontable {
          max-width: 400px;
          width: 100%;
        }
        .reminder {
          width: 20px;
          vertical-align: bottom;
        }
      `
    ]
  }

  render() {
    return html`
      <score-table .rowConfig="${this.__conf}"></score-table> 

      <table class="storyicontable">
        <tr>
          <td>
            <img src="images/nature.png" class="reminder">
            <img src="images/nature.png" class="reminder">
            &rarr;2
          </td>
          <td>
            <img src="images/nature.png" class="reminder">
            <img src="images/nature.png" class="reminder">
            <img src="images/nature.png" class="reminder">
            &rarr;4
          </td>
          <td>
            <img src="images/nature.png" class="reminder">
            <img src="images/nature.png" class="reminder">
            <img src="images/nature.png" class="reminder">
            <img src="images/nature.png" class="reminder">
            &rarr;8
          </td>
        </tr>
      </table>


      <h2>Options</h2>
      <paper-checkbox @change=${this.__onNameOfTheWindCheck}>
        Use <span class="booktitle">Name of the Wind</span> Expansion
      </paper-checkbox>
      <update-notifier></update-notifier>
    `;
  }

  __onNameOfTheWindCheck(event) {
    if (event.target.checked) {
      this.__conf = [...this.__conf, this.__nameOfTheWind];
    } else {
      this.__conf = this.__conf.splice(0, this.__conf.length-1);
    }
  }

  constructor() {
    super();
    this.__conf = [
      {
        icon: 'triumph.png',
        alt: 'Triumph icon'
      },
      {
        icon: 'tragedy.png',
        alt: 'Tragedy icon'
      },
      {
        icon: 'hero.png',
        alt: 'Hero Card icon'
      },
      {
        icon: 'antihero.png',
        alt: 'Antihero Card icon'
      },
      {
        icon: 'experience.png',
        alt: 'Experience Point icon'
      },
      {
        icon: 'nature.png',
        alt: 'Story Icon icon'
      }
    ];
    this.__nameOfTheWind = {
      icon: 'name.png',
      alt: 'Name icon'
    };
  }

}

window.customElements.define('elixer-app', ElixerApp);
