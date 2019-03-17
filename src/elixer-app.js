import { PolymerElement, html } from '@polymer/polymer';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/app-layout/app-scroll-effects/effects/waterfall.js';
import '@polymer/iron-pages/iron-pages.js';
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

    <app-header-layout has-scrolling-region fullbleed>
      <app-header slot="header" fixed effects="waterfall">
        <app-toolbar>
          <iron-pages id="top" selected="None" attr-for-selected="category">
            <div category="None">CALL TO ADVENTURE Score Card</div>
            <div category="Triumph">Count all Triumph from your Story, including Destiny.</div>
            <div category="Tragedy">Count all Tragedy from your Story, including Destiny.</div>
            <div category="Experience">One point per unspent experience point</div>
            <div category="Hero Cards">One point per played Hero Card</div>
            <div category="Antihero Cards">One point per played Antihero Card</div>
            <div category="Story Icons">2&rarr;2. 3&rarr;4. 4<sup>+</sup>&rarr;8.</div>
          </iron-pages>
        </app-toolbar>
      </app-header>
      <div>
        <score-table scoring=[[traditional]] on-category-change="_onCategoryChange"></score-table>
      </div>
    </app-header-layout>
    <sw-update-toast></sw-update-toast>
  `;
  }

  _onCategoryChange(e) {
    this.$.top.selected = e.detail.category;
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
            },
            {
              name: 'Tragedy',
            },
            {
              name: 'Experience',
            },
            {
              name: 'Hero Cards',
            },
            {
              name: 'Antihero Cards',
            },
            {
              name: 'Story Icons',
            }
          ];
        }
      }
    };
  }
}

window.customElements.define('elixer-app', ElixerApp);