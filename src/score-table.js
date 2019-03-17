import { LitElement, html } from 'lit-element';
import '@polymer/paper-input/paper-input.js';

/**
 * @customElement
 * @polymer
 */
class ScoreTable extends LitElement {

  render() {
    var array = this.makePlayerNumberArray();
    return html`
    <style>
      :host {
        display: block;
      }
    </style>
    <table>
      <tr>
        <th></th>
        ${array.map((item)=>html`
          <th>Player ${item+1}</th>
        `)}
      </tr>
      ${this.scoring.map((item, index) => html`
        <tr>
          <th>
            ${item.name}
          </th>
          ${array.map((item)=>html`
            <td>
              <paper-input data-player=${item} type="number" @change=${this.updateScore}></paper-input>
            </td>
          `)}
        </tr>
      `)}
      <tr>
        <th>Total</th>
        ${array.map(item=>html`
          <td>${this.totals[item]}</td>
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

  total(player) {
    return this.totals[player];
  }

  updateScore(event) {
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

  makePlayerNumberArray() {
    return [...Array(this.numPlayers).keys()].map(x => x);
  }
}

window.customElements.define('score-table', ScoreTable);
