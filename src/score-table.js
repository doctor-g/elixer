import { LitElement, html } from 'lit-element';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-icon-button/paper-icon-button.js';

/**
 * @customElement
 * @polymer
 */
class ScoreTable extends LitElement {

  render() {
    // Make an array holding 0..(numplayers-1).
    var array = [...Array(this.numPlayers).keys()].map(x => x);

    return html`
    <style>
      :host {
        display: block;
      }
      paper-input {
        text-align: right;
      }
      .total {
        text-align: right;
        font-weight: bold;
      }
    </style>
    <table>
      <tr>
        <th></th>
        ${array.map((item)=>html`
          <th>Player ${item+1}</th>
        `)}
      </tr>
      ${this.scoring.map((category, index) => html`
        <tr>
          <th>
            <paper-icon-button data-category=${category.name} src=${category.image} @click=${this.__onCategorySelected}></paper-icon-button>
          </th>
          ${array.map((item)=>html`
            <td>
              <paper-input data-player=${item} type="number" @input=${this.__updateScore}></paper-input>
            </td>
          `)}
        </tr>
      `)}
      <tr>
        <th>Total</th>
        ${array.map(item=>html`
          <td class="total">${this.totals[item]}</td>
        `)}
      </tr>
    </table>
  `;
  }

  static get properties() {
    return {
      scoring: {
        type: Array,
      },
      totals: {
        type: Array
      },
      numPlayers: {
        type: Number
      }
    };
  }

  constructor() {
    super();
    this.numPlayers = 4;
    this.totals = Array(this.numPlayers).fill(0);
  }

  __total(player) {
    return this.totals[player];
  }

  __updateScore(event) {
    const player = event.target.dataset.player;
    var inputElements = this.shadowRoot.querySelectorAll('paper-input');
    var sum = 0;
    inputElements.forEach((input) => {
      var partial = parseInt(input.value);
      if (partial && input.dataset.player==player) {
        sum += parseInt(partial);
      }
    });
    this.totals[player] = sum;

    // lit-element does not do binding beyond top-level properties,
    // so we manually request an update, which forces the totals to refresh.
    this.requestUpdate();
  }

  __onCategorySelected(e) {
    this.dispatchEvent(new CustomEvent('category-selected', {detail: {category: e.target.dataset.category}}));
  }
}

window.customElements.define('score-table', ScoreTable);
