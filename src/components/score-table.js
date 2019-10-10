import { LitElement, html, css } from 'lit-element';
import '@polymer/paper-input/paper-input.js';

class ScoreTable extends LitElement {
  static get properties() {
    return {
        rowConfig: { type: Array },
        players: { type: Number },
        totals: { type: Array }
    };
  }

  static get styles() {
    return [
      css`
        :host {
          display: block;
        }
        paper-input, .rightalign {
            text-align: right;
        }
        th {
            vertical-align: bottom;
        }
      `
    ]
  }

  render() {
    // Create an array with a number of elements equal to the number of players
    // so that we can easily map to it and get the right number of cells.
    const rowArray = [...Array(this.players)].map((v,i)=>i);

    // Names of player numbers
    const names = ['One', 'Two', 'Three', 'Four'];

    // Return the template.
    return html`
      <table>
        <tr>
            <th>Player</th>
            ${rowArray.map(i => html`
            <td>
                <paper-input 
                  placeholder=${names[i]}>
                </paper-input>
            </td>
            `)}
        </tr>
      ${this.rowConfig.map(row => 
        html`
          <tr>
            <th>
              <img src="images/${row.icon}">
            </th>
            ${rowArray.map(i => html`
              <td>
                  <paper-input
                    data-player=${i}
                    type="number"
                    @input=${this.__updateScore}>
                  </paper-input>
              </td>`)}
          </tr>
        `)}
        <tr>
            <th>
                Total
            </th>
            ${rowArray.map(i=>html`
                <td class="rightalign">
                    ${this.totals[i]}
                </td>
            `)}
        </tr>
      </table>
    `;
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

  constructor() {
    super();
    this.rowConfig = [];
    this.players = 4;
    this.totals = [];
  }

}

window.customElements.define('score-table', ScoreTable);
