/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { setPassiveTouchGestures, setRootPath } from '@polymer/polymer/lib/utils/settings.js';
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import "@polymer/iron-flex-layout/iron-flex-layout-classes";
import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/iron-selector/iron-selector.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import './my-icons.js';
import './smart/smart-config.js';
import './shared-styles/theme';
import './shared-styles/paper-button-styles';
import './my-navigation.js';

// Gesture events like tap and track generated from touch will not be
// preventable, allowing for better scrolling performance.
setPassiveTouchGestures(true);

// Set Polymer's root path to the same value we passed to our service worker
// in `index.html`.
setRootPath(MyAppGlobals.rootPath);

class MyApp extends PolymerElement {
  static get template() {
    return html`
      <style include="paper-button-styles iron-flex iron-flex-alignment iron-positioning">
        :host {
          display: block;
        }
        
        app-toolbar{
          height: 60px;
          color: #fff;
          padding: 0px 40px;
          background-color: var(--app-accent-color);
          box-sizing: border-box;
        }

        .welcome-text {
            font-size: 16px;
        }

        app-drawer-layout{
          --app-drawer-width: 300px;
        }

        app-drawer{
          font-family: 'Roboto-Regular';
          --app-drawer-content-container: {
            background-color: var(--pale-blue-grey);
          }
        }

        .main-content.small{
          padding: 8px;
          height: calc(100% - 60px);
        }
        
        .page {
          display: none;
        }

        .page[active] {
          display: flex;
        }

        .main-content {
            margin: 26px 40px 0px 40px;
            box-sizing: border-box;
            height: 100%;
            background-color: #ECF2F6;
        }

        iron-pages {
            margin: 0px;
            padding: 0px;
        }

        #contentContainer {
            background-color: #fff !important;
        }
      </style>

      <app-location route="{{route}}" url-space-regex="^[[rootPath]]">
      </app-location>

      <smart-config server="localhost" port="9081" tenant="sptest"></smart-config>

      <app-route route="{{route}}" pattern="[[rootPath]]:page" data="{{routeData}}" tail="{{subroute}}">
      </app-route>

      <app-drawer-layout fullbleed="" narrow="{{narrow}}">
        <!-- Drawer content -->
        <app-drawer id="drawer" slot="drawer" swipe-open="[[narrow]]">
          <app-toolbar><img id="header-logo" src="./src/images/ithings-logo.png" alt="iThings Health"></app-toolbar>
          <my-navigation currentPage="[[page]]" rootPath="[[rootPath]]"></my-navigation>
          </iron-selector>
        </app-drawer>

        <!-- Main content -->
        <app-header-layout id="hd" has-scrolling-region="">

          <app-header slot="header" condenses="" reveals="" effects="waterfall">
            <app-toolbar class="layout horizontal">
              <!--<paper-icon-button icon="my-icons:menu" drawer-toggle=""></paper-icon-button>-->
              <span class="flex">&nbsp;</span>
              <div class="welcome-text">Welcome [[profileName]]</div>
            </app-toolbar>
          </app-header>

          <div class="main-content">
              <iron-pages selected="[[page]]" attr-for-selected="name" role="main">
                <my-view1 name="view1"></my-view1>
                <my-view2 name="view2"></my-view2>
                <my-view3 name="view3"></my-view3>
                <my-view404 name="view404"></my-view404>
              </iron-pages>
          </div>
        </app-header-layout>
      </app-drawer-layout>
    `;
  }

  static get properties() {
    return {
      page: {
        type: String,
        reflectToAttribute: true,
        observer: '_pageChanged'
      },
      profileName: {
          type: String,
          reflectToAttribute: true
      },
      userId: {
          type: String,
          reflectToAttribute: true
      },
      roleName: {
        type: String,
        reflectToAttribute: true
      },
      routeData: Object,
      subroute: Object
    };
  }

  static get observers() {
    return [
      '_routePageChanged(routeData.page)'
    ];
  }

  ready() {
      super.ready();
      this.$.hd.$.contentContainer.style.backgroundColor = "#fff";
  }

  _routePageChanged(page) {
     // Show the corresponding page according to the route.
     //
     // If no page was found in the route data, page will be an empty string.
     // Show 'view1' in that case. And if the page doesn't exist, show 'view404'.
    if (!page) {
      this.page = 'view1';
    } else if (['view1', 'view2', 'view3'].indexOf(page) !== -1) {
      this.page = page;
    } else {
      this.page = 'view404';
    }

    // Close a non-persistent drawer when the page & route are changed.
    if (!this.$.drawer.persistent) {
      this.$.drawer.close();
    }
  }

  _pageChanged(page) {
    // Import the page component on demand.
    //
    // Note: `polymer build` doesn't like string concatenation in the import
    // statement, so break it up.
    switch (page) {
      case 'view1':
        import('./my-view1.js');
        break;
      case 'view2':
        import('./my-view2.js');
        break;
      case 'view3':
        import('./my-view3.js');
        break;
      case 'view404':
        import('./my-view404.js');
        break;
    }
  }
}

window.customElements.define('my-app', MyApp);