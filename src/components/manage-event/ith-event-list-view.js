import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import  '@polymer/iron-flex-layout/iron-flex-layout-classes';
import '../../shared-styles/paper-button-styles';
import '../../shared-styles/shared-styles';
import "./ith-event-list-item.js";
import './ith-event-add-edit-dialog.js';

class IthEventListView extends (PolymerElement) {
  static get template() {
    return html`
      <style include="shared-styles iron-flex iron-flex-factors iron-flex-alignment paper-button-styles">
        :host {
          display: block;
        }
        .container {
          background: var(--light-theme-background-color);
          padding: 16px 50px 29px 46px;
        }
        paper-button.filledBlue {
          min-width: 140px;
        }
        .event-title-container {
          padding-bottom: 14px;
        }
        .event-title {
          font-size: 18px;
          font-family: 'Roboto-Bold';
          color: var(--app-accent-color);
        }
        .no-event-view {
          padding: 37px 0px 43px 28px;
          background: var(--very-pale-blue-grey);
        }
        .not-event-view-text {
          font-size: 18px;
          font-family: 'Roboto-Bold';
          color: var(--app-text-color);
        }
        .desc-content{
          padding: 12px 162px 12px 20px;
        }
        ith-event-list-item.event-item{
          background: var(--table-background-color);
        }
        ith-event-list-item.event-item:nth-of-type(odd){
          background: var(--very-pale-blue-grey);
        }
      </style>
      <div class="container">
        <div class="layout horizontal event-title-container">
          <div class="flex-1 event-title self-end">Events</div>
          <paper-button class="filledBlue" on-tap="_openEventAddEditDialog">+ add event</paper-button>
        </div>
        <div class="no-event-view" hidden>
            <div class="not-event-view-text">Please add events to the event pattern</div>
        </div>
        <div class="layout horizontal header-list-container">
          <div class="flex-1 layout vertical center-justified border header-cell-content">event</div>
          <div class="flex-3 layout vertical center-justified border header-cell-content desc-content">description</div>
          <div class="flex-1 layout vertical center-justified border header-cell-content"></div>
        </div>

        <template is="dom-repeat" items="[[_eventList]]">
          <ith-event-list-item 
          item="[[item]]"  
          on-edit-event="_openEventAddEditDialog"
          on-delete-event="_deleteEvent"
          class="event-item"></ith-event-list-item>
        </template>

      </div>
      <ith-event-add-edit-dialog id="addeditevent" on-add-event="addNewEvent"></ith-event-add-edit-dialog>
    `;
  }

  static get properties() {
    return {
      _eventList: {
        type: Array,
        value: []
      }
    }
  }

  _addToEvents(evt) {
  }

  _openEventAddEditDialog(e){
      this.$.addeditevent.open();
  }

  _deleteEvent(e) {

  }

  addNewEvent(event) {
      var evt = event.detail;
      var evts = [];
      for (var i = 0; i < this._eventList.length; i++) {
          evts.push(this._eventList[i]);
      }
      evt.sequence = this._eventList.length + 1;
      evts.push(evt);
      this._eventList = evts;
  }

  _stateChanged(state) {

  }

  getEvents() {
      return this._eventList;
  }

}

window.customElements.define('ith-event-list-view', IthEventListView);
