/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import '@polymer/iron-flex-layout/iron-flex-layout-classes';
import '@polymer/paper-styles/default-theme';
import './ith-patient-event-settings.js';
import './ith-patient-parameter-settings.js';
import './ith-event-template-header.js';
//import {editPatientEventTemplateEvents} from '../../actions/patient-event-teplates.js';

class IthPatientEventTemplate extends (PolymerElement) {
  static get template() {
    return html `
      <style include="iron-flex iron-flex-factors iron-flex-alignment">
        :host {
          display: block;
          background-color: var(--light-theme-background-color);
          box-shadow:  0px 3px 0px rgba(47, 48, 66, 0.15);
        }
        .events-container {
          padding: 0px 32px 24px 32px;
        }
        :host([_hide-patient-event-template])  .events-container{
          padding: 0px;
        }
        @media (max-width: 1024px) {
        .events-container {
           padding: 0px 24px 24px 24px;
         }
        }
      </style>
      <div class="layout vertical">
        <ith-event-template-header 
          title="[[eventTemplate.name]]" 
          hide-patient-event-template= "[[_hidePatientEventTemplate]]"
          id="[[eventTemplate.name]]" 
          on-edit-template="editTemplate">
        </ith-event-template-header>

        <div class="events-container">
          <iron-form id="form">
            <form>
              <template is="dom-repeat" items="[[eventTemplate.details]]">
                <ith-patient-event-settings 
                  name="events"
                  action="[[eventTemplate.action]]"
                  workflow-templates="[[_workflowTemplates]]" 
                  forward-to-system="[[_forwardToSystem]]" 
                  event="[[item]]"
                  recipents="[[_recipents]]"
                  sensors="[[_sensors]]">
                </ith-patient-event-settings>
              </template>
              
              <!--<template is="dom-repeat" items="[[_params]]">
                <ith-patient-parameter-settings 
                  name="params" 
                  param="[[item]]"
                  workflow-templates="[[_workflowTemplates]]"
                  recipents="[[_recipents]]"
                  forward-to-system="[[_forwardToSystem]]">
                </ith-patient-parameter-settings>
              </template>-->

            </form>
          </iron-form>
        </div>
      </div>
    `;
  }

  static get properties() {
    return {
      template: {
        type: Object
      },

      eventTemplate: {
        type: Object
      },

      _events: {
        type: Array,
        value: function(){
          return [];
        },
        computed: '_computeEvents(template,eventTemplate)'
      },

      _hidePatientEventTemplate: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        computed: '_computeHidePatientEventTemplate(eventTemplate.details)'
      },

      _params: {
        type: Array,
        computed: '_computeParams(template,eventTemplate)'
      },
      
      _sensors: {
        type: Array,
        value: function(){
          return [{'id': 'sensor1','name':'Motion Sensor'}, {'id': 'sensor2', 'name': 'Door Sensor'},
          { 'id': 'sensor3', 'name': 'Bed Sensor'}]
        }
      },
       
      _workflowTemplates: {
        type: Array,
        value: function(){
          return  ['worlflow template1','worlflow template2']
        }
      },

      _forwardToSystem: {
        type: Array,
        value: function(){
          return  ['system1']
        }
      },

      _recipents: {
        type: Array,
        value: function(){
          return [{'id': 'contanct1','name':'apexa kheni'}, {'id': 'contact2', 'name': 'ruchita kheni'},
          {'id': 'contact3', 'name': 'nirmal baladaniya'}]
        }
      }
    };
  }

  editTemplate(){
    var serializeData = this.$.form.serializeForm();
    console.log(serializeData);
    store.dispatch(editPatientEventTemplateEvents(serializeData));
  }

  _computeHidePatientEventTemplate(patientEvent){
    if(!patientEvent || !(patientEvent).length){
      return true;
    }

    return false;
  }

  _computeEvents(template, eventTemplate){
    if(!template.events || !Object.keys(template.events).length){
      return eventTemplate.events;
    }

    return template.events;
  }

  _computeParams(template, eventTemplate){
    if(!template.params || !Object.keys(template.params).length){
      return eventTemplate.params;
    }

    return template.params;
  }

  _stateChanged(state) {
    //  this._workflowTemplates = state.patientEventTemplates.workflowTemplates;
    //  this._forwardToSystem = state.patientEventTemplates.forwardToSystem;
    //  this._recipents = state.patientEventTemplates.recipents;
    //  this._recipentsInfo = state.patientEventTemplates.recipentsInfo;
    //  this._sensors = state.patientEventTemplates.sensors;
  }
}

window.customElements.define('ith-patient-event-template', IthPatientEventTemplate);
