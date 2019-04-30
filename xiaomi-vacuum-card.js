class XiaomiVacuumCard extends Polymer.Element {

    static get template() {
        return Polymer.html`
          <style>
            .background {
              background-repeat: no-repeat;
              background-position: center center;
              background-size: cover;
            }
            .title {
              font-size: 20px;
              padding: 16px 16px 0;
              text-align: center;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
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
          <ha-card hass="[[_hass]]" config="[[_config]]" class="background" style="[[backgroundImage]]">
            <template is="dom-if" if="{{name}}">
              <div class="title" style="[[contentText]]">[[name]]</div>
            </template>
            <div class="content grid" style="[[contentStyle]]" on-click="moreInfo">
              <div class="grid-content grid-left">
                <div>[[_config.labels.status]]: [[stateObj.attributes.status]]</div>
                <div>[[_config.labels.battery]]: [[stateObj.attributes.battery_level]] %</div>
                <div>[[_config.labels.mode]]: [[stateObj.attributes.fan_speed]]</div>
              </div>
              <template is="dom-if" if="{{showDetails}}">
                <div class="grid-content grid-right" >
                  <div>[[_config.labels.main_brush]]: [[stateObj.attributes.main_brush_left]] [[_config.labels.hours]]</div>
                  <div>[[_config.labels.side_brush]]: [[stateObj.attributes.side_brush_left]] [[_config.labels.hours]]</div>
                  <div>[[_config.labels.filter]]: [[stateObj.attributes.filter_left]] [[_config.labels.hours]]</div>
                  <div>[[_config.labels.sensor]]: [[stateObj.attributes.sensor_dirty_left]] [[_config.labels.hours]]</div>
                </div>
              </template>
            </div>
            <template is="dom-if" if="{{showButtons}}">
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

    moreInfo() { this.fireEvent('hass-more-info'); }
    startVaccum() { this.callService(this._config.service.start); }
    pauseVacuum() { this.callService(this._config.service.pause); }
    stopVacuum() { this.callService(this._config.service.stop); }
    locateVacuum() { this.callService(this._config.service.locate); }
    returnVacuum() { this.callService(this._config.service.return); }

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
        if (this.name && this.showButtons) return 5;
        if (this.name || this.showButtons) return 4;
        return 3;
    }

    setConfig(config) {
        const labels = {
            status: 'Status',
            battery: 'Battery',
            mode: 'Mode',
            main_brush: 'Main Brush',
            side_brush: 'Side Brush',
            filter: 'Filter',
            sensor: 'Sensor',
            hours: 'h',
        };

        const services = {
            start: 'start',
            pause: 'pause',
            stop: 'stop',
            locate: 'locate',
            return: 'return_to_base',
        };

        const vendors = {
            xiaomi: {
                image: '/local/img/vacuum.png',
                buttons: true,
                details: true,
            },
            ecovacs: {
                image: '/local/img/vacuum_ecovacs.png',
                buttons: true,
                details: false,
                service: {
                    start: 'turn_on',
                    pause: 'stop',
                    stop: 'turn_off',
                },
            }
        };

        if (!config.entity) throw new Error('Please define an entity.');
        if (config.entity.split('.')[0] !== 'vacuum') throw new Error('Please define a vacuum entity.');
        if (config.vendor && !config.vendor in vendors) throw new Error('Please define a valid vendor.');

        const vendor = vendors[config.vendor] || vendors.xiaomi;
        config.service = Object.assign({}, services, vendor.service);
        config.labels = Object.assign({}, labels, config.labels);

        this.showDetails = vendor.details;
        this.showButtons = vendor.buttons && config.buttons !== false;

        this.contentText = `color: ${config.image !== false ? 'white; text-shadow: 0 0 10px black;' : 'var(--primary-text-color)'}`;
        this.contentStyle = `padding: ${this.showButtons ? '16px 16px 4px' : '16px'}; ${this.contentText}`;
        this.backgroundImage = config.image !== false ? `background-image: url('${config.image || vendor.image}')` : '';
        this._config = config;
    }

    set hass(hass) {
        this._hass = hass;

        if (hass && this._config) {
            this.stateObj = this._config.entity in hass.states ? hass.states[this._config.entity] : null;

            if (this.stateObj) {
                this.name = this._config.name !== false && (this._config.name || this.stateObj.attributes.friendly_name);
            }
        }
    }
}

customElements.define('xiaomi-vacuum-card', XiaomiVacuumCard);
