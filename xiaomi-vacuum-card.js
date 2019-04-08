class XiaomiVacuumCard extends Polymer.Element {

    static get template() {
        return Polymer.html`
          <style>
            .background {
              background-repeat: no-repeat;
              background-position: center center;
              background-size: cover;
            }
            .content {
              cursor: pointer;
            }
            .flex {
              display: flex;
              align-items: center;
              justify-content: space-evenly;
            }
            .button {
              cursor: pointer;
              padding: 16px;
            }
            .grid {
              display: grid;
              grid-template-columns: repeat(2, auto);
            }
            .grid-content {
              display: grid;
              align-content: space-between;
              grid-row-gap: 6px;
            }
            .grid-left {
              text-align: left;
              font-size: 110%;
              padding-left: 10px;
              border-left: 2px solid var(--primary-color);
            }
            .grid-right {
              text-align: right;
              padding-right: 10px;
              border-right: 2px solid var(--primary-color);
            }
          </style>
          <ha-card hass="[[_hass]]" config="[[_config]]" class="background" style="[[background]]">
            <div class="content" on-click="moreInfo" style="[[padding]]">
              <div class="grid" style="[[text]]">
                <div class="grid-content grid-left">
                  <div>Status: [[stateObj.attributes.status]]</div>
                  <div>Battery: [[stateObj.attributes.battery_level]] %</div>
                  <div>Mode: [[stateObj.attributes.fan_speed]]</div>
                </div>
                <div class="grid-content grid-right">
                  <div>Main Brush: [[stateObj.attributes.main_brush_left]] h</div>
                  <div>Side Brush: [[stateObj.attributes.side_brush_left]] h</div>
                  <div>Filter: [[stateObj.attributes.filter_left]] h</div>
                  <div>Sensor: [[stateObj.attributes.sensor_dirty_left]] h</div>
                </div>
              </div>
            </div>
            <template is="dom-if" if="{{buttons}}">
              <div class="flex">
                <div class="button" on-tap="startVaccum">
                  <ha-icon icon="mdi:play"></ha-icon>
                </div>
                <div class="button" on-tap="pauseVacuum">
                  <ha-icon icon="mdi:pause"></ha-icon>
                </div>
                <div class="button" on-tap="stopVacuum">
                  <ha-icon icon="mdi:stop"></ha-icon>
                </div>
                <div class="button" on-tap="locateVacuum">
                  <ha-icon icon="mdi:map-marker"></ha-icon>
                </div>
                <div class="button" on-tap="returnVacuum">
                  <ha-icon icon="mdi:home-map-marker"></ha-icon>
                </div>
              </div>
            </template>
          </ha-card>
        `;
    }

    moreInfo = this.fireEvent.bind(this, 'hass-more-info');

    startVaccum = this.callService.bind(this, 'start');
    pauseVacuum = this.callService.bind(this, 'pause');
    stopVacuum = this.callService.bind(this, 'stop');
    locateVacuum = this.callService.bind(this, 'locate');
    returnVacuum = this.callService.bind(this, 'return_to_base');

    callService(service) {
        this._hass.callService('vacuum', service, {entity_id: this._config.entity});
    }

    fireEvent(type, options = {}) {
        const event = new Event(type, {
            bubbles: options.bubbles || true,
            cancelable: options.cancelable || true,
            composed: options.composed || true,
        });
        event.detail = {entityId: this._config.entity};
        this.shadowRoot.dispatchEvent(event);
        return event;
    }

    getCardSize() {
        return 3;
    }

    setConfig(config) {
        if (!config.entity) throw new Error('Please define an entity.');
        if (config.entity.split('.')[0] !== 'vacuum') throw new Error('Please define a vacuum entity.');

        this.buttons = config.buttons !== false;
        this.padding = `padding: ${this.buttons ? '16px 16px 4px' : '16px'}`;
        this.background = config.background !== false ? `background-image: url('/local/${config.background || 'img/vacuum.png'}')` : '';
        this.text = `color: ${config.background !== false ? 'white; text-shadow: 0 0 10px black;' : 'var(--primary-text-color)'}`;

        this._config = config;
    }

    set hass(hass) {
        this._hass = hass;

        if (hass && this._config) {
            this.stateObj = this._config.entity in hass.states ? hass.states[this._config.entity] : null;
        }
    }
}

customElements.define('xiaomi-vacuum-card', XiaomiVacuumCard);
