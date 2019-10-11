import { LitElement, html, css } from 'lit-element';
import '@polymer/paper-checkbox/paper-checkbox.js';
import '@polymer/paper-button/paper-button.js';
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
      },
      __useNameOfTheWind: {
        type: Boolean
      },
      __deferredPrompt: {
        type: Object
      },
      __a2hsOpen: {
        type: Boolean
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
        .title {
         text-align: center;
         margin: 0;
        }
        .booktitle {
          font-style: italic;
        }
        .hint {
          max-width: 400px;
          width: 100%;
          margin-top: 12px;
        }
        .hint td {
          white-space: nowrap;
        }
        .reminder {
          width: 20px;
          vertical-align: bottom;
        }
        paper-checkbox {
          margin-top: 12px;
        }
      `
    ]
  }

  __storyIcons(number) {
    const templates = [];
    for (; number > 0; number--) {
      templates.push(html`<img src="images/nature.png" class="reminder" alt="Story Icon icon">`);
    }
    return templates;
  }

  render() {
    return html`
      <h2 class="title">Call to Adventure Score Card</h2>

      <score-table .rowConfig="${this.__conf}"></score-table> 

      <table class="hint">
        <tr>
          <td>
            ${this.__storyIcons(2)}
            &rarr;2
          </td>
          <td>
            ${this.__storyIcons(3)}
            &rarr;4
          </td>
          <td>
            ${this.__storyIcons(4)}
            &rarr;8
          </td>
          <td>
            <span .hidden="${!this.__useNameOfTheWind}">
              <img src="images/name.png" class="reminder" alt="Name icon">&rarr;3
            </span>
          </td>
      </table>

      <paper-checkbox @change=${this.__onNameOfTheWindCheck}>
        Use <span class="booktitle">Name of the Wind</span> Expansion
      </paper-checkbox>
      <update-notifier></update-notifier>
      <snack-bar id="a2hs" ?active="${this.__a2hsOpen}">
        Add to home screen?
        <paper-button @click="${this.__addToHomeScreen}">Yes</paper-button>
        <paper-button @click="${this.__dismissA2HS}">No</paper-button>
      </snack-bar>
    `;
  }

  __onNameOfTheWindCheck(event) {
    if (event.target.checked) {
      this.__conf = [...this.__conf, this.__nameOfTheWind];
      this.__useNameOfTheWind = true;
    } else {
      this.__conf = this.__conf.splice(0, this.__conf.length-1);
      this.__useNameOfTheWind = false;
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
    this.__a2hsOpen = false;
  }

  firstUpdated(changedProperties) {
    super.firstUpdated(changedProperties);
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent Chrome 76 and later from showing the mini-infobar
      e.preventDefault();

      // Store the event so it can be triggered later.
      this.__deferredPrompt = e;
      this.__a2hsOpen = true;
    });
  }

  __addToHomeScreen() {
    this.__a2hsOpen = false;
    if (this.__deferredPrompt) {
      this.__deferredPrompt.prompt();
      this.__deferredPrompt = null;
    }
  }

  __dismissA2HS() {
    this.__a2hsOpen = false;
  }

}

window.customElements.define('elixer-app', ElixerApp);
