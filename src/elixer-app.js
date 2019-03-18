import { PolymerElement, html } from '@polymer/polymer';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/app-layout/app-scroll-effects/effects/waterfall.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/paper-toast/paper-toast.js';
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
      .title {
        font-size: 120%;
      }
      .reminder {
        width: 14px;
        vertical-align: middle;
      }
      .storyicon {
        width: 14px;
        height: 14px;
      }
      .spread {
        display: inline-block;
        margin-left: 12px;
        margin-right: 12px;
      }
    </style>

    <app-header-layout has-scrolling-region fullbleed>
      <app-header slot="header" fixed effects="waterfall">
        <app-toolbar>
          <iron-pages id="top" selected="None" attr-for-selected="category">
            <div category="None" class="title">Call to Adventure Score Card</div>
            <div category="Triumph">Count Triumph (<img src="images/triumph.png" class="reminder" alt="Triumph Icon">) from Corruption Track and Story, including Destiny</div>
            <div category="Tragedy">Count Tragedy (<img src="images/tragedy.png" class="reminder" alt="Tragedy Icon">) from Corruption Track and Story, including Destiny</div>
            <div category="Experience">Count unspent Experience (<img src="images/experience.png" class="reminder" alt="Experience Icon">) tokens</div>
            <div category="Hero Cards">Count played Hero (<img src="images/hero.png" class="reminder" alt="Hero Card Icon">) cards</div>
            <div category="Antihero Cards">Count played Antihero (<img src="images/antihero.png" class="reminder" alt="Antihero Card Icon">) cards</div>
            <div category="Story Icons">
              <div class="spread">
                    <img class="storyicon" src="images/nature.png" alt="Nature Story Icon">
                    <img class="storyicon" src="images/nature.png" alt="Nature Story Icon">
                    &Rightarrow;2
              </div>
              <div class="spread">
                    <img class="storyicon" src="images/nature.png" alt="Nature Story Icon">
                    <img class="storyicon" src="images/nature.png" alt="Nature Story Icon">
                    <img class="storyicon" src="images/nature.png" alt="Nature Story Icon">
                    &Rightarrow;4
              </div>
              <div class="spread">
                    <img class="storyicon" src="images/nature.png" alt="Nature Story Icon">
                    <img class="storyicon" src="images/nature.png" alt="Nature Story Icon">
                    <img class="storyicon" src="images/nature.png" alt="Nature Story Icon">
                    <img class="storyicon" src="images/nature.png" alt="Nature Story Icon">
                    &Rightarrow;8
              </div>
            </div>
          </iron-pages>
        </app-toolbar>
      </app-header>
      <div>
        <score-table scoring=[[traditional]] on-category-selected="__onCategorySelected"></score-table>
      </div>
    </app-header-layout>
    <sw-update-toast></sw-update-toast>
    <paper-toast id="a2hs" on-click="__addToHomeScreen" duration="10000">
      Add to home screen
    </paper-toast>
  `;
  }

  __onCategorySelected(e) {
    var selected = e.detail.category;
    if (!selected || this.$.top.selected === selected) {
      this.$.top.selected = "None";
    }
    else {
      this.$.top.selected = selected;
    }
  }

  static get properties() {
    return {
      traditional: {
        type: Array,
        readOnly: true,
        value: function() {
          return [
            {
              name: 'Triumph',
              image: 'images/triumph.png',
            },
            {
              name: 'Tragedy',
              image: 'images/tragedy.png'
            },
            {
              name: 'Experience',
              image: 'images/experience.png'
            },
            {
              name: 'Hero Cards',
              image: 'images/hero.png'
            },
            {
              name: 'Antihero Cards',
              image: 'images/antihero.png'
            },
            {
              name: 'Story Icons',
              image: 'images/nature.png'
            }
          ];
        }
      },
      // Response from the beforeinstallprompt event
      deferredPrompt: {
        type: Object
      }
    };
  }

  ready() {
    super.ready();

    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later.
      this.deferredPrompt = e;
      // Prompt the user to add it to their home screen.
      this.$.a2hs.open();
    });
  }

  __addToHomeScreen() {
    if (this.deferredPrompt) {
      this.deferredPrompt.prompt();
      this.deferredPrompt = null;
    }
  }
}

window.customElements.define('elixer-app', ElixerApp);