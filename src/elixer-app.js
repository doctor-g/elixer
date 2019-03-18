import { PolymerElement, html } from '@polymer/polymer';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/app-layout/app-scroll-effects/effects/waterfall.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/iron-icon/iron-icon.js';
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
            <div category="None">CALL TO ADVENTURE Score Card</div>
            <div category="Triumph">Count Triumph from Corruption Track and Story, including Destiny</div>
            <div category="Tragedy">Count Tragedy from Corruption Track and Story, including Destiny</div>
            <div category="Experience">Count unspent Experience tokens</div>
            <div category="Hero Cards">Count played Hero cards</div>
            <div category="Antihero Cards">Count played Antihero cards</div>
            <div category="Story Icons">
              <div class="spread">
                    <img class="storyicon" src="images/nature.png">
                    <img class="storyicon" src="images/nature.png">
                    &rAarr;2
              </div>
              <div class="spread">
                    <img class="storyicon" src="images/nature.png">
                    <img class="storyicon" src="images/nature.png">
                    <img class="storyicon" src="images/nature.png">
                    &rAarr;4
              </div>
              <div class="spread">
                    <img class="storyicon" src="images/nature.png">
                    <img class="storyicon" src="images/nature.png">
                    <img class="storyicon" src="images/nature.png">
                    <img class="storyicon" src="images/nature.png">
                    &rAarr;8
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
  `;
  }

  __onCategorySelected(e) {
    var selected = e.detail.category;
    console.log(selected);
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
              image: 'images/triumph.png'
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
      }
    };
  }
}

window.customElements.define('elixer-app', ElixerApp);